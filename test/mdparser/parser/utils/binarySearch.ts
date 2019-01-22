import binarySearch from "../../../../src/mdparser/parser/utils/binarySearch";
import Test from "../../../test";

const arr = [-242, -42, -5, -3, -0, 0, 1, 4, 5, 5, 55, 23, 53, 265, 267];

export default new Test(function() {
    this.test("Finds correct index", function() {
        for (let i = 0; i < arr.length; i++) {
            this.assert(binarySearch(arr, arr[i]) === i);
        }
    });
});