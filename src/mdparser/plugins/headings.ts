import MDPlugin from "../parser/types/plugin";
import HElement from "../htmlGen/element";
import { addPlugin, emphasizerList } from "./_pluginsList";
import GroupPlugin from "../parser/types/groupPlugin";
import Group from "../parser/types/group";
import Grouper from "../parser/pipeline/grouper";
import HFactory from "../htmlGen/hFactory";

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

    public parseSelf(group: GroupPlugin): HElement {
        const heading = HFactory.createHeading(this.countHashes(group.startToken));
        const text = HFactory.createText(group.segment);
        heading.appendChild(text);
        return heading;
    }

    private countHashes(str: string) {
        let count = 0;

        for (const char of str) {
            if (char === "#") {
                count++;
            } else {
                break;
            }
        }

        return count;
    }
}

addPlugin(new Heading());

export default Heading;