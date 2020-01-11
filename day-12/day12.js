const mathjs = require('mathjs')
const inputInitial = [[3,-6,6], [10, 7, -9], [-3, -7, 9], [-8,0,4]]
const velocityInitial = [[0,0,0], [0,0,0],[0,0,0],[0,0,0]]
// const inputInitial = [[-1,0,2], [2, -10,-7],[4,-8,8],[3,5,-1]]
//const inputInitial = [[-8,-10,0],[5,5,10],[2,-7,3],[9,-8,-3]]

const applyGravityAndVelocity = (arrayOfInput, arrayOfVelocityvelocity) => {
    let input = arrayOfInput.slice(0).map((position) => position.slice(0))
    let velocity = arrayOfVelocityvelocity.slice(0).map((position) => position.slice(0))
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input.length; j++) {
            if (j > i) {
                for (let k = 0; k < 3; k++) {
                    // console.log(input[i][k], input[j][k])
                    if (input[i][k] < input[j][k]) {
                        velocity[i][k] += 1
                        velocity[j][k] -= 1
                        // console.log('bigger',velocity[i][k],  velocity[j][k])
                    } else if (input[i][k] > input[j][k]) {
                        velocity[i][k] -= 1
                        velocity[j][k] += 1
                        // console.log('smaller',velocity[i][k],  velocity[j][k])
                    } 
                }
            }
        }
    }
    for (let i = 0; i < input.length; i++) {
        for ( let j = 0; j < 3; j++) {
            input[i][j] += velocity[i][j]
        }
    }
    return {input, velocity}
}

// let res = applyGravityAndVelocity(inputInitial, velocityInitial)
// // console.log(res)
// let i = 999
// while (i > 0) {
//     res = applyGravityAndVelocity(res.input,res.velocity)
//     // console.log(res)
//     i--
// }
// console.log(res)

// const potential = [0,0,0,0]
// const kinetic = [0,0,0,0]
// for (let i = 0; i < 4; i++) {
//     for (let j = 0; j < 3; j++) {
//         potential[i] += Math.abs(res.input[i][j])
//         kinetic[i] += Math.abs(res.velocity[i][j])
//     }
// }
// const total = [0,0,0,0]
// for (let i = 0; i < 4; i++) {
//     total[i] = potential[i]*kinetic[i]
// }
// let result = 0
// for (let i = 0; i < 4; i++) {
//     result += total[i]
// }
// console.log(result)

// let res = applyGravityAndVelocity(inputInitial, velocityInitial)
// let count = 0
// while (!(res.velocity[0][0] === 0 && res.velocity[1][0]  === 0 && res.velocity[2][0] === 0 && res.velocity[3][0]===0)) {
//     res = applyGravityAndVelocity(res.input,res.velocity)
//     count++
//     if (count % 100000 === 0) {
//         console.log(count)
//     }    
// }
// console.log(count, res)

let velocities = []
for (let i = 0; i < 3; i++) {
    let res = applyGravityAndVelocity(inputInitial, velocityInitial)
    let count = 1
    while (!(res.velocity[0][i] === 0 && res.velocity[1][i]  === 0 && res.velocity[2][i] === 0 && res.velocity[3][i]===0)) {
        res = applyGravityAndVelocity(res.input,res.velocity)
        count++
        // if (count % 100000 === 0) {
        //     console.log(count)
        // }    
    }
    velocities.push(count)
}
// for (let i = 0; i < 3; i++) {
//     let res = applyGravityAndVelocity(inputInitial, velocityInitial)
//     let count = 0
//     while (!(res.input[0][i] === inputInitial[0][i] && res.input[1][i]  === inputInitial[1][i] && res.input[2][i] === inputInitial[2][i] && res.input[3][i]===inputInitial[3][i])) {
//         res = applyGravityAndVelocity(res.input,res.velocity)
//         count++
//         // if (count % 100000 === 0) {
//         //     console.log(count)
//         // }    
//     }
//     velocities.push(count)
// }
console.log(velocities)
console.log(mathjs.lcm(134148, 11479, 115807)*2)