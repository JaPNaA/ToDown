import Range from "../../../types/range";

abstract class Plugin {
    constructor() { }

    public abstract locateNextSelf(markdownString: string): Range;
}

export default Plugin;