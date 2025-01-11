const calc_button = document.getElementById("calc_button");
const input = document.getElementById("input");

calc_button.addEventListener("click", () => {
    let input_string = input.value;
    let result = operate(input_string);
    input.value = result;
});