import { randomRange, randomIntMax, randomIntRange } from "../../src/utils/random";

function randomSortedFloatArr(length?: number) {
    const arrLength = length || randomIntMax(1000);
    const arr: number[] = [];

    for (let i = 0; i < arrLength; i++) {
        arr.push(randomRange(-1e9, 1e9));
    }

    return arr.sort((a, b) => a - b);
}


function randomSortedIntArr() {
    const length = randomIntMax(1000);
    const arr: number[] = [];

    for (let i = 0; i < length; i++) {
        arr.push(randomIntRange(-100, 100));
    }

    return arr.sort((a, b) => a - b);
}

export { randomSortedFloatArr, randomSortedIntArr };