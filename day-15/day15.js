// --- Day 15: Oxygen System ---
// Out here in deep space, many things can go wrong. Fortunately, many of those things have indicator lights. Unfortunately, one of those lights is lit: the oxygen system for part of the ship has failed!

// According to the readouts, the oxygen system must have failed days ago after a rupture in oxygen tank two; that section of the ship was automatically sealed once oxygen levels went dangerously low. A single remotely-operated repair droid is your only option for fixing the oxygen system.

// The Elves' care package included an Intcode program (your puzzle input) that you can use to remotely control the repair droid. By running that program, you can direct the repair droid to the oxygen system and fix the problem.

// The remote control program executes the following steps in a loop forever:

// Accept a movement command via an input instruction.
// Send the movement command to the repair droid.
// Wait for the repair droid to finish the movement operation.
// Report on the status of the repair droid via an output instruction.
// Only four movement commands are understood: north (1), south (2), west (3), and east (4). Any other command is invalid. The movements differ in direction, but not in distance: in a long enough east-west hallway, a series of commands like 4,4,4,4,3,3,3,3 would leave the repair droid back where it started.

// The repair droid can reply with any of the following status codes:

// 0: The repair droid hit a wall. Its position has not changed.
// 1: The repair droid has moved one step in the requested direction.
// 2: The repair droid has moved one step in the requested direction; its new position is the location of the oxygen system.
// You don't know anything about the area around the repair droid, but you can figure it out by watching the status codes.

// For example, we can draw the area using D for the droid, # for walls, . for locations the droid can traverse, and empty space for unexplored locations. Then, the initial state looks like this:

      
      
//    D  
      
      
// To make the droid go north, send it 1. If it replies with 0, you know that location is a wall and that the droid didn't move:

      
//    #  
//    D  
      
      
// To move east, send 4; a reply of 1 means the movement was successful:

      
//    #  
//    .D 
      
      
// Then, perhaps attempts to move north (1), south (2), and east (4) are all met with replies of 0:

      
//    ## 
//    .D#
//     # 
      
// Now, you know the repair droid is in a dead end. Backtrack with 3 (which you already know will get a reply of 1 because you already know that location is open):

      
//    ## 
//    D.#
//     # 
      
// Then, perhaps west (3) gets a reply of 0, south (2) gets a reply of 1, south again (2) gets a reply of 0, and then west (3) gets a reply of 2:

      
//    ## 
//   #..#
//   D.# 
//    #  
// Now, because of the reply of 2, you know you've found the oxygen system! In this example, it was only 2 moves away from the repair droid's starting position.

// What is the fewest number of movement commands required to move the repair droid from its starting position to the location of the oxygen system?

// Your puzzle answer was 234.

// --- Part Two ---
// You quickly repair the oxygen system; oxygen gradually fills the area.

// Oxygen starts in the location containing the repaired oxygen system. It takes one minute for oxygen to spread to all open locations that are adjacent to a location that already contains oxygen. Diagonal locations are not adjacent.

// In the example above, suppose you've used the droid to explore the area fully and have the following map (where locations that currently contain oxygen are marked O):

//  ##   
// #..## 
// #.#..#
// #.O.# 
//  ###  
// Initially, the only location which contains oxygen is the location of the repaired oxygen system. However, after one minute, the oxygen spreads to all open (.) locations that are adjacent to a location containing oxygen:

//  ##   
// #..## 
// #.#..#
// #OOO# 
//  ###  
// After a total of two minutes, the map looks like this:

//  ##   
// #..## 
// #O#O.#
// #OOO# 
//  ###  
// After a total of three minutes:

//  ##   
// #O.## 
// #O#OO#
// #OOO# 
//  ###  
// And finally, the whole region is full of oxygen after a total of four minutes:

//  ##   
// #OO## 
// #O#OO#
// #OOO# 
//  ###  
// So, in this example, all locations contain oxygen after 4 minutes.

