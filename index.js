const display = document.getElementById("display");

function appendToDisplay(input){
    display.value += input;
}

function clearDisplay(){
    display.value="";
}

function deleteCharacter(){
    display.value=display.value.slice(0, -1);
}
function calculate(){
    try {
        const hasPercentage=percentage();

        display.value=eval(display.value);
        
    }
    catch {
        display.value = "Error";
    }
}

function flipSign(){
   display.value *= -1;
}

function percentage(){
    let expression = display.value;

    const percentagePattern = /(.*)([+\-*/])\s*(\d+(?:\.\d+)?)%$/;
    const match = expression.match(percentagePattern);
    
    if (match) {
        const beforeExpr = match[1];  
        const operator = match[2];
        const percentNum = parseFloat(match[3]);

        const baseValue = eval(beforeExpr);

        const percentageValue = (baseValue * percentNum) / 100;


        display.value = beforeExpr + operator + percentageValue;
        return true;
    }
    return false;
}