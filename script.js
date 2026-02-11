// Basic functions
function add(a, b) {
    return a + b
}

function subtract(a, b) {
    return a - b
}

function multiply(a, b) {
    return a * b
}

function divide(a, b){
    return a / b
}

function exponent(a, b) {
    return a ** b
}

// Operations
let firstNumber = 0
let secondNumber = 0

function operate(a, b, operator){
    if (operator === '+') {
        return add(a, b)
    } else if (operator === '-') {
        return subtract(a, b)
    } else if (operator === '\u00D7') {
        return multiply(a, b)
    } else if (operator === '\u00F7') {
        return divide(a, b)
    } else if (operator === 'x\u207f') {
        return exponent(a, b)
    }
}

// Basic calculator layout
const calculator = document.querySelector('.calculator')
const screen = document.querySelector('.screen')
const numerOperContainer = document.querySelector('.numericals-operators')
const numericalsContainer = document.querySelector('.numericals')
const operatorContainer = document.querySelector('.operators')
const bottomContainer = document.querySelector('.bottom-row')

// Create screen
screen.innerText = '000'

// Create operators
const operators = ['AC', 'x\u207f', '\u00F7', '\u00D7', '-', '+']
for (let i = 0; i < operators.length; i++) {
    const operButton = document.createElement('button')
    operButton.innerText = operators[i]
    operatorContainer.appendChild(operButton)
}

// Create numericals button grid 1-9
for (let row = 3; row > 0; row--) {
    const rowContainer = document.createElement('div')
    rowContainer.classList.add('num-row')
    for (let number = 1; number < 4; number++) {
        const numButton = document.createElement('button')
        if (row === 3) {
            numButton.innerText = number + 6
        } else if (row === 2) {
            numButton.innerText = number + 3
        } else {
            numButton.innerText = number
        }
        rowContainer.appendChild(numButton)
    }
    numericalsContainer.appendChild(rowContainer)
}

// Create bottom row with zero, decimal, and equals
const bottomOperators = ['0', '.', '=']
for (let i = 0; i < 3; i++) {
    const bottomButton = document.createElement('button')
    bottomButton.innerText = bottomOperators[i]
    bottomContainer.appendChild(bottomButton)
}