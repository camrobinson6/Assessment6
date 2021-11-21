import { convertToObject } from "typescript";

const {shuffleArray} = require('./utils')

describe('shuffleArray test', () => {
    // CODE HERE
    test('shuffleArray should return an array same length', () =>{
        let arr = [12, 32, 43, 55, 3];
        expect(arr).toHaveLength(5);
})
     
test('Items have been shuffled around', () =>{
    let arr = [12, 32, 43, 55, 3];
    expect(arr.sort).not.toBe(shuffleArray.sort)

    })

})





