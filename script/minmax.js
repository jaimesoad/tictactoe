/**
 * @param {number} x 
 * @param {number} y
 * @returns {number}
 */
function getCell(x, y) {
    if (x > 3 || x < 0) {
        return -1
    }

    switch (y) {
        case 1:
            return x - 1

        case 2:
            return x + y

        case 3:
            return x + y + 2
    }

    return -1
}

/**
 * @param {number} cellNum  
 * @returns {{x: number, y: number}}
 */
function getCoords(cellNum) {
    if (cellNum < 0) {
        return { x: -1, y: -1 }
    }

    switch (true) {
        case cellNum <= 2:
            return {
                x: cellNum + 1,
                y: 1
            }

        case cellNum <= 5:
            return {
                x: cellNum - 2,
                y: 2
            }

        case cellNum <= 8:
            return {
                x: cellNum - 5,
                y: 3
            }
    }

    return { x: -1, y: -1 }
}

/**
 * @param {number} depth
 * @param {string} state
 * @param {boolean} isMax
 * @param {number} index 
 * @returns {{index: number, value: number}}
 */
function miniMax(depth, state, index, isMax) {
    const evaluation = evalPosition(state)

    if (Math.abs(evaluation) === Infinity) {
        return {
            index: index,
            value: evaluation
        }
    }

    if (depth == 0) {
        //console.log(state, depth)
        return {
            index: index,
            value: evalPosition(state)
        }
    }

    if (isMax) {
        let max = -Infinity
        let ret = {
            index: 0,
            value: 0
        }

        for (let i = 0; i < state.length; i++) {
            if (state[i] != ".") {
                continue
            }
            const mod = replaceAt(state, i, "x")

            let maxEval = miniMax(depth - 1, mod, i, false)

            max = Math.max(max, maxEval.value)

            if (max == maxEval.value) {
                ret.value = max
                ret.index = i

            }

            /* if (max == Infinity) {
                break
            } */
        }


        return ret
    }

    let min = Infinity
    let ret = {
        index: 0,
        value: 0
    }

    for (let i = 0; i < state.length; i++) {
        if (state[i] != ".") {
            continue
        }

        const mod = replaceAt(state, i, "o")

        let minEval = miniMax(depth - 1, mod, i, true)

        min = Math.min(min, minEval.value)

        if (min == minEval.value) {
            ret.index = i
            ret.value = min

        }

        /* if (min == -Infinity) {
            break
        } */
    }


    return ret
}


/**
 * @param {string} position
 * @returns {number}
  */
function evalPosition(position) {
    let score = 0

    // Vertical
    for (let i = 0; i < 9; i += 3) {
        let run = 0

        for (let j = i; j < i + 3; j++) {
            switch (position[j]) {
                case "x":
                    run += 1
                    break

                case "o":
                    run -= 1
            }
        }

        if (Math.abs(run) == 3) {
            return Infinity * run
        }

        score += run
    }

    // Horizontal
    for (let i = 0; i < 3; i++) {
        let run = 0

        for (let j = i; j < 9; j += 3) {
            switch (position[j]) {
                case "x":
                    run += 1
                    break

                case "o":
                    run -= 1
            }
        }

        if (Math.abs(run) == 3) {
            return Infinity * run
        }

        score += run
    }

    let run = 0

    // Diagonal L2R
    for (let i of [0, 4, 8]) {
        switch (position[i]) {
            case "x":
                run += 1
                break

            case "o":
                run -= 1
        }
    }

    if (Math.abs(run) == 3) {
        return Infinity * run
    }

    score += run

    run = 0

    // Diagonal R2L
    for (let i of [2, 4, 6]) {
        switch (position[i]) {
            case "x":
                run += 1
                break

            case "o":
                run -= 1
        }
    }

    if (Math.abs(run) == 3) {
        return Infinity * run
    }

    return score + run
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

export {
    miniMax,
    evalPosition
}