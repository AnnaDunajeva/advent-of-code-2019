const fs = require('fs');
const data = fs.readFileSync('input.txt', 'utf8');
let array = data.split(/\r\n|\n/);
array.pop()//removes some weird empty string, dont know where does it came from..

array = array.map((row) => row.split(' => '))
const materials = {}
array.map((row) => {
    const output = row[1].split(' ')
    materials[output[1]] = [output[0]]
    const initial = row[0].split(', ')
    initial.map((ingridient) => {
        const splited = ingridient.split(' ')
        materials[output[1]].push(splited[0], splited[1])
    })
})
excess = {}
const calcAmount = (name, amount) => {//name of resurce, amount of resource we need to produce
    // console.log(name, amount, materials[name], excess)
    const ore = Math.ceil(amount/materials[name][0])*materials[name][1]
    if (materials[name][2] === 'ORE') {
        if (amount < materials[name][0]) {
            if (name in excess) {
                excess[name] += materials[name][0] - amount
            } else {
                excess[name] = materials[name][0] - amount
            }
        }
        else if (amount > materials[name][0]) {
            const ingridientProduced = Math.ceil(amount/materials[name][0])*materials[name][0]
            if (name in excess) {
                excess[name] += ingridientProduced - amount
            } else {
                excess[name] = ingridientProduced - amount
            }
        }
        return ore
    } else {
        let totalOREforReaction = 0
        const actualAmountProduced = Math.ceil(amount/materials[name][0])*materials[name][0]

        if (name in excess) {
            excess[name] += actualAmountProduced - amount
        } else {
            excess[name] = actualAmountProduced - amount
        }
        
        for (let i = 1; i < materials[name].length; i+=2) {
            const ingridientName = materials[name][i+1]
            let ingridientAmount = Math.ceil(amount/materials[name][0])*materials[name][i]
            if (ingridientName in excess) {
                if (excess[ingridientName] >= ingridientAmount) {
                    excess[ingridientName] -= ingridientAmount
                    continue
                } else {
                    ingridientAmount -= excess[ingridientName]
                    excess[ingridientName] = 0
                }
            }
            const ORErequired = calcAmount(ingridientName, ingridientAmount)
            totalOREforReaction += ORErequired
        }
        return totalOREforReaction
    }
}
//const res = calcAmount('FUEL', 3340000)

res = 0
let guess = 3340000
while (res < 1000000000000) {
    guess++
    res = calcAmount('FUEL', guess)
}

console.log(guess - 1, res)
