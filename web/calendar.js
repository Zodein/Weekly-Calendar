"use strict";
var current_year = new Date().getFullYear();
var root_element = document.getElementById("root_element");
var year = document.createElement("div");
var day_index = 1;
var day_index_for_month_n_day = 1;
var week_index = 0;
var month_index = 1;
var total_week = 52;
var days_of_week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

var start_day_of_year = new Date(current_year, 0, 1).getDay() - 1;
if (start_day_of_year < 0) {
    start_day_of_year = 6;
}
if (start_day_of_year != 0) {
    total_week = 53;
    document.documentElement.style.setProperty("--total_week", 54);
}
day_index -= start_day_of_year;
day_index_for_month_n_day -= start_day_of_year;

for (; week_index < total_week + 1; week_index++) {
    let week = document.createElement("div");
    let week_no = document.createElement("div");

    if (week_index == 0) { //if it is caption
        week.appendChild(week_no);
        for (const key in days_of_week) {
            let day = document.createElement("div");
            day.innerHTML = days_of_week[key];
            week.appendChild(day);
        }
    } else {
        week_no.innerHTML = week_index.toString().padStart(2, "0");
        week.appendChild(week_no);
        for (let limit = day_index + 7; day_index < limit; day_index++, day_index_for_month_n_day++) {
            let parent = document.createElement("div");
            let day = document.createElement("div");
            let month = document.createElement("div");
            let day_of_month = document.createElement("div");
            if (day_index > 0 && (day_index < 366 || (day_index < 367 && new Date(current_year, 2, 0).getDate() == 29))) {
                month.innerHTML = month_index.toString().padStart(0, "0");
                day_of_month.innerHTML = day_index_for_month_n_day.toString().padStart(2, "0");
                day.innerHTML = day_index.toString().padStart(0, "0");
            }
            parent.style = "background-color: " + hsvToRgb((month_index * 30), 50, 100);
            parent.appendChild(month);
            parent.appendChild(day_of_month);
            parent.appendChild(day);
            parent.setAttribute("day_no", day_index);
            week.appendChild(parent);
            if (day_index_for_month_n_day == new Date(current_year, month_index, 0).getDate()) {
                month_index++;
                day_index_for_month_n_day = 0;
            }
        }
    }
    year.appendChild(week);
}

root_element.appendChild(year);

function hsvToRgb(h, s, v) {
    var r, g, b, i, f, p, q, t;
    h /= 360;
    s /= 100;
    v /= 100;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return "#" + Math.round(r * 255).toString(16).padStart(2, '0') + Math.round(g * 255).toString(16).padStart(2, '0') + Math.round(b * 255).toString(16).padStart(2, '0');
}


setInterval(function calendar_tick(){
    var now = new Date();
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay);
    if (document.querySelector("[live]") == null) {
        document.querySelector("[day_no='" + day + "']").setAttribute("live", "");
    } else if (document.querySelector("[live]").getAttribute("day_no") != day) {
        document.querySelector("[live]").removeAttribute("live");
        document.querySelector("[day_no='${day}']").setAttribute("live", "");
    }
    return calendar_tick;
}(), 60000);
