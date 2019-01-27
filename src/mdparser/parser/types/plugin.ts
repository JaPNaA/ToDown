import HElement from "../../htmlGen/element";

abstract class Plugin {
    /**
     * The token that marks the start of the plugin element
     */
    public abstract startToken: string | RegExp;
    public startTokenArr: string[] | RegExp = undefined as any as string[] | RegExp;

    /**
     * The token that marks the end of the plugin element
     */
    public abstract endToken: string | RegExp;
    public endTokenArr: string[] | RegExp = undefined as any as string[] | RegExp;

    /**
     * The token which when found, stops the search for the end token
     */
    public stopFindEndToken: string | RegExp = "\n";
    public stopFindEndTokenArr: string[] | RegExp = undefined as any as string[] | RegExp;

    /**
     * Called after grouping, the function to parse the contents of the plugin inside
     */
    public abstract parseSelf(): HElement;

    constructor() { }

    // reason: avoid 'cannot access abstract property in constructor'
    protected afterConstructor() {
        this.startTokenArr = this.arrayify(this.startToken);
        this.endTokenArr = this.arrayify(this.endToken);
        this.stopFindEndTokenArr = this.arrayify(this.stopFindEndToken);
    }

    private arrayify(elm: string | RegExp): RegExp | string[] {
        if (elm instanceof RegExp) {
            return elm;
        } else {
            return elm.split("");
        }
    }
}

export default Plugin;