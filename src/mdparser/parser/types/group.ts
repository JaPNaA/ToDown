import Range from "../../../types/range";
import HNode from "../../htmlGen/node";

abstract class Group extends Range {
    public inner: Range;
    public children: Group[];

    public segment: string;
    public startToken: string;
    public endToken: string;

    constructor(start: number, stop: number, innerStart: number, innerStop: number, segmentFrom: string) {
        super(start, stop);
        this.inner = new Range(innerStart, innerStop);
        this.children = [];

        this.segment = segmentFrom.slice(this.inner.start, this.inner.end);
        this.startToken = segmentFrom.slice(this.start, this.inner.start);
        this.endToken = segmentFrom.slice(this.inner.end, this.end);
    }

    abstract groupChildren(segment: string): void;

    public abstract parse(): HNode;
}

export default Group;