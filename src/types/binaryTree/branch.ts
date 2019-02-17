import BTNode from "./node";

class Branch<T> extends BTNode<T> {
    less: BTNode<T>;
    more: BTNode<T>;
    offset: number;

    constructor(less: BTNode<T>, more: BTNode<T>, offset: number) {
        super();

        this.less = less;
        this.more = more;
        this.offset = offset;

        less.parent = this;
        more.parent = this;
    }
}

export default Branch;