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
const expSymbol = 'x\u207f'

const operators = ['AC', 'C', expSymbol, divSymbol, multiSymbol, '-', '+', '0', '.', '=']

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

function countDecimals(a) {
    return a.toString().split(".")[1].length
}

function operate(a, b, operator){
    switch (operator) {
        case '+':
            return add(a, b)
        case '-':
            return subtract(a, b)
        case '\u00D7':
            return multiply(a, b)
        case '\u00F7':
            if (b === 0) {
                return screen.innerText = 'Snarky!'
            }
            return divide(a, b)
        case 'x\u207f':
            return exponent(a, b)
    }
}

// Create operator buttons (and '0')
for (let i = 0; i < operators.length; i++) {
    const operButton = document.createElement('button')
    operButton.innerText = operators[i]
    switch (operators[i]) {  // "Special" buttons
        case '=':
            operButton.classList.add('equals')
            break
        case 'AC':
            operButton.classList.add('all-clear')
            break
        case 'C':
            operButton.classList.add('clear')
            break
        case '.':
            operButton.classList.add('decimal')
            break
        case '0':
            operButton.classList.add('numeric')
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
        numButton.classList.add('numeric')
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
let firstNumber = ''
let secondNumber = ''
let previousOperator = undefined
let operatorInstance = 0
let buttonMemory = [0]
let result = 0

calculator.addEventListener('click', (event) => {
    // Only listen to buttons
    if (event.target.nodeName === 'BUTTON') {
        let clickedButton = event.target
        let clickedButtonClass = clickedButton.className
        let lastClickedButton = buttonMemory[buttonMemory.length - 1]

        // Display numeric inputs
        if (clickedButtonClass === 'numeric' || clickedButtonClass === 'decimal') {
            // Do not allow edge cases
            if ((clickedButton.innerText === '.' && screen.innerText.includes('.')) || 
                (clickedButton.innerText === '.' && screen.innerText === '') ||
                (clickedButton.innerText !== '.' && (screen.innerText === '0' && result !== 0)) ||
                (screen.innerText.length > 16 && lastClickedButton.className !== '')) {
                return
            }
            // Clear the display after certain actions
            if (lastClickedButton.className === '' || 
                lastClickedButton.className === 'equals' ||
                screen.innerText === undefined || 
                screen.innerText === 'Infinity') {
                screen.innerText = ''
            }
            screen.innerText += clickedButton.innerText
        }
        
        // Operator click
        if (clickedButtonClass === '' && lastClickedButton.className !== '') {
            if (screen.innerText === '') return
            operatorInstance++
            if (operatorInstance === 1) {
                firstNumber = parseFloat(screen.innerText)
            } else {
                secondNumber = parseFloat(screen.innerText)
                result = operate(firstNumber, secondNumber, previousOperator)
                firstNumber = result
                screen.innerText = result
            }
            previousOperator = clickedButton.innerText
        }

        // End result
        if (clickedButtonClass === 'equals') {
            if (screen.innerText === '' || firstNumber === '') return
            if (lastClickedButton.className === 'equals') {  // Allow repeated result
                result = operate(result, secondNumber, previousOperator)
                screen.innerText = result
            } else {
                secondNumber = parseFloat(screen.innerText)
                result = operate(firstNumber, secondNumber, previousOperator)
                screen.innerText = result
                operatorInstance = 0
            }
        }

        // Clear previous input
        if (clickedButtonClass === 'clear') {
            screen.innerText = screen.innerText.slice(0, screen.innerText.length - 1)
        }

        // All Clear
        if (clickedButtonClass === 'all-clear') {
            screen.innerText = ''
            firstNumber = ''
            secondNumber = ''
            operatorInstance = 0
            previousOperator = undefined
            buttonMemory = [0]
        }

        // Push the clicked button to memory
        buttonMemory.push(clickedButton)
    }
})