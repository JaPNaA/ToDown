import Range from "./range";

abstract class Plugin {
    constructor() { }

    public abstract locateNextSelf(markdownString: string): Range;
}

export default Plugin;