const operations = [
    "+",
    "-",
    "x",
    "/",
    "%",
]
const operations_string = "\\" + operations.join("\\");

function operate(userInput) {
    userInput = userInput.replaceAll(" ", "");

    // const regex = /^(-?\d+)([\+\-\x\/\%])?(-?\d+)?$/;
    const regex = new RegExp(`^(-?\\d+)([${operations_string}])?(-?\\d+)?$`);
    // console.log(regex);
    const match = userInput.match(regex);
    
    let obj = {
        first_number: undefined,
        second_number: undefined,
        operator: undefined,
        valid: undefined,
    }

    if(match) {
        obj.first_number = Number(match[1]);
        obj.second_number = match[3]? Number(match[3]):"";
        obj.operator = match[2]? match[2]:"";
        obj.valid = true;
    }
    else {
        obj.valid = false;
    }

    return obj;
}