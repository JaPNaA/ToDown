import binarySearch from "../../../../src/mdparser/parser/utils/binarySearch";
import Test from "../../../test";
import { randomIntMax, randomRange, randomIntRange } from "../../../../src/mdparser/parser/utils/random";

function randFloatArr() {
    const length = randomIntMax(1000);
    const arr: number[] = [];

    for (let i = 0; i < length; i++) {
        arr.push(randomRange(-1e9, 1e9));
    }

    return arr.sort((a, b) => a - b);
}

function randIntArr() {
    const length = randomIntMax(1000);
    const arr: number[] = [];

    for (let i = 0; i < length; i++) {
        arr.push(randomIntRange(-100, 100));
    }

    return arr.sort((a, b) => a - b);
}

const floatArr = randFloatArr();
const intArr = randIntArr();

function binarySearchTestAllElements(arr: number[]) {
    for (let i = 0; i < arr.length; i++) {
        binarySearchTest.assertEquals(
            arr[binarySearch(arr, arr[i])],
            arr[i]
        );
    }
}

const binarySearchTest = new Test(function () {
    this.test("Finds correct index (floats)", function () {
        binarySearchTestAllElements(floatArr);
    });
    this.test("Finds correct index (ints)", function () {
        binarySearchTestAllElements(intArr);
    });
});

export default binarySearchTest;