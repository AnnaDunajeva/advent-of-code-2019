// ABCDE
//  1002

// DE - two-digit opcode,      02 == opcode 2
//  C - mode of 1st parameter,  0 == position mode
//  B - mode of 2nd parameter,  1 == immediate mode
//  A - mode of 3rd parameter,  0 == position mode, omitted due to being a leading zero

// --- Day 9: Sensor Boost ---
// You've just said goodbye to the rebooted rover and left Mars when you receive a faint distress signal coming from the asteroid belt. It must be the Ceres monitoring station!

// In order to lock on to the signal, you'll need to boost your sensors. The Elves send up the latest BOOST program - Basic Operation Of System Test.

// While BOOST (your puzzle input) is capable of boosting your sensors, for tenuous safety reasons, it refuses to do so until the computer it runs on passes some checks to demonstrate it is a complete Intcode computer.

// Your existing Intcode computer is missing one key feature: it needs support for parameters in relative mode.

// Parameters in mode 2, relative mode, behave very similarly to parameters in position mode: the parameter is interpreted as a position. Like position mode, parameters in relative mode can be read from or written to.

// The important difference is that relative mode parameters don't count from address 0. Instead, they count from a value called the relative base. The relative base starts at 0.

// The address a relative mode parameter refers to is itself plus the current relative base. When the relative base is 0, relative mode parameters and position mode parameters with the same value refer to the same address.

// For example, given a relative base of 50, a relative mode parameter of -7 refers to memory address 50 + -7 = 43.

// The relative base is modified with the relative base offset instruction:

// Opcode 9 adjusts the relative base by the value of its only parameter. The relative base increases (or decreases, if the value is negative) by the value of the parameter.
// For example, if the relative base is 2000, then after the instruction 109,19, the relative base would be 2019. If the next instruction were 204,-34, then the value at address 1985 would be output.

// Your Intcode computer will also need a few other capabilities:

// The computer's available memory should be much larger than the initial program. Memory beyond the initial program starts with the value 0 and can be read or written like any other memory. (It is invalid to try to access memory at a negative address, though.)
// The computer should have support for large numbers. Some instructions near the beginning of the BOOST program will verify this capability.
// Here are some example programs that use these features:

// 109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99 takes no input and produces a copy of itself as output.
// 1102,34915192,34915192,7,4,7,99,0 should output a 16-digit number.
// 104,1125899906842624,99 should output the large number in the middle.
// The BOOST program will ask for a single input; run it in test mode by providing it the value 1. It will perform a series of checks on each opcode, output any opcodes (and the associated parameter modes) that seem to be functioning incorrectly, and finally output a BOOST keycode.

// Once your Intcode computer is fully functional, the BOOST program should report no malfunctioning opcodes when run in test mode; it should only output a single value, the BOOST keycode. What BOOST keycode does it produce?

// Your puzzle answer was 3063082071.

// --- Part Two ---
// You now have a complete Intcode computer.

// Finally, you can lock on to the Ceres distress signal! You just need to boost your sensors using the BOOST program.

// The program runs in sensor boost mode by providing the input instruction the value 2. Once run, it will boost the sensors automatically, but it might take a few seconds to complete the operation on slower hardware. In sensor boost mode, the program will output a single value: the coordinates of the distress signal.

// Run the BOOST program in sensor boost mode. What are the coordinates of the distress signal?

// Your puzzle answer was 81348.

