let panel = document.querySelector(".panel");

function appendToPanel(string) {
    panel.textContent = panel.textContent + string;
}

function clearPanel() {
    panel.textContent = "";
}

function updatePanel(string) {
    clearPanel();
    appendToPanel(string);
}

function getPanelContent() {
    return panel.textContent;
}