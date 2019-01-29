import MDPlugin from "../parser/types/plugin";
import HElement from "../htmlGen/element";
import HParagraph from "../htmlGen/elements/p";
import HTextNode from "../htmlGen/nodes/text";
import { addPlugin, emphasizerList } from "./_pluginsList";
import GroupPlugin from "../parser/types/groupPlugin";
import Group from "../parser/types/group";
import Grouper from "../parser/pipeline/grouper";

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

    public groupSelf(segment: string): Group[] {
        const grouper = new Grouper(segment, emphasizerList);
        return grouper.group();
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