import HElement from "../../htmlGen/element";

abstract class Plugin {
    /**
     * The token that marks the start of the plugin element
     */
    public abstract startToken: string | RegExp;

    /**
     * The token that marks the end of the plugin element
     */
    public abstract endToken: string | RegExp;

    /**
     * The token which when found, stops the search for the end token
     */
    public stopFindEndToken: string | RegExp = "\n";

    /**
     * Called after grouping, the function to parse the contents of the plugin inside
     */
    public abstract parseSelf(): HElement;

    constructor() { }
}

export default Plugin;