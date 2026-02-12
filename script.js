// Basic calculator layout
const calculator = document.querySelector('.calculator')
const screen = document.querySelector('.screen')
const topContainer = document.querySelector('.top-operators')
const sideContainer = document.querySelector('.side-operators')
const bottomContainer = document.querySelector('.bottom-operators')
const numericalsContainer = document.querySelector('.numericals')

// Math symbols, easier to remember as vars than unicode strings
const multiSymbol = '\u00D7'
const divSymbol = '\u00F7'
const sqrtSymbol = '\u221A'
const expSymbol = 'x\u207f'

const operators = ['AC', sqrtSymbol, expSymbol, divSymbol, multiSymbol, '-', '+', '0', '.', '=']
const mathOperators = [sqrtSymbol, expSymbol, divSymbol, multiSymbol, '-', '+', '=']

// Placeholder screen text
screen.innerText = '0'

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

function operate(a, b, operator){
    if (operator === '+') {
        return add(a, b)
    } else if (operator === '-') {
        return subtract(a, b)
    } else if (operator === '\u00D7') {
        return multiply(a, b)
    } else if (operator === '\u00F7') {
        if (b === 0) {
            return screen.innerText = 'Snarky!'
        }
        return divide(a, b)
    } else if (operator === '\u221A') {
        if (a === 0 || b === 0) {
            return screen.innerText = 'Snarky!'
        }
        return sqrt(a)
    } else if (operator === 'x\u207f') {
        return exponent(a, b)
    }
}

// Create operator buttons
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

// Functionality
let firstNumber = 0
let secondNumber = 0
let clickInstance = 0
let operatorClicked = false
let previousOperator = undefined
calculator.addEventListener('click', (event) => {
    // Only listen to buttons
    if (event.target.nodeName === 'BUTTON') {
        // Screen update
        if (parseInt(event.target.innerText) || event.target.innerText === '0' || event.target.innerText === '.') {
            // Only allow one decimal point
            if (event.target.innerText === '.' && screen.innerText.includes('.')) {
                return
            }
            // Clear the screen on first click and after operator click
            if (clickInstance === 0 || operatorClicked === true) {
                screen.innerText = event.target.innerText
                clickInstance += 1
                operatorClicked = false
            } else {
                screen.innerText += event.target.innerText
                clickInstance += 1
            }            
        }
        // Clear screen and memory
        if (event.target.innerText === 'AC') {
            screen.innerText = '0'
            clickInstance = 0
            firstNumber = 0
            secondNumber = 0
            operatorClicked = false
        }
        // Calculations
        if (mathOperators.includes(event.target.innerText)) {
            operatorClicked = true
            let result = 0
            // 
            if (event.target.innerText !== '=') {
                firstNumber = parseFloat(screen.innerText)
                previousOperator = event.target.innerText
            } else {
                secondNumber = parseFloat(screen.innerText)
                result = operate(firstNumber, secondNumber, previousOperator)
                screen.innerText = result
                firstNumber = result
                secondNumber = 0
                previousOperator = event.target.innerText
            }
        }
    }
})