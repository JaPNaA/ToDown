import BinaryTreeBranch from "./branch";
import BinaryTreeLeaf from "./leaf";
import BinaryTreeNode from "./node";

class BinaryTree<T> {
    private root: BinaryTreeNode<T>;

    constructor(itemsSorted: T[]) {
        this.root = this.createTreeFrom(itemsSorted);
    }

    public get(index: number): T | undefined {
        const [closest, offset] = this.getClosest(index);

        if (offset === index) {
            return closest.value;
        } else {
            return undefined;
        }
    }

    public add(index: number, value: T): void {
        const [closest, closestOffset] = this.getClosest(index);
        if (closest.parent) {
            this.insertValueAt(value, index, closest, closestOffset);
        } else {
            throw new Error("Not implemented adding to tree of 1 or less");
        }
    }

    public toArray(): T[] {
        const arr: T[] = [];
        this.pushChildrenRecursive(arr, this.root);
        return arr;
    }

    private pushChildrenRecursive(arr: T[], node: BinaryTreeNode<T>) {
        if (node instanceof BinaryTreeBranch) {
            this.pushChildrenRecursive(arr, node.less);
            this.pushChildrenRecursive(arr, node.more);
        } else {
            arr.push((node as BinaryTreeLeaf<T>).value);
        }
    }

    private createTreeFrom(items: T[]): BinaryTreeNode<T> {
        const length = items.length;

        if (length <= 2) {
            if (length === 2) {
                return new BinaryTreeBranch(
                    new BinaryTreeLeaf(items[0]),
                    new BinaryTreeLeaf(items[1]),
                    1
                );
            } else {
                return new BinaryTreeLeaf<T>(items[0]);
            }
        }

        const middleIndex = Math.floor(length / 2);

        return new BinaryTreeBranch(
            this.createTreeFrom(
                items.slice(0, middleIndex)
            ),
            this.createTreeFrom(
                items.slice(middleIndex)
            ),
            middleIndex
        );
    }

    private insertValueAt(value: T, index: number, closest: BinaryTreeNode<T>, closestOffset: number) {
        const parent = closest.parent as BinaryTreeBranch<T>;
        const leaf = new BinaryTreeLeaf(value);
        let newBranch: BinaryTreeBranch<T>;

        if (closestOffset < index) {
            newBranch = new BinaryTreeBranch(closest, leaf, 1)
        } else {
            newBranch = new BinaryTreeBranch(leaf, closest, 1);
        }

        if (parent.less === closest) {
            parent.less = newBranch;
            parent.offset++;
        } else {
            parent.more = newBranch;
        }

        let pos: BinaryTreeBranch<T> | undefined = parent;

        while (pos !== undefined) {
            if (pos.parent && pos.parent.less === pos) {
                pos.offset++;
            }

            pos = pos.parent;
        }
    }

    private getClosest(index: number): [BinaryTreeLeaf<T>, number] {
        let position: BinaryTreeNode<T> = this.root;
        let offset: number = 0;

        while (position instanceof BinaryTreeBranch) {
            if (index < offset + position.offset) {
                position = position.less;
            } else {
                offset += position.offset;
                position = position.more;
            }
        }

        return [position as BinaryTreeLeaf<T>, offset];
    }
}

export default BinaryTree;