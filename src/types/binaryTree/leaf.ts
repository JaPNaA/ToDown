import BTNode from "./node";

class Leaf<T> extends BTNode<T> {
    value: T;

    constructor(value: T) {
        super();
        this.value = value;
    }
}

export default Leaf;