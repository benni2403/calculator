const container = document.querySelector(".container");

container.addEventListener("click", (e) => {processInput(e.target.textContent)})
window.addEventListener("keyup", (e) => processInput(e.key.toLowerCase()))