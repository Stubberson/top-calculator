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
const sideContainer = document.querySelector('.side-operators')
const bottomContainer = document.querySelector('.bottom-operators')
const numericalsContainer = document.querySelector('.numericals')

// Create screen
screen.innerText = '0'

// Math symbols, easier to remember as vars than unicode strings
const multiSymbol = '\u00D7'
const divSymbol = '\u00F7'
const sqrtSymbol = '\u221A'
const expSymbol = 'x\u207f'

// Create operator buttons
const operators = ['AC', sqrtSymbol, expSymbol, divSymbol, multiSymbol, '-', '+', '0', '.', '=']
for (let i = 0; i < operators.length; i++) {
    const operButton = document.createElement('button')
    operButton.innerText = operators[i]
    if (operators[i] === '=') {
        operButton.id = 'equals'  // Permit equals-button modification
    }
    // Distribute buttons between the top and bottom rows, and side column
    if (i < 4) {
        topContainer.appendChild(operButton)
    } else if (i > 3 && i < 7) {
        sideContainer.appendChild(operButton)
    } else {
        bottomContainer.appendChild(operButton)
    }
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

// Update screen
let clickNumber = 0
calculator.addEventListener('click', (event) => {
    // Only listen to buttons
    if (event.target.nodeName === 'BUTTON') {
        // Screen update
        if (parseInt(event.target.innerText) || event.target.innerText === '0' || event.target.innerText === '.') {
            // Only allow one decimal point
            if (event.target.innerText === '.' && screen.innerText.includes('.')) {
                return
            }
            // Clear the placeholder zero on first click
            if (clickNumber === 0) {
                screen.innerText = event.target.innerText
                clickNumber += 1
            } else {
                screen.innerText += event.target.innerText
                clickNumber += 1
            }            
        }
        // Clear screen and memory
        if (event.target.innerText === 'AC') {
            screen.innerText = '0'
            clickNumber = 0
        }
    }
})