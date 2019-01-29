import HParagraph from "../htmlGen/elements/p";
import HElement from "../htmlGen/element";
import HTextNode from "../htmlGen/nodes/text";
import { addPlugin } from "./_pluginsList";
import Emphasizer from "./abstractEmphasizer";

class Underscores extends Emphasizer {
    public startToken: RegExp = /^_+/;
    protected endToken: RegExp = /^_+/;

    constructor() {
        super();
    }

    public parseSelf(): HElement {
        const p = new HParagraph();
        const text = new HTextNode("Underscores (not implemented)");
        p.appendChild(text);
        return p;
    }
}

addPlugin(new Underscores());

export default Underscores;