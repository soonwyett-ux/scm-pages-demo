"use strict";

let clicks = 0

function updateCount() {
  document.getElementById("count").textContent = String(clicks);
}

function toggleTheme() {
  document.body.classList.toggle("dark");
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("loaded").textContent = new Date().toLocaleString();

  document.getElementById("clickBtn").addEventListener("click", () => {
    clicks += 1;
    updateCount();
  });

  document.getElementById("themeBtn").addEventListener("click", toggleTheme);
});
