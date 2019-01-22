import Plugin from "../types/plugin";
import Range from "../types/range";

class Heading extends Plugin {
    // /\n\s*#\s*.+/

    constructor() {
        super();
    }

    public locateNextSelf(markdown: string): Range {
        return new Range(0, 1);
    }
}

export default Heading;