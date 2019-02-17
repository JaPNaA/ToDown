import HFactory from "./htmlGen/hFactory";
import Grouper from "./parser/pipeline/grouper";
import HDom from "./htmlGen/dom";
import pluginsList from "./pluginsImporter";

class MDParser {
    static parseToString(markdownStr: string): string {
        return this.parse(markdownStr).toString();
    }
    
    static parseToElement(markdownStr: string): DocumentFragment {
        return this.parse(markdownStr).toElements();
    }

    private static parse(markdownStr: string): HDom {
        const grouper = new Grouper(markdownStr, pluginsList);
        const groups = grouper.group();
        const root = HFactory.createRoot();

        for (let group of groups) {
            root.appendChild(group.parse());
        }

        return root;
    }
}

export default MDParser;