let array = [1102,34463338,34463338,63,1007,63,34463338,63,1005,63,53,1101,0,3,1000,109,988,209,12,9,1000,209,6,209,3,203,0,1008,1000,1,63,1005,63,65,1008,1000,2,63,1005,63,904,1008,1000,0,63,1005,63,58,4,25,104,0,99,4,0,104,0,99,4,17,104,0,99,0,0,1102,1,432,1027,1101,439,0,1026,1101,0,36,1010,1101,0,34,1018,1102,278,1,1029,1101,0,24,1002,1102,1,20,1016,1102,1,31,1011,1102,319,1,1024,1102,21,1,1012,1102,1,763,1022,1102,1,25,1007,1101,0,287,1028,1102,32,1,1008,1101,0,22,1013,1102,38,1,1001,1101,0,314,1025,1102,35,1,1009,1102,1,23,1015,1102,39,1,1019,1102,27,1,1000,1102,1,37,1003,1102,1,28,1017,1101,0,0,1020,1101,0,29,1004,1102,1,30,1006,1102,1,756,1023,1102,1,33,1005,1101,0,1,1021,1102,26,1,1014,109,13,2108,28,-7,63,1005,63,201,1001,64,1,64,1105,1,203,4,187,1002,64,2,64,109,8,21107,40,41,-3,1005,1018,225,4,209,1001,64,1,64,1105,1,225,1002,64,2,64,109,-3,1206,2,239,4,231,1105,1,243,1001,64,1,64,1002,64,2,64,109,-21,1201,6,0,63,1008,63,35,63,1005,63,267,1001,64,1,64,1105,1,269,4,249,1002,64,2,64,109,35,2106,0,-4,4,275,1001,64,1,64,1105,1,287,1002,64,2,64,109,-11,1205,-1,303,1001,64,1,64,1105,1,305,4,293,1002,64,2,64,109,8,2105,1,-5,4,311,1106,0,323,1001,64,1,64,1002,64,2,64,109,-7,21108,41,38,-6,1005,1016,339,1106,0,345,4,329,1001,64,1,64,1002,64,2,64,109,2,21102,42,1,-8,1008,1016,45,63,1005,63,369,1001,64,1,64,1105,1,371,4,351,1002,64,2,64,109,-14,21101,43,0,1,1008,1011,43,63,1005,63,397,4,377,1001,64,1,64,1106,0,397,1002,64,2,64,109,-8,21101,44,0,8,1008,1010,47,63,1005,63,417,1105,1,423,4,403,1001,64,1,64,1002,64,2,64,109,25,2106,0,0,1001,64,1,64,1105,1,441,4,429,1002,64,2,64,109,-20,2107,37,-6,63,1005,63,463,4,447,1001,64,1,64,1106,0,463,1002,64,2,64,109,8,2108,25,-8,63,1005,63,485,4,469,1001,64,1,64,1106,0,485,1002,64,2,64,109,-1,21107,45,44,-1,1005,1013,505,1001,64,1,64,1106,0,507,4,491,1002,64,2,64,109,-11,1207,-1,25,63,1005,63,529,4,513,1001,64,1,64,1106,0,529,1002,64,2,64,109,23,1206,-5,545,1001,64,1,64,1106,0,547,4,535,1002,64,2,64,109,-31,2102,1,5,63,1008,63,27,63,1005,63,569,4,553,1106,0,573,1001,64,1,64,1002,64,2,64,109,27,21102,46,1,-9,1008,1013,46,63,1005,63,595,4,579,1105,1,599,1001,64,1,64,1002,64,2,64,109,-26,2101,0,6,63,1008,63,24,63,1005,63,625,4,605,1001,64,1,64,1106,0,625,1002,64,2,64,109,5,1208,0,37,63,1005,63,645,1001,64,1,64,1105,1,647,4,631,1002,64,2,64,109,7,2102,1,-3,63,1008,63,31,63,1005,63,671,1001,64,1,64,1105,1,673,4,653,1002,64,2,64,109,2,1202,-5,1,63,1008,63,33,63,1005,63,699,4,679,1001,64,1,64,1105,1,699,1002,64,2,64,109,-4,2101,0,-3,63,1008,63,35,63,1005,63,719,1105,1,725,4,705,1001,64,1,64,1002,64,2,64,109,-5,1207,4,32,63,1005,63,741,1106,0,747,4,731,1001,64,1,64,1002,64,2,64,109,29,2105,1,-7,1001,64,1,64,1106,0,765,4,753,1002,64,2,64,109,-26,2107,36,5,63,1005,63,781,1105,1,787,4,771,1001,64,1,64,1002,64,2,64,109,10,1201,-6,0,63,1008,63,32,63,1005,63,809,4,793,1106,0,813,1001,64,1,64,1002,64,2,64,109,3,21108,47,47,-5,1005,1012,835,4,819,1001,64,1,64,1106,0,835,1002,64,2,64,109,-24,1202,9,1,63,1008,63,25,63,1005,63,859,1001,64,1,64,1106,0,861,4,841,1002,64,2,64,109,19,1205,9,875,4,867,1106,0,879,1001,64,1,64,1002,64,2,64,109,-3,1208,-1,32,63,1005,63,897,4,885,1106,0,901,1001,64,1,64,4,64,99,21102,27,1,1,21101,915,0,0,1105,1,922,21201,1,60043,1,204,1,99,109,3,1207,-2,3,63,1005,63,964,21201,-2,-1,1,21102,1,942,0,1106,0,922,21202,1,1,-1,21201,-2,-3,1,21101,957,0,0,1106,0,922,22201,1,-1,-2,1105,1,968,22102,1,-2,-2,109,-3,2105,1,0]
//let array = [109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99] - does output copy of itself as it should, but then infinite loop for some reason...

function intcodeRunner(data) {
    let input = array.slice(0)
    let i = 0;
    let inputIndex = 0;
    let relativeBase = 0;
    while (i < input.length) {
        // console.log('i', i)
        // console.log(input)
        let command = input[i].toString()
        const zerosToAdd = 5 - command.length
        command = '0'.repeat(zerosToAdd) + command
        // command = command.split('').reverse().join('') 
        let A = command[0]
        let B = command[1]
        let C = command[2]
        let DE = parseInt(command.slice(3))
        let par1 = C == 0 ? input[i + 1] : C == 1 ? i + 1 : relativeBase + input[i + 1]
        let par2 = B == 0 ? input[i + 2] : B == 1 ? i + 2 : relativeBase + input[i + 2]
        let par3 = A == 0 ? input[i + 3] : A == 1 ? i + 3 : relativeBase + input[i + 3]
        if (DE === 1) {
            input[par3] = input[par1] + input[par2]
            i += 4
        }
        else if (DE === 2) {
            input[par3] = input[par1] * input[par2]
            i += 4
        } 
        else if (DE === 3) {
            input[par1] = data[inputIndex]
            i +=2
            inputIndex++
        }
        else if (DE === 4) {
            console.log('output',input[par1])
            i += 2
        }
        else if (DE === 5) {
            if (input[par1] !== 0) {
                i = input[par2]
            } else {
                i += 3
            }
        }
        else if (DE === 6) {
            if (input[par1] === 0) {
                i = input[par2]
            } else {
                i += 3
            }
        }
        else if (DE === 7) {
            if (input[par1] < input[par2]) {
                input[par3] = 1
            } else {
                input[par3] = 0
            }
            i += 4
        }
        else if (DE === 8) {
            if (input[par1] === input[par2]) {
                input[par3] = 1
            } else {
                input[par3] = 0
            }
            i += 4
        }
        else if (DE === 9) {
            relativeBase = input[par1] + relativeBase
            i += 2
            // console.log(relativeBase)
        }
        else if (DE === 99) {
            console.log('99 reached')
            break
        }
        else {
            console.log(`error at ${i}`)
            break
        }
    }
}
intcodeRunner([2])

