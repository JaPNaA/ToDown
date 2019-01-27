import Range from "../../../types/range";
import Plugin from "./plugin";

class GroupPlugin extends Range {
    public plugin: Plugin;

    constructor(start: number, stop: number, plugin: Plugin) {
        super(start, stop);
        this.plugin = plugin;
    }
}

export default GroupPlugin;