const display = document.getElementById("screen") as HTMLInputElement;
const clearE = document.getElementById("clear") as HTMLElement;
const buttons = document.querySelectorAll(".btn");
// let currentDisplay = display.value || "0";

/* Track numbers and operators pressed */
let history:string[] = [];

/* Track when decimal or operator has been pressed */
let pendinOp:boolean = false;
let pendinDes:boolean = false;
let currentOp: string | null = null;

let answer:string = "";
// const pendOp: string | null = null;

// console.log("checking:", clearE);
// console.log("Found buttons count:", buttons.length);
// console.log(`-${display} was not displayed`);
// console.log(`-${display.value} is being displayed`);

/* Watch for attribute changes on the input element */
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.attributeName === 'readonly') {
            if (!display.hasAttribute('readonly')) {
                display.setAttribute('readonly', 'true');
            }
        }
    });
});
observer.observe(display, { attributes: true });

buttons.forEach(button =>{
    button.addEventListener('click', (event) => {
        const target = event.currentTarget as HTMLButtonElement; 
        // const value = target.getAttribute("data-value");
        const value = target.textContent?.trim();
        
        if (!value){return}//protect from empty input

        switch(value){
        case '=': 
            equalButton();
            console.log(`${value} was clicked!`);
            break;
        case 'C':
            // console.log(`${value} was clicked.`);
            clearDisplay();
            break;
        case '÷':
            operationButton('/');
            break;
        case '×':
            operationButton('*');
            break;
        case '−':
            operationButton('-');
            break;
        case '+': 
            // console.log(`operator ${value} was clicked`);
            operationButton(value);
            break;
        case '.':
            decimalButton(value);
            break;
        default:
            // console.log(`number ${value} was clicked`);
            appendButton(value);
            break;
        }
    });
}); 

// const screen = document.getElementById('screen') as HTMLInputElement;

function decimalButton(dec:string){
    const currentDisplay = display.value || "0"; 
    if(pendinOp && !pendinDes){
        clearDisplay()
        // currentDisplay = display.value;
        console.debug(`Hist: ${history}, pressed: ${dec}`)
        display.value = "0" + dec; 

    }else if(currentDisplay === "0"){
        display.value = currentDisplay + dec;
    }else if(pendinDes){
        display.value = currentDisplay + dec;
    }
}

/* Append to the current vaule in the calculator screen */
function appendButton(num: string){
    //Read what is currently inside the input using .value
    const currentDisplay = display.value || "0"; 
    console.log(`!!${currentDisplay} | ${pendinOp} | ${pendinDes}!!`)
    
    if(currentDisplay === answer){
        clearDisplay();
        display.value = num;
    }else if(currentDisplay === "0" ) {
        display.value = num;
    }else if(pendinOp){
        clearDisplay();
        display.value = num;
        pendinOp = false;
        // clearE.textContent = "CE";
    }else{
        display.value = currentDisplay + num;
    }
}     

function clearDisplay(){
    const currentDisplay = display.value; 

    if(currentDisplay !== "0"){ 
        // console.log(`we have: ${currentDisplay}`)
        display.value = "0";
        // history = [];
        pendinDes = false;
        pendinOp = false;
        // console.log(`replace it with: ${display.value}`)
    }
}

function operationButton(op: string){
    const currentDisplay = display.value; 
    if(currentOp === null){
        currentOp = op;
        history.push(currentDisplay);
        history.push(currentOp);
        // pendinOp = true;
    }else if(history[-1] !== currentOp && pendinOp){
        history.pop();
        currentOp = op;
        history.push(currentOp);
    }else if(!pendinOp){
        // if(cu)
        currentOp = op;
        history.push(currentDisplay);
        history.push(currentOp);
    }
    pendinDes = false;
    pendinOp = true; 
    // history.push(op);
    console.log(`Hist: ${history}`);
} 
function equalButton(){ 
    // let answer:string = "";
    const lastUsed = history[-1];
    switch(lastUsed){
        case '÷':
        case '×':
        case '+': 
        case '−': 
            history.pop();
            break;
        default:
            history.push(display.value);
            break;
    }
    // console.warn(`Hist: ${history}, \nLastop: ${currentOp}\n${display.value}`);
    for (const i of history){
        answer += i;
    }
    clearDisplay();
    history = [];
    // console.log(`answer = ${eval(answer)}`);
    display.value = eval(answer);
    // let a = `1+2*3`
    // console.log(eval(a))
    // console.log('this= ',a)
}  