// Use the repair droid to get a complete map of the area. How many minutes will it take to fill with oxygen?

// Your puzzle answer was 292.

// Both parts of this puzzle are complete! They provide two gold stars: **



// const array = [3,1033,1008,1033,1,1032,1005,1032,31,1008,1033,2,1032,1005,1032,58,1008,1033,3,1032,1005,1032,81,1008,1033,4,1032,1005,1032,104,99,1002,1034,1,1039,1002,1036,1,1041,1001,1035,-1,1040,1008,1038,0,1043,102,-1,1043,1032,1,1037,1032,1042,1105,1,124,1001,1034,0,1039,1001,1036,0,1041,1001,1035,1,1040,1008,1038,0,1043,1,1037,1038,1042,1105,1,124,1001,1034,-1,1039,1008,1036,0,1041,1002,1035,1,1040,1001,1038,0,1043,1002,1037,1,1042,1105,1,124,1001,1034,1,1039,1008,1036,0,1041,1002,1035,1,1040,1001,1038,0,1043,101,0,1037,1042,1006,1039,217,1006,1040,217,1008,1039,40,1032,1005,1032,217,1008,1040,40,1032,1005,1032,217,1008,1039,3,1032,1006,1032,165,1008,1040,5,1032,1006,1032,165,1101,2,0,1044,1105,1,224,2,1041,1043,1032,1006,1032,179,1102,1,1,1044,1105,1,224,1,1041,1043,1032,1006,1032,217,1,1042,1043,1032,1001,1032,-1,1032,1002,1032,39,1032,1,1032,1039,1032,101,-1,1032,1032,101,252,1032,211,1007,0,55,1044,1106,0,224,1102,0,1,1044,1105,1,224,1006,1044,247,102,1,1039,1034,102,1,1040,1035,102,1,1041,1036,1002,1043,1,1038,101,0,1042,1037,4,1044,1106,0,0,5,20,51,81,57,10,21,4,5,12,94,86,11,35,82,29,14,52,78,53,41,88,58,48,50,16,2,36,58,7,93,31,1,99,43,9,47,67,54,39,78,89,3,17,63,95,70,84,41,59,32,80,35,7,91,36,80,66,28,78,20,26,68,69,59,14,90,22,31,86,16,67,67,45,77,29,61,44,44,77,52,81,54,66,15,43,95,13,22,79,80,37,90,65,58,11,14,80,82,42,84,47,71,14,94,78,24,71,25,6,11,71,47,86,20,97,37,18,92,57,15,98,44,78,91,44,83,59,4,12,87,3,12,14,86,70,19,31,72,29,12,22,23,73,61,91,40,66,68,66,16,73,59,41,83,8,7,48,61,54,95,2,25,61,13,17,76,85,96,16,79,84,39,96,49,24,67,88,88,88,66,46,52,54,71,47,63,84,4,33,7,63,84,27,6,26,76,70,29,49,93,31,63,64,26,16,40,60,30,60,10,85,85,62,32,4,98,39,20,1,85,98,48,29,24,74,30,92,90,37,49,29,95,12,98,49,57,36,43,96,99,17,18,95,26,80,20,29,50,73,69,51,50,9,46,78,38,72,88,39,3,92,96,50,88,14,98,93,7,62,15,97,15,33,21,96,15,74,76,38,12,63,77,80,29,91,96,23,18,75,52,96,78,94,88,49,65,43,82,58,46,27,62,2,32,81,45,67,83,80,62,54,40,85,66,48,54,72,87,3,7,86,84,2,45,46,82,84,17,36,29,94,12,47,59,89,28,93,40,50,77,83,48,66,18,15,70,13,68,26,86,46,18,63,6,97,21,76,75,80,1,30,67,38,74,8,9,65,90,68,11,66,60,12,4,96,94,60,36,25,78,13,67,70,35,76,53,11,72,40,70,59,9,11,88,27,44,61,11,54,98,69,35,93,93,9,85,2,78,21,99,96,27,81,40,9,99,42,66,77,10,95,7,31,90,44,89,90,24,24,48,75,69,36,5,94,89,17,81,52,92,15,52,76,65,35,22,17,58,40,18,2,77,72,49,73,36,35,62,24,64,12,70,1,11,24,82,20,53,80,97,49,70,6,95,12,62,58,12,49,77,80,24,49,86,97,95,45,71,90,60,38,94,23,37,85,1,77,26,57,81,30,58,67,39,60,10,3,82,21,41,71,38,49,65,19,4,93,57,2,74,12,96,12,22,7,50,87,76,51,33,1,90,66,12,85,79,28,18,66,35,21,89,51,83,14,32,63,12,71,40,63,4,95,7,72,65,20,45,79,16,75,85,58,16,74,17,53,88,64,75,29,21,24,51,85,51,97,44,49,67,59,90,29,7,8,98,22,52,94,65,31,83,64,29,43,95,11,68,88,18,35,80,78,39,96,22,94,10,31,93,9,71,43,64,80,67,17,63,50,49,75,14,76,31,89,21,73,30,3,69,97,60,27,24,22,66,27,68,89,69,12,49,91,48,54,60,5,84,69,18,67,1,63,51,28,23,97,4,62,21,13,45,99,33,69,99,5,95,32,54,45,72,99,65,8,54,1,91,27,50,91,65,13,91,16,90,48,12,58,66,86,15,78,68,50,94,7,71,84,87,38,39,16,27,70,61,5,95,92,85,54,72,8,95,81,78,5,92,77,50,74,86,1,31,69,94,1,37,57,32,3,7,92,82,68,90,42,22,71,25,71,71,91,37,93,52,57,18,57,23,83,39,72,25,58,6,69,46,83,19,82,48,70,28,89,98,62,48,69,81,78,24,82,47,82,40,97,10,93,0,0,21,21,1,10,1,0,0,0,0,0,0]

