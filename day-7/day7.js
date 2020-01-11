// ABCDE
//  1002

// DE - two-digit opcode,      02 == opcode 2
//  C - mode of 1st parameter,  0 == position mode
//  B - mode of 2nd parameter,  1 == immediate mode
//  A - mode of 3rd parameter,  0 == position mode, omitted due to being a leading zero

const programm = [3,8,1001,8,10,8,105,1,0,0,21,34,55,68,85,106,187,268,349,430,99999,3,9,1001,9,5,9,1002,9,5,9,4,9,99,3,9,
            1002,9,2,9,1001,9,2,9,1002,9,5,9,1001,9,2,9,4,9,99,3,9,101,3,9,9,102,3,9,9,4,9,99,3,9,1002,9,5,9,101,3,9,9,
            102,5,9,9,4,9,99,3,9,1002,9,4,9,1001,9,2,9,102,3,9,9,101,3,9,9,4,9,99,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,3,
            9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,
            3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,
            4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,1,
            9,4,9,99,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,
            9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,102,2,9,9,4,9,3,9,
            1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,
            102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,
            3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,2,9,4,9,
            3,9,102,2,9,9,4,9,99]

// const programm = [3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,
//     27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5]

function* intcodeRunner(data) {
    let input = programm.slice(0)
    let i = 0;
    let inputIndex = 0;
    while (i < input.length) {
        let command = input[i].toString()
        const zerosToAdd = 5 - command.length
        command = '0'.repeat(zerosToAdd) + command
        // command = command.split('').reverse().join('') 
        let B = command[1]
        let C = command[2]
        let DE = parseInt(command.slice(3))
        let par1 = C == 0 ? input[input[i + 1]] : input[i + 1]
        let par2 = B == 0 ? input[input[i + 2]] : input[i + 2]
        if (DE === 1) {
            input[input[i + 3]] = par1 + par2
            i += 4
        }
        else if (DE === 2) {
            input[input[i + 3]] = par1 * par2
            i += 4
        } 
        else if (DE === 3) {
            input[input[i + 1]] = data[inputIndex]
            i +=2
            inputIndex++
        }
        else if (DE === 4) {
            yield par1
            i += 2
        }
        else if (DE === 5) {
            if (par1 !== 0) {
                i = par2
            } else {
                i += 3
            }
        }
        else if (DE === 6) {
            if (par1 === 0) {
                i = par2
            } else {
                i += 3
            }
        }
        else if (DE === 7) {
            if (par1 < par2) {
                input[input[i + 3]] = 1
            } else {
                input[input[i + 3]] = 0
            }
            i += 4
        }
        else if (DE === 8) {
            if (par1 === par2) {
                input[input[i + 3]] = 1
            } else {
                input[input[i + 3]] = 0
            }
            i += 4
        }
        else if (DE === 99) {
            throw new Error ('99 reached')
        }
        else {
            console.log(`error at ${i}`)
            break
        }
    }
}

let thursterInputs = []
let computers = []
let bestResult = 0
for (let i = 5; i < 10; i++) {
    //index for 0
    for (let j = 5; j < 10; j++) {
        if (j !== i) {
            //index for 1
        for (let k = 5; k < 10; k++) {
            if (k !== j && k!== i) {
                //index for 2
            for (let l = 5; l < 10; l++) {
                if (l !== k && l!== j && l!==i) {
                    //index for 3
                for (let m = 5; m < 10; m++) {
                    if (m !==l && m!==k && m!==j && m!==i) {
                    //index for 4
                    let input = [i, j, k, l, m]
                    thursterInputs = []
                    computers = []
                    console.log(input)
                    let output = 0;
                    for (let thruster = 0; thruster < input.length; thruster++) {
                        thursterInputs.push([input[thruster]])
                    //   output = intcodeRunner(programmCopy, data)
                    }
                    let thrusters = [intcodeRunner(thursterInputs[0]), intcodeRunner(thursterInputs[1]), 
                                    intcodeRunner(thursterInputs[2]), intcodeRunner(thursterInputs[3]), 
                                    intcodeRunner(thursterInputs[4])]

                    let thrusterIndex = 0 
                    thursterInputs[0].push(0)
                    try {
                        while(true) {
                            // console.log(thrusterIndex)
                            let thruster = thrusters[thrusterIndex] 
                            const out = thruster.next().value
                            // console.log(out)
                            output = out
                            thrusterIndex = (thrusterIndex + 1) % 5
                            thursterInputs[thrusterIndex].push(out)
                        }
                    }
                    catch(error) {
                        console.log(error)
                    }
                    if (output > bestResult) {
                        bestResult = output
                    } 
                }}
            }}
         } }
 } }
}

console.log(bestResult)