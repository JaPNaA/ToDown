import BinaryTreeNode from "./node";

class BinaryTreeBranch<T> extends BinaryTreeNode<T> {
    less: BinaryTreeNode<T>;
    more: BinaryTreeNode<T>;
    offset: number;

    constructor(less: BinaryTreeNode<T>, more: BinaryTreeNode<T>, offset: number) {
        super();

        this.less = less;
        this.more = more;
        this.offset = offset;

        less.parent = this;
        more.parent = this;
    }
}

export default BinaryTreeBranch;