// function* intcodeRunner(data) {
//     let input = array.slice(0)
//     let i = 0;
//     let inputIndex = 0;
//     while (i < input.length) {
//         let command = input[i].toString()
//         const zerosToAdd = 5 - command.length
//         command = '0'.repeat(zerosToAdd) + command
//         // command = command.split('').reverse().join('') 
//         let B = command[1]
//         let C = command[2]
//         let DE = parseInt(command.slice(3))
//         let par1 = C == 0 ? input[input[i + 1]] : input[i + 1]
//         let par2 = B == 0 ? input[input[i + 2]] : input[i + 2]
//         if (DE === 1) {
//             input[input[i + 3]] = par1 + par2
//             i += 4
//         }
//         else if (DE === 2) {
//             input[input[i + 3]] = par1 * par2
//             i += 4
//         } 
//         else if (DE === 3) {
//             input[input[i + 1]] = data[inputIndex]
//             i +=2
//             inputIndex++
//         }
//         else if (DE === 4) {
//             yield par1
//             i += 2
//         }
//         else if (DE === 5) {
//             if (par1 !== 0) {
//                 i = par2
//             } else {
//                 i += 3
//             }
//         }
//         else if (DE === 6) {
//             if (par1 === 0) {
//                 i = par2
//             } else {
//                 i += 3
//             }
//         }
//         else if (DE === 7) {
//             if (par1 < par2) {
//                 input[input[i + 3]] = 1
//             } else {
//                 input[input[i + 3]] = 0
//             }
//             i += 4
//         }
//         else if (DE === 8) {
//             if (par1 === par2) {
//                 input[input[i + 3]] = 1
//             } else {
//                 input[input[i + 3]] = 0
//             }
//             i += 4
//         }
//         else if (DE === 99) {
//             throw new Error ('99 reached')
//         }
//         else {
//             console.log(`error at ${i}`)
//             break
//         }
//     }
// }


