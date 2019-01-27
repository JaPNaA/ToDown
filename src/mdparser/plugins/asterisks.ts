import MDPlugin from "../parser/types/plugin";
import HParagraph from "../htmlGen/elements/p";
import HElement from "../htmlGen/element";
import HTextNode from "../htmlGen/nodes/text";
import { addPlugin } from "./_pluginsList";
import Emphasizer from "./abstractEmphasizer";

class Asterisks extends Emphasizer {
    public startToken: RegExp = /^\*+/;
    protected endToken: RegExp = /^\*+/;

    constructor() {
        super();
    }

    public parseSelf(): HElement {
        const p = new HParagraph();
        const text = new HTextNode("Asterisks (not implemented)");
        p.appendChild(text);
        return p;
    }
}

addPlugin(new Asterisks());

export default Asterisks;