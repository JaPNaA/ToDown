import MDPlugin from "../parser/types/plugin";
import HParagraph from "../htmlGen/elements/p";
import HElement from "../htmlGen/element";
import HTextNode from "../htmlGen/nodes/text";
import { addPlugin } from "./_pluginsList";

class Asterisks extends MDPlugin {
    public startToken: RegExp = /^\*+/;
    protected endToken: RegExp = /^\*+/;

    public beforeStartChar: null = null;
    public afterEndChar: null = null;
    public captureEndToken: boolean = true;
    public stopFindEndToken: string = '\n';

    constructor() {
        super();
    }

    public parseSelf(): HElement {
        const p = new HParagraph();
        const text = new HTextNode("Asterisks (not implemented)");
        p.appendChild(text);
        return p;
    }

    public getDynamicEndToken(startToken: string): string {
        return startToken; // same start as end
    }
}

addPlugin(new Asterisks());

export default Asterisks;