// const inputs = []
// let canvas = {}
// let currentPosition = '0,0'
// let previousPosition = undefined
// const directions = {
//     'north': 1,
//     'south': 2,
//     'west': 3,
//     'east': 4
// }
// const computer = intcodeRunner(inputs)
// let oxygenTank = false
// try {
//     while (oxygenTank !== true) {
//         let coordinates = currentPosition.split(',').map((char)=>parseInt(char))
//         let coordinateToExplore = null
//         canvas[currentPosition] = 'path'
//         //console.log(canvas)
//         const neighbours = {
//             'north': `${coordinates[0]},${coordinates[1] + 1}`,
//             'south': `${coordinates[0]},${coordinates[1] - 1}`,
//             'west': `${coordinates[0] - 1},${coordinates[1]}`,
//             'east': `${coordinates[0] + 1},${coordinates[1]}`
//         }
//         const wallsCoordinates = Object.values(neighbours).filter((coord) => canvas[coord] === 'wall')
//         if (!(neighbours.west in canvas)) {
//             coordinateToExplore = neighbours.west
//             inputs.push(directions.west)
//         } else if (!(neighbours.north in canvas)) {
//             coordinateToExplore = neighbours.north
//             inputs.push(directions.north)
//         }
//         else if (!(neighbours.east in canvas)) {
//             coordinateToExplore = neighbours.east
//             inputs.push(directions.east)
//         }
//         else if (!(neighbours.south in canvas)) {
//             coordinateToExplore = neighbours.south
//             inputs.push(directions.south)
//         } else if (wallsCoordinates.length === 3) { //dead end
//             canvas[currentPosition] = 'wall'
//             for (key in neighbours) {
//                 if (!wallsCoordinates.includes(neighbours[key])) {
//                     coordinateToExplore = neighbours[key]
//                     inputs.push(directions[key]) //backtrack
//                 }
//             }
//         } else { //everything explored but not dead end
//             //not sure if this situation is possible ...
//         }

//         const response = computer.next().value
//             //console.log('response',response)
//         if (response === 0) {
//             canvas[coordinateToExplore] = 'wall'
//         } else if (response === 1) {
//             previousPosition = currentPosition
//             currentPosition = coordinateToExplore
//             //console.log(position)
//         } else if (response === 2) {
//             oxygenTank = true
//             canvas[coordinateToExplore] = 'tank'
//         }
           
//     }
// } catch(err) {
//     console.log(err)
// }
// const pathLenght = Object.values(canvas).filter((value) => value === 'path').length
// const pathCoordinates = Object.keys(canvas).filter((coord) => canvas[coord] === 'path')
// //console.log(canvas, pathLenght)
// //console.log(pathCoordinates)

