import Test from "../test";
import { randomSortedFloatArr } from "../_utils/randomSortedArr"
import BinaryTree from "../../src/types/binaryTree/binaryTree";
import { inspect } from "util";

const randArr = randomSortedFloatArr();

const binaryTreeTest = new Test(function() {
    this.test("Create binary tree", function() {
        new BinaryTree<number>(randArr);
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
        const binaryTree = new BinaryTree<number>(randArr);
        for (let i = 0; i < randArr.length; i++) {
            this.assertEquals(binaryTree.get(i), randArr[i]);
        }
    });

    this.test("Get non-existant item", function() {
        const binaryTree = new BinaryTree<number>(randArr);
        this.assertEquals(binaryTree.get(randArr.length), undefined);
        this.assertEquals(binaryTree.get(-1), undefined);
    });

    this.test("Convert to array", function() {
        const binaryTree = new BinaryTree<number>(randArr);
        this.assertArrayEquals(randArr, binaryTree.toArray());
    })

    this.test("Insert item", function() {
        const binaryTree = new BinaryTree<number>([0, 1, 2, 4, 5]);
        binaryTree.add(3, 3);
        console.log(binaryTree.toArray());
        for (let i = 0; i < 6; i++) {
            this.assertEquals(binaryTree.get(i), i);
        }
    });
});

export default binaryTreeTest;