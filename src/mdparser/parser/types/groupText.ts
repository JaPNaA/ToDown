import Group from "./group";
import HFactory from "../../htmlGen/hFactory";
import HNode from "../../htmlGen/node";

class TextGroup extends Group {
    constructor(start: number, stop: number, segmentFrom: string) {
        super(start, stop, start, stop, segmentFrom);
    }

    public groupChildren(): void { }

    public parse(): HNode {
        return HFactory.createText(this.segment);
    }
}

export default TextGroup;