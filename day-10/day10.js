// --- Day 10: Monitoring Station ---
// You fly into the asteroid belt and reach the Ceres monitoring station. The Elves here have an emergency: they're having trouble tracking all of the asteroids and can't be sure they're safe.

// The Elves would like to build a new monitoring station in a nearby area of space; they hand you a map of all of the asteroids in that region (your puzzle input).

// The map indicates whether each position is empty (.) or contains an asteroid (#). The asteroids are much smaller than they appear on the map, and every asteroid is exactly in the center of its marked position. The asteroids can be described with X,Y coordinates where X is the distance from the left edge and Y is the distance from the top edge (so the top-left corner is 0,0 and the position immediately to its right is 1,0).

// Your job is to figure out which asteroid would be the best place to build a new monitoring station. A monitoring station can detect any asteroid to which it has direct line of sight - that is, there cannot be another asteroid exactly between them. This line of sight can be at any angle, not just lines aligned to the grid or diagonally. The best location is the asteroid that can detect the largest number of other asteroids.

// For example, consider the following map:

// .#..#
// .....
// #####
// ....#
// ...##
// The best location for a new monitoring station on this map is the highlighted asteroid at 3,4 because it can detect 8 asteroids, more than any other location. (The only asteroid it cannot detect is the one at 1,0; its view of this asteroid is blocked by the asteroid at 2,2.) All other asteroids are worse locations; they can detect 7 or fewer other asteroids. Here is the number of other asteroids a monitoring station on each asteroid could detect:

// .7..7
// .....
// 67775
// ....7
// ...87
// Here is an asteroid (#) and some examples of the ways its line of sight might be blocked. If there were another asteroid at the location of a capital letter, the locations marked with the corresponding lowercase letter would be blocked and could not be detected:

// #.........
// ...A......
// ...B..a...
// .EDCG....a
// ..F.c.b...
// .....c....
// ..efd.c.gb
// .......c..
// ....f...c.
// ...e..d..c
// Here are some larger examples:

// Best is 5,8 with 33 other asteroids detected:

// ......#.#.
// #..#.#....
// ..#######.
// .#.#.###..
// .#..#.....
// ..#....#.#
// #..#....#.
// .##.#..###
// ##...#..#.
// .#....####
// Best is 1,2 with 35 other asteroids detected:

// #.#...#.#.
// .###....#.
// .#....#...
// ##.#.#.#.#
// ....#.#.#.
// .##..###.#
// ..#...##..
// ..##....##
// ......#...
// .####.###.
// Best is 6,3 with 41 other asteroids detected:

// .#..#..###
// ####.###.#
// ....###.#.
// ..###.##.#
// ##.##.#.#.
// ....###..#
// ..#.#..#.#
// #..#.#.###
// .##...##.#
// .....#.#..
// Best is 11,13 with 210 other asteroids detected:

// .#..##.###...#######
// ##.############..##.
// .#.######.########.#
// .###.#######.####.#.
// #####.##.#.##.###.##
// ..#####..#.#########
// ####################
// #.####....###.#.#.##
// ##.#################
// #####.##.###..####..
// ..######..##.#######
// ####.##.####...##..#
// .#####..#.######.###
// ##...#.##########...
// #.##########.#######
// .####.#.###.###.#.##
// ....##.##.###..#####
// .#.#.###########.###
// #.#.#.#####.####.###
// ###.##.####.##.#..##
// Find the best location for a new monitoring station. How many other asteroids can be detected from that location?

// Your puzzle answer was 267.

// --- Part Two ---
// Once you give them the coordinates, the Elves quickly deploy an Instant Monitoring Station to the location and discover the worst: there are simply too many asteroids.

// The only solution is complete vaporization by giant laser.

// Fortunately, in addition to an asteroid scanner, the new monitoring station also comes equipped with a giant rotating laser perfect for vaporizing asteroids. The laser starts by pointing up and always rotates clockwise, vaporizing any asteroid it hits.

// If multiple asteroids are exactly in line with the station, the laser only has enough power to vaporize one of them before continuing its rotation. In other words, the same asteroids that can be detected can be vaporized, but if vaporizing one asteroid makes another one detectable, the newly-detected asteroid won't be vaporized until the laser has returned to the same position by rotating a full 360 degrees.

// For example, consider the following map, where the asteroid with the new monitoring station (and laser) is marked X:

// .#....#####...#..
// ##...##.#####..##
// ##...#...#.#####.
// ..#.....X...###..
// ..#.#.....#....##
// The first nine asteroids to get vaporized, in order, would be:

// .#....###24...#..
// ##...##.13#67..9#
// ##...#...5.8####.
// ..#.....X...###..
// ..#.#.....#....##
// Note that some asteroids (the ones behind the asteroids marked 1, 5, and 7) won't have a chance to be vaporized until the next full rotation. The laser continues rotating; the next nine to be vaporized are:

