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

// Operations
let firstNumber = 0
let secondNumber = 0
let operators = []

function operate(a, b, operator){
    if (operator === '+') {
        return add(a, b)
    } else if (operator === '-') {
        return subtract(a, b)
    } else if (operator === '*') {
        return multiply(a, b)
    } else if (operator === '/') {
        return divide(a, b)
    }
}

// Basic calculator layout
const calculator = document.querySelector('.calculator')
const screen = document.querySelector('.screen')
const operatorContainer = document.querySelector('.operators')
const numericalsContainer = document.querySelector('.numericals')

// Create operators


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
