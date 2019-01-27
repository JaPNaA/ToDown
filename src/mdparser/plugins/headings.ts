import MDPlugin from "../parser/types/plugin";
import Range from "../../types/range";
import HElement from "../htmlGen/element";
import HParagraph from "../htmlGen/elements/p";
import HTextNode from "../htmlGen/nodes/text";
import { addPlugin } from "./_pluginsList";

class Heading extends MDPlugin {
    public startToken: RegExp = /^#+\s+/;
    protected endToken: string = "\n";

    public beforeStartChar: string = '\n';
    public afterEndChar: null = null;
    public captureEndToken: boolean = false;
    public stopFindEndToken: string = '\n';

    constructor() {
        super();
    }

    public parseSelf(): HElement {
        const p = new HParagraph();
        const text = new HTextNode("Heading (not implemented)");
        p.appendChild(text);
        return p;
    }
}

addPlugin(new Heading());

export default Heading;