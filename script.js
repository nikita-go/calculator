const buttonPad = document.getElementById('numButtons');
const operatorsBtn = document.querySelectorAll('.operatorBtn');
const equalBtn = document.querySelector('.equalBtn');
const clearBtn = document.querySelector('.clear');
const deleteBtn = document.querySelector('.delete');
const decimalBtn = document.querySelector('.decimalBtn');
const prevScreen = document.querySelector('.prev');
const currentScreen = document.querySelector('.current');

clearBtn.onclick = () => {clearScreen();};
deleteBtn.onlick = () => {deleteNumber();};
equalBtn.onclick = () => {solve();};
decimalBtn.onclick = () => {addDecimal();};

let firstNum = '';
let secondNum = '';
let shouldReset = false;
let curOperator = null;

function appendNum(number) {
    if (currentScreen.textContent==='0' || shouldReset) {
        resetScreen();
    }
    currentScreen.textContent += number;
}

function addOperator(operator) {
    if (curOperator!==null) solve();
    firstNum = currentScreen.textContent;
    curOperator = operator;
    prevScreen.textContent = `${firstNum} ${curOperator}`;
    shouldReset = true;
}

function resetScreen() {
    currentScreen.textContent = '';
    shouldReset = false;
}

function clearScreen() {
    currentScreen.textContent = '0';
    prevScreen.textContent = '';
    firstNum = '';
    secondNum = '';
    curOperator = null;
}

function addDecimal() {
    if (shouldReset) resetScreen();
    if (currentScreen.textContent==='') currentScreen.textContent = '0';
    if (!currentScreen.textContent.includes('.')) currentScreen.textContent += '.';
}

function add(a, b) {
    return Number(a)+Number(b);
}

function subtract(a, b) {
    return a-b;
}

function multiply(a, b) {
    return a*b;
}

function divide(a, b) {
    return a/b;
}

function solve() {
    if (curOperator===null || shouldReset) return;
    if (curOperator==='÷' && currentScreen.textContent==='0') {
        alert("Cant't divide by zero");
        return;
    }
    secondNum = currentScreen.textContent;
    currentScreen.textContent = round(operate(firstNum, secondNum, curOperator));
    prevScreen.textContent = `${firstNum} ${curOperator} ${secondNum} =`;
    curOperator = null;
}

function deleteNumber() {
    currentScreen.textContent = currentScreen.textContent.slice(0, -1);
}

operatorsBtn.forEach(btn => {
    btn.onclick = () => {addOperator(btn.textContent);}
});

function operate(a, b, operator) {
    if (operator==='+') return add(a, b);
    if (operator==='-') return subtract(a, b);
    if (operator==='×') return multiply(a, b);
    if (operator==='÷') return divide(a, b);
}

function round(number) {
    return Math.round(number*1000)/1000;
}

for (let i = 0; i < 10; i++) {
    const btn = document.createElement('button');
    btn.onclick = () => {appendNum(i);};
    btn.textContent = i;
    buttonPad.appendChild(btn);
}