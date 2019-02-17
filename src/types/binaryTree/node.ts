import Branch from "./branch";

class BTNode<T> {
    parent?: Branch<T>;
    constructor() { }
}

export default BTNode;