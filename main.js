document.addEventListener("DOMContentLoaded", function() {

    const item_rows = document.querySelectorAll(".calculator .row:not(.total)");

    item_rows.forEach(function(row) {
        const qty_field = row.querySelector("[name='qty']");
        qty_field.addEventListener("change", item_input_listener);
        qty_field.addEventListener("keyup", item_input_listener);
    });
});


function item_input_listener(e) {
    const row = e.target.closest(".row");
    let qty = row.querySelector("[name='qty']").value;

    if (qty === "") {
        return false;
    }

    qty = parseInt(qty);

    const shops = row.querySelectorAll(".Cable, .Fiber, .DSL");
    row.classList.add("active");


    shops.forEach(function(shop) {

        const price = parseFloat(shop.dataset.price);

        const total = price * qty;

        shop.querySelector("span").innerHTML = round_number(total);
    });


    calculate_totals();
}

function calculate_totals() {
    const item_rows = document.querySelectorAll(".calculator .row:not(.total)"); // grab all of the rows that are not the totals row

    let DSL = 0;
    let Fiber = 0;
    let Cable = 0;

    item_rows.forEach(function(row) {

        let qty = row.querySelector("[name='qty']").value;

        if (qty === "") {
            return false;
        }

        qty = parseInt(qty);
        const shops = row.querySelectorAll(".Cable, .Fiber, .DSL");

        shops.forEach(function(shop) {
            const price = parseFloat(shop.dataset.price);

            if (shop.classList.contains("DSL")) {
                DSL = DSL + total;
            }

            if (shop.classList.contains("Cable")) {
                Cable = Cable + total;
            }

            if (shop.classList.contains("Fiber")) {
                Fiber = Fiber + total;
            }
        });
    });

    const total_row = document.querySelector(".row.total");
    let cheapest = false;

    total_row.classList.add("active");

    total_row.querySelector('.DSL span').innerHTML = round_number(DSL);
    total_row.querySelector('.Cable span').innerHTML = round_number(Cable);
    total_row.querySelector('.Fiber span').innerHTML = round_number(Fiber);

    if (DSL < Cable && DSL < Fiber) {
        cheapest = 'DSL';
    }

    if (Cable < DSL && Cable < Fiber) {
        cheapest = 'Cable';
    }

    if (Fiber < DSL && Fiber < Cable) {
    }

    const cheapest_item = total_row.querySelector(`.cheapest`);

    if (cheapest_item) {
        cheapest_item.classList.remove(".cheapest");
    }

    if (cheapest !== false) {

        total_row.querySelector(`.${cheapest}`).classList.add(".cheapest");
    }
}

function round_number(num) {

    num = num * 100;
    num = Math.round(num);

    num = num / 100;

    num = num.toFixed(2);

    return num;
}
