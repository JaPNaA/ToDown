import Range from "../../../types/range";

abstract class Group extends Range {
    public inner: Range;
    public children: Group[];

    constructor(start: number, stop: number, innerStart: number, innerStop: number) {
        super(start, stop);
        this.inner = new Range(innerStart, innerStop);
        this.children = [];
    }

    abstract groupChildren(segment: string): void;

    public abstract parse(): void;
}

export default Group;