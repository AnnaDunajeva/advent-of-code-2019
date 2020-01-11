// --- Day 3: Crossed Wires ---
// The gravity assist was successful, and you're well on your way to the Venus refuelling station. During the rush back on Earth, the fuel management system wasn't completely installed, so that's next on the priority list.

// Opening the front panel reveals a jumble of wires. Specifically, two wires are connected to a central port and extend outward on a grid. You trace the path each wire takes as it leaves the central port, one wire per line of text (your puzzle input).

// The wires twist and turn, but the two wires occasionally cross paths. To fix the circuit, you need to find the intersection point closest to the central port. Because the wires are on a grid, use the Manhattan distance for this measurement. While the wires do technically cross right at the central port where they both start, this point does not count, nor does a wire count as crossing with itself.

// For example, if the first wire's path is R8,U5,L5,D3, then starting from the central port (o), it goes right 8, up 5, left 5, and finally down 3:

// ...........
// ...........
// ...........
// ....+----+.
// ....|....|.
// ....|....|.
// ....|....|.
// .........|.
// .o-------+.
// ...........
// Then, if the second wire's path is U7,R6,D4,L4, it goes up 7, right 6, down 4, and left 4:

// ...........
// .+-----+...
// .|.....|...
// .|..+--X-+.
// .|..|..|.|.
// .|.-X--+.|.
// .|..|....|.
// .|.......|.
// .o-------+.
// ...........
// These wires cross at two locations (marked X), but the lower-left one is closer to the central port: its distance is 3 + 3 = 6.

// Here are a few more examples:

// R75,D30,R83,U83,L12,D49,R71,U7,L72
// U62,R66,U55,R34,D71,R55,D58,R83 = distance 159
// R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51
// U98,R91,D20,R16,D67,R40,U7,R15,U6,R7 = distance 135
// What is the Manhattan distance from the central port to the closest intersection?

// Your puzzle answer was 865.

// The first half of this puzzle is complete! It provides one gold star: *

// --- Part Two ---
// It turns out that this circuit is very timing-sensitive; you actually need to minimize the signal delay.

// To do this, calculate the number of steps each wire takes to reach each intersection; choose the intersection where the sum of both wires' steps is lowest. If a wire visits a position on the grid multiple times, use the steps value from the first time it visits that position when calculating the total value of a specific intersection.

// The number of steps a wire takes is the total number of grid squares the wire has entered to get to that location, including the intersection being considered. Again consider the example from above:

// ...........
// .+-----+...
// .|.....|...
// .|..+--X-+.
// .|..|..|.|.
// .|.-X--+.|.
// .|..|....|.
// .|.......|.
// .o-------+.
// ...........
// In the above example, the intersection closest to the central port is reached after 8+5+5+2 = 20 steps by the first wire and 7+6+4+3 = 20 steps by the second wire for a total of 20+20 = 40 steps.

// However, the top-right intersection is better: the first wire takes only 8+5+2 = 15 and the second wire takes only 7+6+2 = 15, a total of 15+15 = 30 steps.

// Here are the best steps for the extra examples from above:

// R75,D30,R83,U83,L12,D49,R71,U7,L72
// U62,R66,U55,R34,D71,R55,D58,R83 = 610 steps
// R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51
// U98,R91,D20,R16,D67,R40,U7,R15,U6,R7 = 410 steps
// What is the fewest combined steps the wires must take to reach an intersection?

const fs = require('fs');
const data = fs.readFileSync('input.txt', 'utf8');
let array = data.split(/\r\n|\n/);
array.pop()//removes some weird empty string, dont know where does it came from..
// const numbers = array.map((str)=>parseInt(str))
array = array.map((set)=>set.split(','))

// let array = [['R75','D30','R83','U83','L12','D49','R71','U7','L72'],['U62','R66','U55','R34','D71','R55','D58','R83']]
// let array = [['R8','U5','L5','D3'], ['U7','R6','D4','L4']]

const strToCoordinate = (str, xPrev, yPrev, distPrev) => {
    let coordinates = []
    let dist = parseInt(str.slice(1))
    let direction = str[0]
    let newDist = distPrev + dist
    if (direction == 'R') {
        coordinates = [xPrev+dist, yPrev]
    }
    if (direction == 'U') {
        coordinates = [xPrev, yPrev+dist]
    }
    if (direction == 'L') {
        coordinates = [xPrev-dist, yPrev]
    }
    if (direction == 'D') {
        coordinates = [xPrev, yPrev-dist]
    }
    coordinates.push(newDist)
    return coordinates;
}
const toCoordinates = (points) => {
    for (let i = 1; i < points.length; i++) {
        const xPrev = points[i-1][0]
        const yPrev = points[i-1][1]
        const distPrev = points[i-1][2]
        const coordinate = strToCoordinate(points[i], xPrev, yPrev, distPrev)
        points[i] = coordinate;
    }
    return points
}

let firstSet = array[0]
let secondSet = array[1]

firstSet.unshift([0,0,0])//x,y,distanceSoFar
secondSet.unshift([0,0,0])

let firstCoordinates = toCoordinates(firstSet)
let secondCoordinates = toCoordinates(secondSet)

let intersections = []

for (let i = 0; i < firstCoordinates.length - 1; i++) {
    let firstLine = [firstCoordinates[i], firstCoordinates[i+1]]
    for (let j = 0; j < secondCoordinates.length - 1; j++) {
        let secondLine = [secondCoordinates[j], secondCoordinates[j+1]]
        if (firstLine[0][0] === firstLine[1][0] && secondLine[0][1] === secondLine[1][1] || firstLine[0][1] === firstLine[1][1] && secondLine[0][0] === secondLine[1][0]) {
            const vertical = firstLine[0][0] === firstLine[1][0] ? firstLine : secondLine
            const horisontal = firstLine[0][1] === firstLine[1][1] ? firstLine : secondLine
            vertical.sort((a, b) => b[1] - a[1]) //sort from biggest y
            horisontal.sort((a,b) => a[0] - b[0]) //sort from smallest x
            const xIntersect = vertical[0][0]
            const yIntersect = horisontal[0][1]
            const vertDist = vertical.slice(0).sort((a,b)=>a[2]-b[2])//sorted by smallest distance
            const horDist = horisontal.slice(0).sort((a,b)=>a[2]-b[2])
            // console.log('vertical: ', vertical, 'horisontal: ', horisontal, 'intersection: ', xIntersect,',',yIntersect, 'verd: ', vertDist, 'hord: ', horDist)
            if (xIntersect >= horisontal[0][0] && xIntersect <= horisontal[1][0] && yIntersect <= vertical[0][1] && yIntersect >= vertical[1][1]) {
                const dist = vertDist[0][2] + Math.abs(vertDist[0][1] - yIntersect) + horDist[0][2] + Math.abs(horDist[0][0] - xIntersect)
                intersections.push([xIntersect, yIntersect, dist])
            }
        }
    }
}

let distances = intersections.map((coord) => Math.abs(coord[0])+Math.abs(coord[1]))
let sortedD = distances.sort((a,b)=>a-b)
let sumDist = intersections.sort((a,b) => a[2] - b[2])
console.log(intersections)
console.log(sortedD)