const numbersBtn = document.querySelectorAll('[data-num]');
const operatorsBtn = document.querySelectorAll('[data-operator]');
const equalBtn = document.getElementById('equal');
const clearBtn = document.getElementById('clear');
const deleteBtn = document.getElementById('delete');
const decimalBtn = document.getElementById('decimal');
const prevScreen = document.getElementById('prev');
const currentScreen = document.getElementById('cur');

clearBtn.addEventListener('click', clearScreen);
deleteBtn.addEventListener('click', deleteNumber);
equalBtn.addEventListener('click', solve);
decimal.addEventListener('click', addDecimal);

let firstNumber = '';
let secondNumber = '';
let shouldReset = false;
let currentOperation = null;

numbersBtn.forEach(btn => {
    btn.addEventListener('click', () => appendNum(btn.textContent));
});

operatorsBtn.forEach(btn => {
    btn.addEventListener('click', () => addOperator(btn.textContent));
});

function appendNum(number) {
    if (currentScreen.textContent==='0' || shouldReset) {
        resetScreen();
    }
    currentScreen.textContent += number;
}

function addOperator(operator) {
    if (currentOperation!==null) solve();
    firstNumber = currentScreen.textContent;
    currentOperation = operator;
    prevScreen.textContent = `${firstNumber} ${currentOperation}`;
    shouldReset = true;
}

function resetScreen() {
    currentScreen.textContent = '';
    shouldReset = false;
}

function clearScreen() {
    currentScreen.textContent = '0';
    prevScreen.textContent = '';
    firstNumber = '';
    secondNumber = '';
    currentOperation = null;
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
    if (currentOperation===null || shouldReset) return;
    if (currentOperation==='÷' && currentScreen.textContent==='0') {
        alert("Cant't divide by zero");
        return;
    }
    secondNumber = currentScreen.textContent;
    currentScreen.textContent = round(operate(firstNumber, secondNumber, currentOperation));
    prevScreen.textContent = `${firstNumber} ${currentOperation} ${secondNumber} =`;
    currentOperation = null;
}

function deleteNumber() {
    currentScreen.textContent = currentScreen.textContent.toString().slice(0, -1);
}

function operate(a, b, operator) {
    if (operator==='+') return add(a, b);
    if (operator==='-') return subtract(a, b);
    if (operator==='×') return multiply(a, b);
    if (operator==='÷') return divide(a, b);
}

function round(number) {
    return Math.round(number*1000)/1000;
}