import MDPlugin from "./plugin";
import Range from "../../../types/range";
import Group from "./group";
import HNode from "../../htmlGen/node";
import HElement from "../../htmlGen/element";

class GroupPlugin extends Group {
    public plugin: MDPlugin;
    public inner: Range;

    constructor(start: number, stop: number, innerStart: number, innerStop: number, segmentFrom: string, plugin: MDPlugin) {
        super(start, stop, innerStart, innerStop, segmentFrom);
        this.plugin = plugin;
        this.inner = new Range(innerStart, innerStop);
    }

    public groupChildren(): void {
        this.children = this.plugin.groupSelf(this.segment);
    }

    public appendChildrenTo(elm: HElement): void {
        for (const child of this.children) {
            elm.appendChild(child.parse());
        }
    }

    public parse(): HNode {
        return this.plugin.parseSelf(this);
    }
}

export default GroupPlugin;