const array = [3,1033,1008,1033,1,1032,1005,1032,31,1008,1033,2,1032,1005,1032,58,1008,1033,3,1032,1005,1032,81,1008,1033,4,1032,1005,1032,104,99,1002,1034,1,1039,1002,1036,1,1041,1001,1035,-1,1040,1008,1038,0,1043,102,-1,1043,1032,1,1037,1032,1042,1105,1,124,1001,1034,0,1039,1001,1036,0,1041,1001,1035,1,1040,1008,1038,0,1043,1,1037,1038,1042,1105,1,124,1001,1034,-1,1039,1008,1036,0,1041,1002,1035,1,1040,1001,1038,0,1043,1002,1037,1,1042,1105,1,124,1001,1034,1,1039,1008,1036,0,1041,1002,1035,1,1040,1001,1038,0,1043,101,0,1037,1042,1006,1039,217,1006,1040,217,1008,1039,40,1032,1005,1032,217,1008,1040,40,1032,1005,1032,217,1008,1039,3,1032,1006,1032,165,1008,1040,5,1032,1006,1032,165,1101,2,0,1044,1105,1,224,2,1041,1043,1032,1006,1032,179,1102,1,1,1044,1105,1,224,1,1041,1043,1032,1006,1032,217,1,1042,1043,1032,1001,1032,-1,1032,1002,1032,39,1032,1,1032,1039,1032,101,-1,1032,1032,101,252,1032,211,1007,0,55,1044,1106,0,224,1102,0,1,1044,1105,1,224,1006,1044,247,102,1,1039,1034,102,1,1040,1035,102,1,1041,1036,1002,1043,1,1038,101,0,1042,1037,4,1044,1106,0,0,5,20,51,81,57,10,21,4,5,12,94,86,11,35,82,29,14,52,78,53,41,88,58,48,50,16,2,36,58,7,93,31,1,99,43,9,47,67,54,39,78,89,3,17,63,95,70,84,41,59,32,80,35,7,91,36,80,66,28,78,20,26,68,69,59,14,90,22,31,86,16,67,67,45,77,29,61,44,44,77,52,81,54,66,15,43,95,13,22,79,80,37,90,65,58,11,14,80,82,42,84,47,71,14,94,78,24,71,25,6,11,71,47,86,20,97,37,18,92,57,15,98,44,78,91,44,83,59,4,12,87,3,12,14,86,70,19,31,72,29,12,22,23,73,61,91,40,66,68,66,16,73,59,41,83,8,7,48,61,54,95,2,25,61,13,17,76,85,96,16,79,84,39,96,49,24,67,88,88,88,66,46,52,54,71,47,63,84,4,33,7,63,84,27,6,26,76,70,29,49,93,31,63,64,26,16,40,60,30,60,10,85,85,62,32,4,98,39,20,1,85,98,48,29,24,74,30,92,90,37,49,29,95,12,98,49,57,36,43,96,99,17,18,95,26,80,20,29,50,73,69,51,50,9,46,78,38,72,88,39,3,92,96,50,88,14,98,93,7,62,15,97,15,33,21,96,15,74,76,38,12,63,77,80,29,91,96,23,18,75,52,96,78,94,88,49,65,43,82,58,46,27,62,2,32,81,45,67,83,80,62,54,40,85,66,48,54,72,87,3,7,86,84,2,45,46,82,84,17,36,29,94,12,47,59,89,28,93,40,50,77,83,48,66,18,15,70,13,68,26,86,46,18,63,6,97,21,76,75,80,1,30,67,38,74,8,9,65,90,68,11,66,60,12,4,96,94,60,36,25,78,13,67,70,35,76,53,11,72,40,70,59,9,11,88,27,44,61,11,54,98,69,35,93,93,9,85,2,78,21,99,96,27,81,40,9,99,42,66,77,10,95,7,31,90,44,89,90,24,24,48,75,69,36,5,94,89,17,81,52,92,15,52,76,65,35,22,17,58,40,18,2,77,72,49,73,36,35,62,24,64,12,70,1,11,24,82,20,53,80,97,49,70,6,95,12,62,58,12,49,77,80,24,49,86,97,95,45,71,90,60,38,94,23,37,85,1,77,26,57,81,30,58,67,39,60,10,3,82,21,41,71,38,49,65,19,4,93,57,2,74,12,96,12,22,7,50,87,76,51,33,1,90,66,12,85,79,28,18,66,35,21,89,51,83,14,32,63,12,71,40,63,4,95,7,72,65,20,45,79,16,75,85,58,16,74,17,53,88,64,75,29,21,24,51,85,51,97,44,49,67,59,90,29,7,8,98,22,52,94,65,31,83,64,29,43,95,11,68,88,18,35,80,78,39,96,22,94,10,31,93,9,71,43,64,80,67,17,63,50,49,75,14,76,31,89,21,73,30,3,69,97,60,27,24,22,66,27,68,89,69,12,49,91,48,54,60,5,84,69,18,67,1,63,51,28,23,97,4,62,21,13,45,99,33,69,99,5,95,32,54,45,72,99,65,8,54,1,91,27,50,91,65,13,91,16,90,48,12,58,66,86,15,78,68,50,94,7,71,84,87,38,39,16,27,70,61,5,95,92,85,54,72,8,95,81,78,5,92,77,50,74,86,1,31,69,94,1,37,57,32,3,7,92,82,68,90,42,22,71,25,71,71,91,37,93,52,57,18,57,23,83,39,72,25,58,6,69,46,83,19,82,48,70,28,89,98,62,48,69,81,78,24,82,47,82,40,97,10,93,0,0,21,21,1,10,1,0,0,0,0,0,0]