// .#....###.....#..
// ##...##...#.....#
// ##...#......1234.
// ..#.....X...5##..
// ..#.9.....8....76
// The next nine to be vaporized are then:

// .8....###.....#..
// 56...9#...#.....#
// 34...7...........
// ..2.....X....##..
// ..1..............
// Finally, the laser completes its first full rotation (1 through 3), a second rotation (4 through 8), and vaporizes the last asteroid (9) partway through its third rotation:

// ......234.....6..
// ......1...5.....7
// .................
// ........X....89..
// .................
// In the large example above (the one with the best monitoring station location at 11,13):

// The 1st asteroid to be vaporized is at 11,12.
// The 2nd asteroid to be vaporized is at 12,1.
// The 3rd asteroid to be vaporized is at 12,2.
// The 10th asteroid to be vaporized is at 12,8.
// The 20th asteroid to be vaporized is at 16,0.
// The 50th asteroid to be vaporized is at 16,9.
// The 100th asteroid to be vaporized is at 10,16.
// The 199th asteroid to be vaporized is at 9,6.
// The 200th asteroid to be vaporized is at 8,2.
// The 201st asteroid to be vaporized is at 10,9.
// The 299th and final asteroid to be vaporized is at 11,1.
// The Elves are placing bets on which will be the 200th asteroid to be vaporized. Win the bet by determining which asteroid that will be; what do you get if you multiply its X coordinate by 100 and then add its Y coordinate? (For example, 8,2 becomes 802.)

const fs = require('fs');
const data = fs.readFileSync('input.txt', 'utf8');
let array = data.split(/\r\n|\n/);
array.pop()//removes some weird empty string, dont know where does it came from..

// const array = [
//     '.#..##.###...#######',
//     '##.############..##.',
//     '.#.######.########.#',
//     '.###.#######.####.#.',
//     '#####.##.#.##.###.##',
//     '..#####..#.#########',
//     '####################',
//     '#.####....###.#.#.##',
//     '##.#################',
//     '#####.##.###..####..',
//     '..######..##.#######',
//     '####.##.####...##..#',
//     '.#####..#.######.###',
//     '##...#.##########...',
//     '#.##########.#######',
//     '.####.#.###.###.#.##',
//     '....##.##.###..#####',
//     '.#.#.###########.###',
//     '#.#.#.#####.####.###',
//     '###.##.####.##.#..##']

const coordinates = []
for (let row = 0; row < array.length; row++) {
    for (let x = 0; x < array[row].length; x++) {
        if (array[row][x] === '#') {
            const y = row
            coordinates.push([x, y])
        }
    }
}

// Closure
(function() {
    /**
     * Decimal adjustment of a number.
     *
     * @param {String}  type  The type of adjustment.
     * @param {Number}  value The number.
     * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
     * @returns {Number} The adjusted value.
     */
    function decimalAdjust(type, value, exp) {
      // If the exp is undefined or zero...
      if (typeof exp === 'undefined' || +exp === 0) {
        return Math[type](value);
      }
      value = +value;
      exp = +exp;
      // If the value is not a number or the exp is not an integer...
      if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
        return NaN;
      }
      // If the value is negative...
      if (value < 0) {
        return -decimalAdjust(type, -value, exp);
      }
      // Shift
      value = value.toString().split('e');
      value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
      // Shift back
      value = value.toString().split('e');
      return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
    }
  
    // Decimal round
    if (!Math.round10) {
      Math.round10 = function(value, exp) {
        return decimalAdjust('round', value, exp);
      };
    }
    // Decimal floor
    if (!Math.floor10) {
      Math.floor10 = function(value, exp) {
        return decimalAdjust('floor', value, exp);
      };
    }
    // Decimal ceil
    if (!Math.ceil10) {
      Math.ceil10 = function(value, exp) {
        return decimalAdjust('ceil', value, exp);
      };
    }
  })();

