import binarySearch from "../../src/utils/binarySearch";
import Test from "../test";
import { randomSortedFloatArr, randomSortedIntArr } from "../_utils/randomSortedArr";

const floatArr = randomSortedFloatArr();
const intArr = randomSortedIntArr();

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