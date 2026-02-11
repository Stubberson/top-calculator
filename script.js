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

function sqrt(a) {
    return Math.sqrt(a)
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
    } else if (operator === '\u221A') {
        return sqrt(a)
    } else if (operator === 'x\u207f') {
        return exponent(a, b)
    }
}

// Basic calculator layout
const calculator = document.querySelector('.calculator')
const screen = document.querySelector('.screen')
const topContainer = document.querySelector('.top-operators')
const numerOperContainer = document.querySelector('.numericals-operators')
const numericalsContainer = document.querySelector('.numericals')
const sideOperatorContainer = document.querySelector('.side-operators')
const bottomContainer = document.querySelector('.bottom-operators')

// Create screen
screen.innerText = '000'

// Create top operator row with AC, square root, exponent, and division
const topOperators = ['AC', '\u221A', 'x\u207f', '\u00F7']
for (let i = 0; i < topOperators.length; i++) {
    const topButton = document.createElement('button')
    topButton.innerText = topOperators[i]
    topContainer.appendChild(topButton)
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

// Create operators
const sideOperators = ['\u00D7', '-', '+']
for (let i = 0; i < sideOperators.length; i++) {
    const operButton = document.createElement('button')
    operButton.innerText = sideOperators[i]
    sideOperatorContainer.appendChild(operButton)
}

// Create bottom row with zero, decimal, and equals
const bottomOperators = ['0', '.', '=']
for (let i = 0; i < bottomOperators.length; i++) {
    const bottomButton = document.createElement('button')
    bottomButton.innerText = bottomOperators[i]
    // Add a class for the equals button for making it larger
    if (i === 2) {
        bottomButton.classList.add('equals')
    }
    bottomContainer.appendChild(bottomButton)
}