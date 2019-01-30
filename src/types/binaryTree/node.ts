import BinaryTreeBranch from "./branch";

class BinaryTreeNode<T> {
    parent?: BinaryTreeBranch<T>;
    constructor() { }
}

export default BinaryTreeNode;