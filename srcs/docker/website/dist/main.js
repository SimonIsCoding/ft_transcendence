"use strict";
window.addEventListener("load", () => {
    const canvas = document.getElementById("pong_table");
    const ctx = canvas.getContext("2d");
    if (ctx) {
        ctx.fillStyle = "pink";
        ctx.fillRect(50, 50, 100, 100);
    }
});
