import MDPlugin from "../parser/types/plugin";
import HElement from "../htmlGen/element";
import GroupPlugin from "../parser/types/groupPlugin";
import { pluginsList, addPlugin } from "./_pluginsList";
import Grouper from "../parser/pipeline/grouper";
import Group from "../parser/types/group";
import HFactory from "../htmlGen/hFactory";

// TODO: Paragraph doesn't match after heading without second newline

class Paragraph extends MDPlugin {
    public startToken: RegExp = /^\n+/;
    public endToken: string = "\n\n";
    // public afterEndChar: string = "\n";
    public beforeStartChar: null = null;
    public stopFindEndToken: null = null;

    public captureEndToken: boolean = false;

    public groupSelf(segment: string): Group[] {
        const grouper = new Grouper(segment, pluginsList);
        const g = grouper.group();
        return g;
    }

    public parseSelf(group: GroupPlugin): HElement {
        const paragraph = HFactory.createP();
        group.appendChildrenTo(paragraph);
        return paragraph;
    }
}

addPlugin(new Paragraph());

export default Paragraph;