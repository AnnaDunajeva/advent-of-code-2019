let input = '59764635797473718052486376718142408346357676818478503599633670059885748195966091103097769012608550645686932996546030476521264521211192035231303791868456877717957482002303790897587593845163033589025995509264282936119874431944634114034231860653524971772670684133884675724918425789232716494769777580613065860450960426147822968107966020797566015799032373298777368974345143861776639554900206816815180398947497976797052359051851907518938864559670396616664893641990595511306542705720282494028966984911349389079744726360038030937356245125498836945495984280140199805250151145858084911362487953389949062108285035318964376799823425466027816115616249496434133896'
//let input = '80871224585914546619083218645595'
const basePattern = '0,1,0,-1'
input = input.repeat(10000)
count = 0

function fftTransform(arr) {
    arrProcessed = []
    arr.reverse()
    sumSoFar=0 
    for (el of arr) {
        sumSoFar += el
        arrProcessed.push(Math.abs(sumSoFar)%10)
    }
    return arrProcessed.reverse()
}

// let newInput = input.split('').map((char) => parseInt(char))
// let inputForNextPhase = []
// while (count < 100) {
//     count++
//     for (let i = 0; i < newInput.length; i++) {
//         let newBase = '0,'.repeat(i+1) + '1,'.repeat(i+1) + '0,'.repeat(i+1) + '-1,'.repeat(i+1)
//         let baseSplitted = newBase.slice(0, -1).split(',')
//         const multiplyer = Math.ceil(input.length / (baseSplitted.length - 1))
//         newBase = newBase.repeat(multiplyer).slice(0, -1).split(',').slice(1, input.length + 1).map((char) => parseInt(char))
//         let newChar = 0
//         //console.log(newBase)
//         for (let j = 0; j < newInput.length; j++) {
//             newChar += newInput[j]*newBase[j]
//             //console.log(newInput[j], newBase[j], newChar)
//         }
//         inputForNextPhase.push(Math.abs(newChar%10))
//     }
//     newInput = inputForNextPhase
//     inputForNextPhase = []
// }
// const offset = newInput.slice(0, 8).join()
// const message = newInput.slice(offset, offset + 9)
// console.log(offset, message)

const offset = parseInt(input.slice(0, 7));
let newInput = input.split('').map((char) => parseInt(char)).slice(offset);

console.log('Can we use 2nd half hack?', offset > input.length/2);

while (count < 100) {
    count++
    newInput = fftTransform(newInput);
}
const message = newInput.slice(0, 8)
console.log(offset, message)