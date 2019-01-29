import Range from "../../../types/range";

abstract class Group extends Range {
    public inner: Range;

    constructor(start: number, stop: number, innerStart: number, innerStop: number) {
        super(start, stop);
        this.inner = new Range(innerStart, innerStop);
    }

    public abstract parse(): void;
}

export default Group;