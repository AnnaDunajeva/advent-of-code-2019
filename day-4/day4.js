// You arrive at the Venus fuel depot only to discover it's protected by a password. The Elves had written the password on a sticky note, but someone threw it out.

// However, they do remember a few key facts about the password:

// It is a six-digit number.
// The value is within the range given in your puzzle input.
// Two adjacent digits are the same (like 22 in 122345).
// Going from left to right, the digits never decrease; they only ever increase or stay the same (like 111123 or 135679).
// Other than the range rule, the following are true:

// 111111 meets these criteria (double 11, never decreases).
// 223450 does not meet these criteria (decreasing pair of digits 50).
// 123789 does not meet these criteria (no double).
// How many different passwords within the range given in your puzzle input meet these criteria?

// Your puzzle input is 235741-706948.

 const double = (num) => {
    let value = 0;
    let count = 0;
    for (let charI = 0; charI < num.length - 1; charI++) {
        if (num[charI] === num[charI + 1]) {
            count = 0
            value = num[charI]
            for (let i = 0; i < num.length; i++) {
                if (value === num[i]) {
                    count++
                }
            }
            if (count === 2) {
                return true
            }
        } 
    }
    return false
 }
const increasing = (num) => {
    for (let charI = 0; charI < num.length - 1; charI++) {
        if (num[charI] <= num[charI + 1]) {
           continue
        } 
        return false  
    }
    return true
}

// const countDounble = (num) => {
//     let count = 1
//     let counts = []
//     for (let charI = 0; charI < num.length - 1; charI++) {
//         // console.log(num[charI], num[charI+1])
//         if (num[charI] === num[charI + 1]) {
//             count++
//         } else {
//             counts.push(count)
//             count = 1
//         }
//     }
//     counts.push(count)
//     // for (let i = 0; i < counts.length; i++) {
//     //     if (counts[i] !== 1) {
//     //         if (counts[i] % 2 === 0) {
//     //             continue
//     //         } 
//     //         return false
//     //     }
//     // }
//     // console.log(counts)

//     return true
    
// }

let count = 0;
let nums = []
for (let num = 235741; num < 706948; num++) {
    num = num.toString()
    if (double(num)) {
        if (increasing(num)) {
            count ++
            nums.push(num)  
        }
    }
}

console.log(count, nums.slice(100))