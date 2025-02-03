let panelShowsResult = false;
let appendingNumbersAllowed = true;
let memory = 0;

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

        case "√":
            result = squareRoot(obj.first_number);
            break;

        case "":
            result = obj.first_number;
            break;
    }

    if(!Number.isFinite(result)) {
        result = "Invalid operation";
    }
    else if(!Number.isInteger(result)) {
        result = round(result)
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

        case ".":
            // console.table(obj);
            if(
                Number.isInteger(obj.first_number) && !obj.operator ||
                obj.first_number && Number.isInteger(obj.second_number)
            ) {
                appendToPanel(string);
            }
            // else {
            //     console.log(`${Number.isInteger(obj.first_number)} && ${!obj.operator}`)
            //     console.log(`${obj.first_number} && ${Number.isInteger(obj.second_number)}`)
            // }
            break;
        
        case "+/-":
            // console.table(obj);
            // console.log(operation);
            if(operation.endsWith("-") && obj.operator != "-" ) {
                operation = operation.slice(0, -1);
                updatePanel(operation);
            }
            else if(
                operation == "" ||
                obj.operator && !obj.second_number && appendingNumbersAllowed
            ) {
                appendToPanel("-");
            }
            break;

        case "+":
        case "-":
        case "*":
        case "x":
        case "/":
        case "%":
        case "√":
            if (string == "*")
            {
                string = "x";
            }
            //Z.B. operation = "1+1"
            if(obj.operator && obj.second_number) {
                result = calculate(obj);
                updatePanel(result);
                appendToPanel(string);
            }
            //Z.B. operation = "1+"
            else if(obj.operator) {
                operation = operation.slice(0, operation.length - 1);
                operation += string;
                updatePanel(operation);
            }
            //Z.B. operation = "1"
            else if(obj.valid) {
                appendToPanel(string);
            }
            //Z.B. operation = ""
            else if(string == "-") {
                updatePanel(string);
            }

            if(string == "%") {
                appendingNumbersAllowed = false;
            }
            else {
                appendingNumbersAllowed = true;
            }

            if (string == "√") {
                let new_operation = getPanelContent();
                let new_obj = operate(new_operation);
                // console.log(new_obj);
                if(new_obj.valid) {
                    result = calculate(new_obj);
                    updatePanel(result);
                }
            }
            
            panelShowsResult = false;
            break;

        case "MRC":
        case "MC":
        case "M+":
        case "M-":
            //Z.B. operation = "1+1"
            if(obj.operator && obj.second_number) {
                result = calculate(obj);
                updatePanel(result);
            }
            else if(obj.first_number) {
                updatePanel(obj.first_number);
            }

            let new_operation = getPanelContent()? getPanelContent():"0";
            let new_obj = operate(new_operation); //should only have first number
            if (!(
                Number.isFinite(new_obj.first_number) && 
                !new_obj.operator && 
                !new_obj.second_number)
            ) {
                console.table(new_obj);
                console.log(Number.isFinite(new_obj.first_number) == true);
                console.log(new_obj.operator == true);
                console.log(new_obj.second_number == true);
                throw new Error("CUSTOM ERROR FOR M BUTTONS");
            }
            if (string == "M+") {
                memory += new_obj.first_number;
                updatePanel(memory);
            }
            else if (string == "M-") {
                memory -= new_obj.first_number;
                updatePanel(memory);
            }
            else if (string == "MRC") {
                updatePanel(memory);
            }
            else if (string == "MC") {
                memory = 0;
                updatePanel(memory);
            }

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
        case "enter":
            if(obj.valid) {
                result = calculate(obj);
                updatePanel(result);
            }
            else {
                updatePanel("Invalid operation");
            }
            panelShowsResult = true;
            appendingNumbersAllowed = true;
            break;
    
        default:
            console.log(string);
            break;
    }
}