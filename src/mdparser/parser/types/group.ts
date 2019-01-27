import Range from "../../../types/range";
import Plugin from "./plugin";

class GroupPlugin extends Range {
    public plugin: Plugin;
    public inner: Range;

    constructor(start: number, stop: number, innerStart: number, innerStop: number, plugin: Plugin) {
        super(start, stop);
        this.plugin = plugin;
        this.inner = new Range(innerStart, innerStop);
    }
}

export default GroupPlugin;