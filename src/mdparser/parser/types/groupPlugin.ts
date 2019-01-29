import MDPlugin from "./plugin";
import Range from "../../../types/range";
import Group from "./group";

class GroupPlugin extends Group {
    public plugin: MDPlugin;
    public inner: Range;

    constructor(start: number, stop: number, innerStart: number, innerStop: number, plugin: MDPlugin) {
        super(start, stop, innerStart, innerStop);
        this.plugin = plugin;
        this.inner = new Range(innerStart, innerStop);
    }

    public parse(): void {
        throw new Error("Method not implemented.");
    }
}

export default GroupPlugin;