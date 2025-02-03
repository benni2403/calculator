let panel = document.querySelector(".panel");
let span = panel.querySelector("span");

function appendToPanel(string) {
    span.textContent = span.textContent + string;
    resizeFont();
}

function clearPanel() {
    span.textContent = "";
    resizeFont();
}

function updatePanel(string) {
    clearPanel();
    appendToPanel(string);
}

function getPanelContent() {
    return span.textContent;
}

function resizeFont() {
    let fontSize = parseInt(getComputedStyle(span).fontSize);

    let possibleSizes = [32, 28, 24, 22, 20, 18, 16, 14, 12];
    let index = possibleSizes.findIndex(element => element === fontSize);
    
    if (sizeTooBig()) {
        if (index >= 0 && index < possibleSizes.length - 1) {
            let newFontsize = possibleSizes[index + 1];
            span.style.fontSize = `${newFontsize}px`;
        }
        else {
            let newFontsize = fontSize * 0.9;
            span.style.fontSize = `${newFontsize}px`;
        }
    }
    else {
        if (index > 0) {
            let newFontsize = possibleSizes[index - 1];
            span.style.fontSize = `${newFontsize}px`;
            
            if (sizeTooBig()) {
                span.style.fontSize = `${fontSize}px`;
            }
        }
        else if (index < 0) {
            console.log(fontSize);
            let newFontsize = possibleSizes[possibleSizes.length - 1];
            span.style.fontSize = `${newFontsize}px`;
            console.log(`trying to go to ${newFontsize}`);

            if (sizeTooBig()) {
                newFontsize = fontSize * 1.2;
                console.log(`too big, trying to go to ${newFontsize}`);
                span.style.fontSize = `${newFontsize}px`;

                if (sizeTooBig()) {
                    span.style.fontSize = `${fontSize}px`;
                    console.log(`too big, going back to ${fontSize}`);
                }
                else {
                    console.log(`Worked! ${sizeTooBig()}`);
                }
            }
            else {
                console.log(`Worked! ${sizeTooBig()}`);
            }
        }
    }
}

function sizeTooBig() {
    let spanWidth = span.clientWidth;
    let panelWidth = panel.clientWidth;
    if(spanWidth == 0) {
        console.warn(`panel width is ${computed.width}`);
    }
    
    return spanWidth > panelWidth;
}