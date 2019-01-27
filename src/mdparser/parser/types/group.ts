import Range from "../../../types/range";
import MDPlugin from "./plugin";

class GroupPlugin extends Range {
    public plugin: MDPlugin;
    public inner: Range;

    constructor(start: number, stop: number, innerStart: number, innerStop: number, plugin: MDPlugin) {
        super(start, stop);
        this.plugin = plugin;
        this.inner = new Range(innerStart, innerStop);
    }
}

export default GroupPlugin;