const removeUnvisible = (pivotIdx, asteroids) => {
    // let asteroids = input.slice(0)
    const pivot = asteroids[pivotIdx] //pivot is aateroid we are counting visible asteroids from
    asteroids.splice(pivotIdx, 1) //remove pivot asteroid from array
    let visibleCandidates = asteroids.length
    let coordinatesArray = []
    for (let i = 0; i < asteroids.length; i++) {
        if (asteroids[i][2] !== 'N') {
            const coordinate1 = asteroids[i]
            for (let j = 0; j < asteroids.length; j++) {
                if (asteroids[j][2] !== 'N' && i !== j) {
                    const coordinate2 = asteroids[j]
                    const length1 = Math.sqrt( (pivot[0]-coordinate1[0])**2 + (pivot[1]-coordinate1[1])**2 )
                    const length2 = Math.sqrt( (coordinate1[0]-coordinate2[0])**2 + (coordinate1[1]-coordinate2[1])**2 )
                    const length3 = Math.sqrt( (pivot[0]-coordinate2[0])**2 + (pivot[1]-coordinate2[1])**2 )
                    if (Math.round10(length1 + length2, -5) === Math.round10(length3, -5)) {
                        // console.log(coordinate1, coordinate2, length1, length2, length3)
                        asteroids[j].push('N')
                        visibleCandidates--
                    }else if (Math.round10(length1 + length2, -5) < Math.round10(length3, -5)) {
                        // console.log('wtf')
                        // console.log(coordinate1, coordinate2, length1, length2, length3)
                    }
                }
            }
        }
    }
    for (let i = 0; i < asteroids.length; i++ ) {
        if (asteroids[i][2] !== 'N') {
            coordinatesArray.push(asteroids[i])
        }
    }
    return coordinatesArray
}

// console.log(removeUnvisible(299, coordinates))
// console.log(coordinates.slice(0,20))

// //bestRes = 267; idx = 265; coordinates = [26, 28]

let input = coordinates.map((coordinate) => coordinate.slice(0))
const asteroidsToDestroy = removeUnvisible(265, input)
// console.log(asteroidsToDestroy)

let x1 = 26
let y1 = 28

for (let i = 0; i < asteroidsToDestroy.length; i++) {
    let y2 = asteroidsToDestroy[i][1]
    let x2 = asteroidsToDestroy[i][0]
    let angle = Math.atan2(y2 - y1, x2 - x1) + (Math.PI / 2);
    if (angle < 0) angle += Math.PI * 2;
    asteroidsToDestroy[i].push(angle)
}
asteroidsToDestroy.sort((a,b) => a[2]-b[2])
console.log(asteroidsToDestroy[199])




// // let bestRes = 0;
// // let idx = 0
// // for (let coordIdx = 0; coordIdx < coordinates.length; coordIdx++) {
// //     let input = coordinates.map((coordinate) => coordinate.slice(0))
// //     let res = removeUnvisible(coordIdx, input)
// //     if (res > bestRes) {
// //         bestRes = res
// //         idx = coordIdx
// //     }
// // }

// // console.log(coordinates[265])

// //bestRes = 267; idx = 265; coordinates = [26, 28]


// // const pivot = [26, 28]

// const pivot = [11,13]
// let coordCopy = coordinates.map((coordinate) => coordinate.slice(0))
// coordCopy.splice(205,1)
// // coordCopy.splice(265,1)

// const sector1 = []
// const sector2 = []
// const sector3 = []
// const sector4 = []
// const sector5 = []

// // slope1 = (34-26)/(0-28)
// // b1 = 0 - slope1 * 34
// // slope2 = (34-26)/(34-28)
// // b2 = 34- slope2 * 34
// // slope3 = (0-26)/(34-28)
// // b3 = 34 - slope3 * 0
// // slope4 = (0-26)/(0-28)
// // b4 = 0 - slope4 * 0

// slope1 = (0-13)/(20-11)
// b1 = 0 - slope1 * 20
// slope2 = (20-13)/(20-11)
// b2 = 20- slope2 * 20
// slope3 = (20-13)/(0-11)
// b3 = 20 - slope3 * 0
// slope4 = (0-13)/(0-11)
// b4 = 0 - slope4 * 0

// for (let coordIdx = 0; coordIdx < coordCopy.length; coordIdx++) {
//     const coordinate = coordCopy[coordIdx]
//     if (coordinate[0] >= pivot[0] && coordinate[1] < pivot[1]) {
//         const yLim = slope1*coordinate[0] + b1
//         if (coordinate[1] < yLim) {
//             sector1.push(coordinate)
//         } else {
//             sector2.push(coordinate)
//         }
//     } else if (coordinate[0] > pivot[0] && coordinate[1] >= pivot[1]) {
//         const yLim = slope2*coordinate[0] + b2
//         if (coordinate[1] < yLim) {
//             sector2.push(coordinate)
//         } else {
//             sector3.push(coordinate)
//         }
//     } else if (coordinate[0] <= pivot[0] && coordinate[1] > pivot[1]) {
//         const yLim = slope3*coordinate[0] + b3
//         if (coordinate[1] > yLim) {
//             sector3.push (coordinate)
//         } else {
//             sector4.push(coordinate)
//         }
//     } else if (coordinate[0] < pivot[0] && coordinate[1] <= pivot[1]) {
//         const yLim = slope4*coordinate[0] + b4
//         if (coordinate[1] > yLim) {
//             sector4.push(coordinate)
//         } else {
//             sector5.push(coordinate)
//         }
//     } else {
//         console.log('wtf', coordinate)
//     }
// }

