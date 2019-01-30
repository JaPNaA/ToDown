import BinaryTreeNode from "./node";

class BinaryTreeLeaf<T> extends BinaryTreeNode<T> {
    value: T;

    constructor(value: T) {
        super();
        this.value = value;
    }
}

export default BinaryTreeLeaf;