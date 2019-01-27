import Plugin from "../parser/types/plugin";
import Range from "../../types/range";
import HElement from "../htmlGen/element";
import HParagraph from "../htmlGen/elements/p";
import HTextNode from "../htmlGen/nodes/text";
import { addPlugin } from "./_pluginsList";

class Heading extends Plugin {
    startToken: RegExp = /^#+\s+/;
    endToken: string = "\n";

    beforeStartChar: string = '\n';
    afterEndChar: null = null;
    captureEndToken: boolean = false;
    stopFindEndToken: string = '\n';

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