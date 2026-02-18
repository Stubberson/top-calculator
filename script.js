const calculator = document.querySelector('.calculator')
const screen = document.querySelector('.screen')
const topContainer = document.querySelector('.top-operators')
const sideContainer = document.querySelector('.side-operators')
const bottomContainer = document.querySelector('.bottom-operators')
const numericalsContainer = document.querySelector('.numericals')
let buttons = calculator.getElementsByTagName('button')

const multiSymbol = '\u00D7'
const divSymbol = '\u00F7'
const expSymbol = 'x\u207f'
const operators = ['AC', 'C', expSymbol, divSymbol, multiSymbol, '-', '+', '0', '.', '=']

// --- BASIC MATHS ---
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

function countLength(a) {
    return a.toString().length
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
                return 'Snerky!'
            }
            return divide(a, b)
        case 'x\u207f':
            return exponent(a, b)
    }
}

// --- CREATE HTML ---
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

// Array after buttons have been created
buttons = Array.from(buttons)

// --- FUNCTIONALITY ---
let firstNumber = ''
let secondNumber = ''
let previousOperator = undefined
let inputClassMemory = [0]
let lastInputClass = undefined
let keyMemory = [0]
let lastKey = undefined
let result = 0

function getInputType(event) {
    return event instanceof KeyboardEvent ? event.key : event.target
}

function userInput(inputText, inputClass) {
    // Do not allow edge cases
    if ((inputText === '.' && screen.innerText.includes('.')) || 
        (inputText === '.' && screen.innerText === '') ||
        (inputText === '0' && screen.innerText === '0') ||
        (screen.innerText.length > 13 && lastInputClass !== '')) {
        return
    }

    // Clear display
    if (lastInputClass === '' || 
        (lastInputClass === 'equals' && inputClass === 'numeric') ||
        (inputText !== '.' && screen.innerText === '0') ||
        screen.innerText === undefined || 
        screen.innerText === 'Infinity') {
        screen.innerText = ''
    }
    screen.innerText += inputText
    buttons.forEach(btn => {  // Enable operator
        btn.disabled = false
    })
}

function operatorInput(inputText) {
    if (screen.innerText === '') return

    buttons.forEach(btn => {
        if (btn.innerText === inputText) {
            btn.disabled = true
        }
        if (btn.innerText === lastKey) {   // Enable operator if there was operator misclick
            btn.disabled = false
        }
    })
    
    if (lastInputClass === '') {  // Spamming operators won't change result
        previousOperator = inputText
        return
    }

    if (!inputClassMemory.some(item => item === '')) {
        firstNumber = parseFloat(screen.innerText)
    } else {
        secondNumber = parseFloat(screen.innerText)
        result = operate(firstNumber, secondNumber, previousOperator)
        firstNumber = result
        countLength(result) < 14 ? screen.innerText = result : screen.innerText = result.toExponential(3)
    }
    previousOperator = inputText
}

function getResult() {
    if (screen.innerText === '' || firstNumber === '' || buttons.some(btn => btn.disabled)) return
    if (lastInputClass === 'equals') {  // Allow repeated result
        result = operate(result, secondNumber, previousOperator)
        countLength(result) < 14 ? screen.innerText = result : screen.innerText = result.toExponential(3)
        buttons.forEach(btn => {
            btn.disabled = false 
        })
    } else {
        secondNumber = parseFloat(screen.innerText)
        result = operate(firstNumber, secondNumber, previousOperator)
        countLength(result) < 14 ? screen.innerText = result : screen.innerText = result.toExponential(3)
    }
    inputClassMemory = [0]
}

function clearAll() {
    screen.innerText = ''
    firstNumber = ''
    secondNumber = ''
    previousOperator = undefined
    keyMemory = [0]
    lastKey = undefined
    inputClassMemory = [0]
    lastInputClass = undefined
    buttons.forEach(btn => {
        btn.disabled = false 
    })
}


// --- LISTENERS ---
// Click
calculator.addEventListener('click', (event) => {
    // Only listen to buttons
    if (event.target.nodeName === 'BUTTON') {
        let clickedButton = getInputType(event)
        let clickedButtonClass = clickedButton.className
        lastKey = keyMemory[keyMemory.length - 1]
        lastInputClass = inputClassMemory[inputClassMemory.length - 1]

        // Display numeric inputs
        if (clickedButtonClass === 'numeric' || clickedButtonClass === 'decimal') {
            userInput(clickedButton.innerText, clickedButtonClass)
        }
        
        // Operator click
        if (clickedButtonClass === '') {
            operatorInput(clickedButton.innerText)
        }

        // End result
        if (clickedButtonClass === 'equals') {
            getResult()
        }

        // Clear previous input
        if (clickedButtonClass === 'clear') {
            screen.innerText = ''
        }

        // All Clear
        if (clickedButtonClass === 'all-clear') {
            clearAll()
        }

        // Push the clicked button to memory
        inputClassMemory.push(clickedButtonClass)
        keyMemory.push(clickedButton.innerText)
    }
})

// Keyboard
document.addEventListener('keydown', (event) => {
    let pushedKey = getInputType(event)
    let pushedKeyClass = undefined
    lastKey = keyMemory[keyMemory.length - 1]
    lastInputClass = inputClassMemory[inputClassMemory.length - 1]

    // User input
    if (parseInt(pushedKey) || pushedKey === '0' || pushedKey === '.') {
        pushedKey === '.' ? pushedKeyClass = 'decimal' : pushedKeyClass = 'numeric'
        userInput(pushedKey, pushedKeyClass)

        keyMemory.push(pushedKey)
        inputClassMemory.push(pushedKeyClass)
    }

    // Operators
    const mathOperators = ['+', '-', '/', '*', 'e']
    if (mathOperators.includes(pushedKey)) {
        pushedKeyClass = ''
        switch (pushedKey) {
            case '/':
                pushedKey = divSymbol
                break
            case '*':
                pushedKey = multiSymbol
                break
            case 'e':
                pushedKey = expSymbol
        }
        if (pushedKey === lastKey) return
        operatorInput(pushedKey)

        keyMemory.push(pushedKey)
        inputClassMemory.push(pushedKeyClass)
    }

    // Result
    if (pushedKey === 'Enter') {
        pushedKeyClass = 'equals'
        getResult()

        inputClassMemory.push(pushedKeyClass)
    }

    // Clear
    if (pushedKey === 'Backspace') {
        screen.innerText = ''
    }

    // All Clear
    if (pushedKey === 'a') {
        clearAll()
    }
})