import Range from "./range";
import Plugin from "./plugin";

class TreeNode {
    range: Range;
    plugin: Plugin;
    children: TreeNode[];

    constructor(range: Range, plugin: Plugin) {
        this.range = range;
        this.plugin = plugin;
        this.children = [];
    }

    public getChildInRange(index: number) {
        //
    }

    public getChild(index: number) {
        return this.children[index];
    }

    private appendChild(child: TreeNode): void {
        this.children.push(child);
    }

    private insertAt(child: TreeNode, index: number): void {
        this.children.splice(index, 0, child);
    }

    private insertManyAt(children: TreeNode[], index: number): void {
        this.children.splice(index, 0, ...children);
    }

    private removeIndex(index: number): void {
        this.children.splice(index, 1);
    }

    private get splice() {
        return this.children.splice;
    }
}

export default TreeNode;