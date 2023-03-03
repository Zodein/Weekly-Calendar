var root_element = document.getElementById("root_element");
var time = root_element.appendChild(document.createElement("div"));
var points_of_day = [0, 7, 13, 18]

time.appendChild(document.getElementById("waves"));
for (let index = 0; index < 24; index++) {
    let element = document.createElement("div");
    element.innerHTML = index.toString().padStart(2, "0") + ":00";
    if (points_of_day.includes(index) == true) {
        element.setAttribute("point", "");
    }
    time.appendChild(element);
}

setInterval(function day_tick() {
    document.documentElement.style.setProperty("--hour", (new Date().getMinutes() + (new Date().getHours() * 60)));
    return day_tick;
}(), 60000);

// manual animation for performance issues
// setInterval(() => {
//     this.speed = 0.5;
//     if (this.phase == undefined && this.reverse == undefined) {
//         this.phase = 0;
//         this.reverse = false;
//     }
//     document.querySelector("div[live]").style = "background-color: " + hsvToRgb(0, 0, this.phase) + "; color: " + hsvToRgb(0, 0, 100 - this.phase);
//     if (this.reverse) {
//         if (this.phase > 0) {
//             this.phase -= 1 * speed;
//         } else {
//             this.reverse = !this.reverse;
//             this.phase += 1 * speed;
//         }
//     } else {
//         if (this.phase < 100) {
//             this.phase += 1 * speed;
//         } else {
//             this.reverse = !this.reverse;
//             this.phase -= 1 * speed;
//         }
//     }
// }, 1000 / 60);