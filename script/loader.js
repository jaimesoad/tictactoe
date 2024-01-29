import { evalPosition, miniMax } from "./minmax.js"

const cells = document.getElementsByClassName("cell")

// The multiply char
let currentChar = "x"
let gameState = "........."
let spaces = 9
let gameOver = false

for (let i = 0; i < cells.length; i++) {
    const item = cells.item(i)

    item.addEventListener("click", async () => {
        newMove(i, item)
    })


}

/**  
 * @param {number} index
 * @param {HTMLElement | null} item
*/
async function newMove(index, item) {
    if (item.innerHTML != "" || gameOver) {
        return
    }
    const xhr = new XMLHttpRequest()
    xhr.open("GET", `/assets/${currentChar}.svg`, false)
    xhr.overrideMimeType("image/svg+xml")
    xhr.onload = (e) => {
        item.appendChild(xhr.responseXML.documentElement)
    }
    xhr.send("")

    gameState = replaceAt(gameState, index, currentChar)
    
    currentChar = currentChar == "x" ? "o" : "x"

    spaces--

    const position = evalPosition(gameState)

    switch (position) {
        case Infinity:
            gameOver = true
            console.log("X wins!")
            return

        case -Infinity:
            gameOver = true
            console.log("O wins!")
            return
    }

    if (!(gameOver || gameState.includes("."))) {
        gameOver = true
        console.log("Tie!")
        return
    }

    if (currentChar == "o") {
        await new Promise((resolve) => {
            setTimeout (resolve, 250)
        })
        const idx = miniMax(spaces, gameState, 0, false)
        newMove(idx.index, cells.item(idx.index))
    }
}

/**
 * @param {string} input 
 * @param {number} index
 * @param {string} replacement
 */
function replaceAt(input, index, replacement) {
    let arr = input.split("")
    arr[index] = replacement
    return arr.join("")
}

function chooseRandom() {
    let choice = Math.floor(Math.random() * 9)

    if (!gameState.includes(".")) {
        return -1
    }

    while (gameState[choice] != ".") {
        choice = Math.floor(Math.random() * 9)
    }

    return choice
}

if (currentChar == "o") {
    const idx = miniMax(spaces, gameState, 0, false)
    console.log(idx, spaces, gameState)
    newMove(idx.index, cells.item(idx.index))
}