// const layerSector1 = () => {
//     let sector1Copy = sector1.map((coordinate) => coordinate.slice(0))
//     sector1Copy.sort((a,b) => a[0]-b[0])
//     let sector1Layered = []
//     let i = 0
//     while (i < sector1Copy.length) {
//         let layer = []
//         let coord = sector1Copy[i]
//         layer.push(coord)
//         let x = coord[0]
//         let j = i + 1
//         while (j < sector1Copy.length && x === sector1Copy[j][0]) {
//             layer.push(sector1Copy[j])
//             j++
//         }
//         sector1Layered.push(layer)
//         i += layer.length
//     }
//     sector1Layered = sector1Layered.map(layer => layer.sort((a,b)=> b[1]-a[1]))
//     return sector1Layered
// }

// const layerSector2 = () => {
//     let sector2Copy = sector2.map((coordinate) => coordinate.slice(0))
//     sector2Copy.sort((a,b) => a[1]-b[1])
//     let sector2Layered = []
//     let i = 0
//     while (i < sector2Copy.length) {
//         let layer = []
//         let coord = sector2Copy[i]
//         layer.push(coord)
//         let y = coord[1]
//         let j = i + 1
//         while (j < sector2Copy.length && y === sector2Copy[j][1]) {
//             layer.push(sector2Copy[j])
//             j++
//         }
//         sector2Layered.push(layer)
//         i += layer.length
//     }
//     sector2Layered = sector2Layered.map(layer => layer.sort((a,b)=> b[0]-a[0]))
//     return sector2Layered
// }

// const layerSector3 = () => {
//     let sector3Copy = sector3.map((coordinate) => coordinate.slice(0))
//     sector3Copy.sort((a,b) => b[0]-a[0])
//     let sector3Layered = []
//     let i = 0
//     while (i < sector3Copy.length) {
//         let layer = []
//         let coord = sector3Copy[i]
//         layer.push(coord)
//         let x = coord[0]
//         let j = i + 1
//         while (j < sector3Copy.length && x === sector3Copy[j][0]) {
//             layer.push(sector3Copy[j])
//             j++
//         }
//         sector3Layered.push(layer)
//         i += layer.length
//     }
//     sector3Layered = sector3Layered.map(layer => layer.sort((a,b)=> a[1]-b[1]))
//     return sector3Layered
// }

// const layerSector4 = () => {
//     let sector4Copy = sector4.map((coordinate) => coordinate.slice(0))
//     sector4Copy.sort((a,b) => b[1]-a[1])
//     let sector4Layered = []
//     let i = 0
//     while (i < sector4Copy.length) {
//         let layer = []
//         let coord = sector4Copy[i]
//         layer.push(coord)
//         let y = coord[1]
//         let j = i + 1
//         while (j < sector4Copy.length && y === sector4Copy[j][1]) {
//             layer.push(sector4Copy[j])
//             j++
//         }
//         sector4Layered.push(layer)
//         i += layer.length
//     }
//     sector4Layered = sector4Layered.map(layer => layer.sort((a,b)=> b[0]-a[0]))
//     return sector4Layered
// }

// const layerSector5 = () => {
//     let sector5Copy = sector5.map((coordinate) => coordinate.slice(0))
//     sector5Copy.sort((a,b) => a[0]-b[0])
//     let sector5Layered = []
//     let i = 0
//     while (i < sector5Copy.length) {
//         let layer = []
//         let coord = sector5Copy[i]
//         layer.push(coord)
//         let x = coord[0]
//         let j = i + 1
//         while (j < sector5Copy.length && x === sector5Copy[j][0]) {
//             layer.push(sector5Copy[j])
//             j++
//         }
//         sector5Layered.push(layer)
//         i += layer.length
//     }
//     sector5Layered = sector5Layered.map(layer => layer.sort((a,b)=> b[1]-a[1]))
//     return sector5Layered
// }

// const sections = [layerSector1(), layerSector2(), layerSector3(), layerSector4(), layerSector5()]
// // const sector1Layered = layerSector1()
// // const sector2Layered = layerSector2()
// // const sector3Layered = layerSector3()
// // const sector4Layered = layerSector4()
// // const sector5Layered = layerSector5()

// console.log(sections[0])

// // let i = 0
// // let res = 0
// // let removedCoords = []
// // while (i < 201) {
// //     for (let j = 0; j < sections.length; j++) {
// //         for (let layer = 0; layer < sections[j].length; layer++) {
// //             if (sections[j][layer].length !== 0) {
// //                 let removed = sections[j][layer].shift()
// //                 i++
// //                 removedCoords.push(removed)
// //                 if (i === 10) {
// //                     res = removed
// //                 }
// //             }
// //         }
// //     }
// // }
// // console.log(removedCoords)
