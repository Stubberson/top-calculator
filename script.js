// Calculator layout
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
function countDecimals(a) {
    return a.toString().split(".")[1].length
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
        operButton.id = 'equals'  // Permit equals-button to be modified
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
let numberClicked = false
let operatorClicked = false
let previousOperator = undefined
calculator.addEventListener('click', (event) => {
    // Only listen to buttons
    if (event.target.nodeName === 'BUTTON') {
        let clickedButton = event.target
        // Screen update
        if (parseInt(clickedButton.innerText) || clickedButton.innerText === '0' || clickedButton.innerText === '.') {
            // Only allow one decimal point
            if (clickedButton.innerText === '.' && screen.innerText.includes('.')) {
                return
            }
            // Don't fill screen with 0s
            if (clickedButton.innerText === '0' && screen.innerText === '0') {
                clickInstance += 1
                return
            // Display new number on first click or after operator click
            } else if (clickInstance === 0 || operatorClicked === true) {
                screen.innerText = clickedButton.innerText
                clickInstance += 1
                operatorClicked = false
            } else {
                screen.innerText += clickedButton.innerText
                clickInstance += 1
            }            
        }
        
        // Calculations
        if (mathOperators.includes(clickedButton.innerText)) {
            operatorClicked = true
            let result = 0
            if (clickedButton.innerText !== '=') {
                // Let user combine multiple operators
                if (previousOperator) {
                    secondNumber = parseFloat(screen.innerText)    
                    result = operate(firstNumber, secondNumber, previousOperator)
                    Number.isInteger(result) || (countDecimals(result) < 2) ? screen.innerText = result : screen.innerText = result.toFixed(2)
                    previousOperator = clickedButton.innerText
                }
                firstNumber = parseFloat(screen.innerText)
                previousOperator = clickedButton.innerText
            } else {
                secondNumber = parseFloat(screen.innerText)
                result = operate(firstNumber, secondNumber, previousOperator)
                Number.isInteger(result) || (countDecimals(result) < 2) ? screen.innerText = result : screen.innerText = result.toFixed(2)
                firstNumber = result
                secondNumber = 0
                previousOperator = undefined
            }
        }

        // Clear screen and memory
        if (clickedButton.innerText === 'AC') {
            screen.innerText = '0'
            clickInstance = 0
            firstNumber = 0
            secondNumber = 0
            operatorClicked = false
            previousOperator = undefined
        }
    }
})