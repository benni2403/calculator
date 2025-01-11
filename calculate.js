function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(userInput) {
    const regex = /^(-?\d+)\s*([\+\-\*\/]?)\s*(-?\d?)$/;
    const match = userInput.match(regex);
    console.log(match);

    let first_number = undefined;
    let second_number = undefined;
    let operator = undefined;
    let result = undefined;

    if(match) {
        first_number = Number(match[1]);
        second_number = Number(match[3]);
        operator = match[2];
    }
    else {
        return "Invalid operation";
    }

    switch(operator) {
        case "+":
            result = add(first_number, second_number);
            break;
            
        case "-":
            result = subtract(first_number, second_number);
            break;
            
        case "*":
            result = multiply(first_number, second_number);
            break;
            
        case "/":
            result = divide(first_number, second_number);
            break;

        case "":
            result = first_number;
            break;
    }

    if (Number.isInteger(result)) {
        return result;
    } 
    else {
        return "Invalid operation";
    }
}
