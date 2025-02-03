const operations = [
    "+",
    "-",
    "x",
    "/",
    "%",
    "√",
]
const operations_string = "[\\" 
+ operations.join("\\")
+ "]"

function operate(userInput) {
    userInput = userInput.replaceAll(" ", "");

    const regex = new RegExp(`^(-?\\d+(?:\\.\\d+)?)(${operations_string})?(-?\\d+(?:\\.\\d+)?)?$`);
    // console.log(regex);
    // const regex = /^(-?\d+(?:\.\d+)?)([\+\-\x\/\%]|SQRT)?(-?\d+(?:\.\d+)?)?$/;
    const match = userInput.match(regex);
    // console.log(match);
    
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