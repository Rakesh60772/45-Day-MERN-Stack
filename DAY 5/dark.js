const toggleBtn = document.getElementById("mode-toggle");
const body = document.body;
let h1s = document.querySelectorAll('h1');

body.classList.add("light"); // default mode

toggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark");
    body.classList.toggle("light");

    if (body.classList.contains("dark")) {
        toggleBtn.textContent = "☀️ Light Mode";
        h1s.forEach(h => h.classList.add("hed"));
        h1s.forEach(h => h.classList.remove("black"));
    } else {
        toggleBtn.textContent = "🌙 Dark Mode";
        h1s.forEach(h => h.classList.add("black"));
        h1s.forEach(h => h.classList.remove("hed"));
    }
});
