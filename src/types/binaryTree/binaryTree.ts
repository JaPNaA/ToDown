import Branch from "./branch";
import Leaf from "./leaf";
import BTNode from "./node";

class BinaryTree<T> {
    private root: BTNode<T>;

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

    private pushChildrenRecursive(arr: T[], node: BTNode<T>) {
        if (node instanceof Branch) {
            this.pushChildrenRecursive(arr, node.less);
            this.pushChildrenRecursive(arr, node.more);
        } else {
            arr.push((node as Leaf<T>).value);
        }
    }

    private createTreeFrom(items: T[]): BTNode<T> {
        const length = items.length;

        if (length <= 2) {
            if (length === 2) {
                return new Branch(
                    new Leaf(items[0]),
                    new Leaf(items[1]),
                    1
                );
            } else {
                return new Leaf<T>(items[0]);
            }
        }

        const middleIndex = Math.floor(length / 2);

        return new Branch(
            this.createTreeFrom(
                items.slice(0, middleIndex)
            ),
            this.createTreeFrom(
                items.slice(middleIndex)
            ),
            middleIndex
        );
    }

    private insertValueAt(value: T, index: number, closest: BTNode<T>, closestOffset: number) {
        const parent = closest.parent as Branch<T>;
        const leaf = new Leaf(value);
        let newBranch: Branch<T>;

        if (closestOffset < index) {
            newBranch = new Branch(closest, leaf, 1)
        } else {
            newBranch = new Branch(leaf, closest, 1);
        }

        if (parent.less === closest) {
            parent.less = newBranch;
        } else {
            parent.more = newBranch;
        }
        newBranch.parent = parent;

        this.updateParentOffsets(newBranch);
    }

    private updateParentOffsets(node: BTNode<T>): void {
        let pos: BTNode<T> = node;

        while (pos.parent !== undefined) {
            if (pos.parent.less === pos) {
                pos.parent.offset++;
            }
            
            pos = pos.parent;
        }
    }

    private getClosest(index: number): [Leaf<T>, number] {
        let position: BTNode<T> = this.root;
        let offset: number = 0;

        while (position instanceof Branch) {
            if (index < offset + position.offset) {
                position = position.less;
            } else {
                offset += position.offset;
                position = position.more;
            }
        }

        return [position as Leaf<T>, offset];
    }
}

export default BinaryTree;