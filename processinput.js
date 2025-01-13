let panelShowsResult = false;
let appendingNumbersAllowed = true;

function calculate(obj) {
    switch(obj.operator) {
        case "+":
            result = add(obj.first_number, 
                obj.second_number);
            break;
            
        case "-":
            result = subtract(obj.first_number, 
                obj.second_number);
            break;
            
        case "x":
            result = multiply(obj.first_number, 
                obj.second_number);
            break;
            
        case "/":
            result = divide(obj.first_number, 
                obj.second_number);
            break;

        case "%":
            result = percent(obj.first_number);
            break;

        case "":
            result = obj.first_number;
            break;
    }

    if(!Number.isFinite(result)) {
        result = "Invalid operation";
    }

    return result;
}

function processInput(string) {
    let operation = getPanelContent();
    let obj = operate(operation);
    switch (string) {
        case "0":
        case "1": 
        case "2": 
        case "3": 
        case "4": 
        case "5":
        case "6": 
        case "7": 
        case "8": 
        case "9":
            if(!appendingNumbersAllowed) {
                break;
            }
            if(panelShowsResult) {
                panelShowsResult = false;
                updatePanel(string);
            } 
            else {
                appendToPanel(string);                
            }
            break;

        case "+":
        case "-":
        case "x":
        case "/":
        case "%":
            console.table(obj);
            if(obj.operator && obj.second_number) {
                result = calculate(obj);
                updatePanel(result);
            }
            else if(obj.operator) {
                operation = operation.slice(0, operation.length - 1);
                operation += string;
                updatePanel(operation);
            }
            else if(obj.valid) {
                appendToPanel(string);
            }
            else {
                updatePanel(string);
            }

            if(string == "%") {
                appendingNumbersAllowed = false;
            }
            else {
                appendingNumbersAllowed = true;
            }
            
            panelShowsResult = false;
            break;

        case "C":
            if(obj.valid) {
                operation = operation.slice(0, -1);
            }
            else {
                operation = "";
            }
            updatePanel(operation);
            appendingNumbersAllowed = true;
            break;
        
        
        case "AC":
            operation = "";
            updatePanel(operation);
            appendingNumbersAllowed = true;
            break;

        case "=":
            if(obj.valid) {
                result = calculate(obj);
                updatePanel(result);
            }
            else {
                updatePanel("Invalid operation");
            }
            panelShowsResult = true;
            break;
    
        default:
            console.log(string);
            break;
    }
}