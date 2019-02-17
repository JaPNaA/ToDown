import Test from "../test";
import { randomSortedIntArr } from "../_utils/randomSortedArr"
import BinaryTree from "../../src/types/binaryTree/binaryTree";
import { randomIntRange } from "../../src/utils/random";
import { inspect } from "util";

const RANGE_ARR_START = 0;
const RANGE_ARR_END = 100;

const randSortedArr = randomSortedIntArr();
const rangeArr = createRangeArr(RANGE_ARR_START, RANGE_ARR_END);

const binaryTreeTest = new Test(function() {
    this.test("Create binary tree", function() {
        new BinaryTree<number>(randSortedArr);
    });

    this.test("Create binary tree with 0 elements", function () {
        const tree = new BinaryTree<number>([]);
        this.assertEquals(tree.get(0), undefined);
    });

    this.test("Create binary tree with 1 element", function() {
        const tree = new BinaryTree<number>([1]);
        this.assertEquals(tree.get(0), 1);
    });

    this.test("Find all elements in tree", function() {
        const binaryTree = new BinaryTree<number>(randSortedArr);
        for (let i = 0; i < randSortedArr.length; i++) {
            this.assertEquals(binaryTree.get(i), randSortedArr[i]);
        }
    });

    this.test("Get non-existant item", function() {
        const binaryTree = new BinaryTree<number>(randSortedArr);
        this.assertEquals(binaryTree.get(randSortedArr.length), undefined);
        this.assertEquals(binaryTree.get(-1), undefined);
    });

    this.test("Convert to array", function() {
        const binaryTree = new BinaryTree<number>(randSortedArr);
        this.assertArrayEquals(randSortedArr, binaryTree.toArray());
    })

    this.test("Insert item", function() {
        for (let i = RANGE_ARR_START; i < RANGE_ARR_END; i++) {
            this.test(i.toString(), function() {
                testInsertItem(this, i)
            });
        }
    });
});

function createRangeArr(start: number, end: number): number[] {
    const arr: number[] = [];
    
    for (let i = start; i < end; i++) {
        arr.push(i);
    }

    return arr;
}

function testInsertItem(test: Test, exclude: number) {
    const binaryTree =
        new BinaryTree<number>(rangeArr.filter(e => e !== exclude));

    binaryTree.add(exclude, exclude);

    test.test("Array equals", function() {
        test.assertArrayEquals(binaryTree.toArray(), rangeArr);
    });

    test.test("Retrieval", function() {
        for (let i = RANGE_ARR_START; i < RANGE_ARR_END; i++) {
            test.assertEquals(binaryTree.get(i), i);
        }
    });
}

export default binaryTreeTest;