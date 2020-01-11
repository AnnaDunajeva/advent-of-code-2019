const fs = require('fs');
const data = fs.readFileSync('input.txt', 'utf8');
let array = data.split(/\r\n|\n/);
array.pop()//removes some weird empty string, dont know where does it came from..
array = array[0].split('')
array = array.map((char) => parseInt(char))

const layers = []
for (let i = 0; i < array.length; i += 150) {
    layers.push(array.slice(i, i + 150))
}

let indexWithFewestZeros = 0;
let fewestZeros = Infinity
for(let layerIndex = 0; layerIndex < layers.length; layerIndex ++) {
    const layer = layers[layerIndex]
    let zeros = 0
    for (let pixelIndex = 0; pixelIndex < layer.length; pixelIndex++) {
        if (layer[pixelIndex] === 0) {
            zeros++
        }
    }
    if (zeros < fewestZeros) {
        fewestZeros = zeros
        indexWithFewestZeros = layerIndex
    }
}
// let twos = 0;
// let ones = 0;
// for (let i = 0; i < layers[indexWithFewestZeros].length; i++) {
//     if (layers[indexWithFewestZeros][i] === 1) {
//         ones ++
//     } else if (layers[indexWithFewestZeros][i] === 2) {
//         twos ++
//     }
// }
// let res = twos * ones
// console.log(layers[indexWithFewestZeros], fewestZeros, ones, twos, res)

const image = []
const reverseInput = layers.slice(0).reverse()

for (let i = 0; i < reverseInput.length; i++) {
    layer = reverseInput[i];
    for (let j = 0; j <layer.length; j++) {
        const pixel = layer[j]
        if (pixel !== 2) {
            image[j] = pixel
        }
     }
}
let imageSliced = []
for (let i = 0; i < image.length; i+=25) {
    let row = image.slice(i, i + 25)
    row = row.map((char) => char === 0 ? ' ' : char)
    row = row.join('')
    imageSliced.push(row)
}
console.log(imageSliced)
