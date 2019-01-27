import HElement from "../../htmlGen/element";

abstract class Plugin {
    /** The token that marks the start of the plugin element */
    public abstract startToken: string | RegExp;

    /** The token that marks the end of the plugin element */
    public abstract endToken: string | RegExp;


    /** The char required before matching start token */
    public beforeStartChar: string | null = "\n";

    /** Char that must come after plugin */
    public afterEndChar: string | null = null;

    /** While grouping, consider end token as part of plugin? */
    public captureEndToken: boolean = true;


    /** The token which when found, stops the search for the end token */
    public stopFindEndToken: string | RegExp = "\n";

    /** Called after grouping, the function to parse the contents of the plugin inside */
    public abstract parseSelf(): HElement;

    constructor() { }
}

export default Plugin;