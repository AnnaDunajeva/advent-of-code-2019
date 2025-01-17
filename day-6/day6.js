// --- Day 6: Universal Orbit Map ---
// You've landed at the Universal Orbit Map facility on Mercury. Because navigation in space often involves transferring between orbits, the orbit maps here are useful for finding efficient routes between, for example, you and Santa. You download a map of the local orbits (your puzzle input).

// Except for the universal Center of Mass (COM), every object in space is in orbit around exactly one other object. An orbit looks roughly like this:

//                   \
//                    \
//                     |
//                     |
// AAA--> o            o <--BBB
//                     |
//                     |
//                    /
//                   /
// In this diagram, the object BBB is in orbit around AAA. The path that BBB takes around AAA (drawn with lines) is only partly shown. In the map data, this orbital relationship is written AAA)BBB, which means "BBB is in orbit around AAA".

// Before you use your map data to plot a course, you need to make sure it wasn't corrupted during the download. To verify maps, the Universal Orbit Map facility uses orbit count checksums - the total number of direct orbits (like the one shown above) and indirect orbits.

// Whenever A orbits B and B orbits C, then A indirectly orbits C. This chain can be any number of objects long: if A orbits B, B orbits C, and C orbits D, then A indirectly orbits D.

// For example, suppose you have the following map:

// COM)B
// B)C
// C)D
// D)E
// E)F
// B)G
// G)H
// D)I
// E)J
// J)K
// K)L
// Visually, the above map of orbits looks like this:

//         G - H       J - K - L
//        /           /
// COM - B - C - D - E - F
//                \
//                 I
// In this visual representation, when two objects are connected by a line, the one on the right directly orbits the one on the left.

// Here, we can count the total number of orbits as follows:

// D directly orbits C and indirectly orbits B and COM, a total of 3 orbits.
// L directly orbits K and indirectly orbits J, E, D, C, B, and COM, a total of 7 orbits.
// COM orbits nothing.
// The total number of direct and indirect orbits in this example is 42.

// What is the total number of direct and indirect orbits in your map data?

// Your puzzle answer was 292387.

// --- Part Two ---
// Now, you just need to figure out how many orbital transfers you (YOU) need to take to get to Santa (SAN).

// You start at the object YOU are orbiting; your destination is the object SAN is orbiting. An orbital transfer lets you move from any object to an object orbiting or orbited by that object.

// For example, suppose you have the following map:

// COM)B
// B)C
// C)D
// D)E
// E)F
// B)G
// G)H
// D)I
// E)J
// J)K
// K)L
// K)YOU
// I)SAN
// Visually, the above map of orbits looks like this:

//                           YOU
//                          /
//         G - H       J - K - L
//        /           /
// COM - B - C - D - E - F
//                \
//                 I - SAN
// In this example, YOU are in orbit around K, and SAN is in orbit around I. To move from K to I, a minimum of 4 orbital transfers are required:

// K to J
// J to E
// E to D
// D to I
// Afterward, the map of orbits looks like this:

//         G - H       J - K - L
//        /           /
// COM - B - C - D - E - F
//                \
//                 I - SAN
//                  \
//                   YOU
// What is the minimum number of orbital transfers required to move from the object YOU are orbiting to the object SAN is orbiting? (Between the objects they are orbiting - not between YOU and SAN.)

// Your puzzle answer was 433.

// Both parts of this puzzle are complete! They provide two gold stars: **

// At this point, you should return to your Advent calendar and try another puzzle.

// If you still want to see it, you can get your puzzle input.

// You can also [Share] this puzzle.


const fs = require('fs');
const data = fs.readFileSync('input.txt', 'utf8');
let array = data.split(/\r\n|\n/);
array.pop()//removes some weird empty string, dont know where does it came from..

// let array = ['COM)B', 'B)C', 'C)D', 'D)E', 'E)F', 'B)G', 'G)H', 'D)I', 'E)J', 'J)K', 'K)L', 'K)YOU', 'I)SAN']

array = array.map((el) => el.split(')'))
const graphObject = {}
for (let i = 0; i <array.length; i++) {
    const node = array[i][0]
    const value = array[i][1]
    if (!(node in graphObject)) {
        graphObject[node] = [value]
    } else if (node in graphObject) {
        graphObject[node].push(value)
    }
    if (!graphObject[value]) {
        graphObject[value] = [node]
    } else if (graphObject[value]) {
        graphObject[value].push(node)
    }
}
// console.log(Object.keys(graphObject).length)
// console.log(array.length)
// console.log(graphObject)

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

function breadthFirstSearch(graph, startVertex, endVertex) {
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
    let shortestPath = level[endVertex];
    return {
        graph: graph,
        level: level,
        shortestPath: shortestPath
    }
}

let graphCopy = JSON.parse(JSON.stringify(graphObject));
let graphSearch = breadthFirstSearch(graphCopy, 'YOU', 'SAN');
// console.log(graphCopy)
console.log(graphSearch.shortestPath);

// let sum = 0
// for (let key in graphSearch.level) {
//     sum += graphSearch.level[key]
// }

// console.log(sum)
