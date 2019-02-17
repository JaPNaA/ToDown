import MDPlugin from "../parser/types/plugin";
import HParagraph from "../htmlGen/elements/p";
import HElement from "../htmlGen/element";
import HTextNode from "../htmlGen/nodes/text";
import GroupPlugin from "../parser/types/groupPlugin";
import Grouper from "../parser/pipeline/grouper";
import { emphasizerList } from "./_pluginsList";
import Group from "../parser/types/group";
import HFactory from "../htmlGen/hFactory";

abstract class Emphasizer extends MDPlugin {
    public abstract startToken: RegExp = /^./;
    protected abstract endToken: RegExp = /^./;

    public beforeStartChar: null = null;
    public afterEndChar: null = null;
    public captureEndToken: boolean = true;
    public stopFindEndToken: string = '\n';

    constructor() {
        super();
    }

    public groupSelf(segment: string): Group[] {
        // only allow emphasizers in emphasizers
        const grouper = new Grouper(segment, emphasizerList);
        return grouper.group();
    }

    public parseSelf(group: GroupPlugin): HElement {
        let p: HElement;

        if (group.startToken.length % 2) {
            p = HFactory.createEmphasis();
        } else {
            p = HFactory.createStrong();
        }

        const text = HFactory.createText(group.segment);
        p.appendChild(text);
        return p;
    }

    public getDynamicEndToken(startToken: string): string {
        return startToken; // same start as end
    }
}

export default Emphasizer;