function* intcodeRunner(data) {
    let input = array.slice(0)
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


const inputs = []
let canvas = {}
let currentPosition = '0,0'
let previousPosition = undefined
const directions = {
    'north': 1,
    'south': 2,
    'west': 3,
    'east': 4
}
const computer = intcodeRunner(inputs)
let oxygenTank = undefined
try {
    while (Object.keys(canvas).length < 1700) {
        let coordinates = currentPosition.split(',').map((char)=>parseInt(char))
        let coordinateToExplore = null
        canvas[currentPosition] = 'path'
        //console.log(canvas)
        const neighbours = {
            'north': `${coordinates[0]},${coordinates[1] + 1}`,
            'south': `${coordinates[0]},${coordinates[1] - 1}`,
            'west': `${coordinates[0] - 1},${coordinates[1]}`,
            'east': `${coordinates[0] + 1},${coordinates[1]}`
        }
        //console.log(Object.values(neighbours).map((coord) => canvas[coord]))
        const wallsCoordinates = Object.values(neighbours).filter((coord) => canvas[coord] === 'wall')
        const deads = Object.values(neighbours).filter((coord) => canvas[coord] === 'dead')
        if (!(neighbours.west in canvas)) {
            coordinateToExplore = neighbours.west
            inputs.push(directions.west)
        } else if (!(neighbours.north in canvas)) {
            coordinateToExplore = neighbours.north
            inputs.push(directions.north)
        }
        else if (!(neighbours.east in canvas)) {
            coordinateToExplore = neighbours.east
            inputs.push(directions.east)
        }
        else if (!(neighbours.south in canvas)) {
            coordinateToExplore = neighbours.south
            inputs.push(directions.south)
        } 
        else if (wallsCoordinates.length === 3) { //dead end
            canvas[currentPosition] = 'dead'
            for (let key in neighbours) {
                if (!wallsCoordinates.includes(neighbours[key])) {
                    coordinateToExplore = neighbours[key]
                    inputs.push(directions[key]) //backtrack
                }
            }
        } else if (wallsCoordinates.length === 2 && deads.length === 1) { //two  walls and dead
            canvas[currentPosition] = 'dead'
            for (let key in neighbours) {
                if (!wallsCoordinates.includes(neighbours[key]) && !deads.includes(neighbours[key])) {
                    coordinateToExplore = neighbours[key]
                    inputs.push(directions[key]) //backtrack
                }
            }
        }
        else if (wallsCoordinates.length === 1 && deads.length === 2) { //two  walls and dead
            canvas[currentPosition] = 'dead'
            for (let key in neighbours) {
                if (!wallsCoordinates.includes(neighbours[key]) && !deads.includes(neighbours[key])) {
                    coordinateToExplore = neighbours[key]
                    inputs.push(directions[key]) //backtrack
                }
            }
        }
        else if (deads.length === 3) { //two  walls and dead
            canvas[currentPosition] = 'dead'
            for (let key in neighbours) {
                if (!deads.includes(neighbours[key])) {
                    coordinateToExplore = neighbours[key]
                    inputs.push(directions[key]) //backtrack
                }
            }
        }
        else if (canvas[neighbours.west] === 'path') {
            coordinateToExplore = neighbours.west
            inputs.push(directions.west)
        } else if (canvas[neighbours.north] === 'path') {
            coordinateToExplore = neighbours.north
            inputs.push(directions.north)
        }
        else if (canvas[neighbours.east] === 'path') {
            coordinateToExplore = neighbours.east
            inputs.push(directions.east)
        }
        else if (canvas[neighbours.south] === 'path') {
            coordinateToExplore = neighbours.south
            inputs.push(directions.south)
        }

        const response = computer.next().value
            //console.log('response',response)
        if (response === 0) {
            canvas[coordinateToExplore] = 'wall'
        } else if (response === 1 || response === 2) {
            previousPosition = currentPosition
            currentPosition = coordinateToExplore
            if (response === 2) {
                oxygenTank = currentPosition
            }
        }   
    }
} catch(err) {
    console.log(err)
}
const pathLenght = Object.values(canvas).filter((value) => value === 'path').length
const coridorCoordinates = Object.keys(canvas).filter((coord) => canvas[coord] === 'path' || canvas[coord] === 'dead')
//console.log(canvas, pathLenght)
//console.log(Object.keys(canvas).length)

const graphObject = {}
for (let i = 0; i <coridorCoordinates.length; i++) {
    const node = coridorCoordinates[i]
    const coordinates = coridorCoordinates[i].split(',').map((char)=>parseInt(char))
    let neighbours = [
        `${coordinates[0]},${coordinates[1] + 1}`,
        `${coordinates[0]},${coordinates[1] - 1}`,
        `${coordinates[0] - 1},${coordinates[1]}`,
        `${coordinates[0] + 1},${coordinates[1]}`
    ]
    neighbours = neighbours.filter((coord) => coridorCoordinates.includes(coord))
    if (!(node in graphObject)) {
        graphObject[node] = neighbours
    } else if (node in graphObject) {
        graphObject[node].concat(neighbours.filter((c)=>!graphObject[node].includes(c)))
    }
    neighbours.map((neighbour) => {
        if (!graphObject[neighbour]) {
            graphObject[neighbour] = [node]
        } else if (graphObject[neighbour] && !graphObject[neighbour].includes(node)) {
            graphObject[neighbour].push(node)
        }
    })
}
//console.log(graphObject)


function Queue(){
    let queue = [];
    let offset = 0;
    this.enqueu = function enqueu(item) {
        queue.push(item);
    }
    this.dequeu = function dequeu() {
        if (queue.length === 0) {
            return undefined;
        }
        const item = queue[offset];
        offset++;
        if (offset * 2 >= queue.length) {
            queue = queue.slice(offset);
            offset = 0;
        }
        return item;
    }
    this.getLength = function getLength() {
        return queue.length - offset;
    }
}

function breadthFirstSearch(graph, startVertex) {
    let queue = new Queue();
    let level = {};
    queue.enqueu(startVertex);
    graph[startVertex].push('explored');
    level[startVertex] = 0;
    while (queue.getLength() > 0) {
        let vertex = queue.dequeu(); //all dequed verteces are already marked as explored
        // console.log('vertex',vertex);
        let currentVertex = graph[vertex];
        // console.log('curr vert: ', vertex, currentVertex)
        for (let i = 0; i < currentVertex.length - 1; i++) { //-1 is required to exclude last element from iteration as it is explored marker
            let vertexToExplore = graph[currentVertex[i]];
            // console.log('vertexToExplore ', currentVertex[i], vertexToExplore)
            if (vertexToExplore[vertexToExplore.length - 1] !== 'explored') {
                queue.enqueu(currentVertex[i]);
                vertexToExplore.push('explored');
                level[currentVertex[i]] = level[vertex] + 1;
                // console.log('level ',level)
            }
        }
    }
    return {
        graph: graph,
        level: level
    }
}

let graphCopy = JSON.parse(JSON.stringify(graphObject));
let graphSearch = breadthFirstSearch(graphCopy, oxygenTank);
console.log(Object.values(graphSearch.level).sort((a,b)=>b-a)[0]);






