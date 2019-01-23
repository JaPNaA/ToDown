class Range {
    start: number;
    end: number;

    constructor(start: number, end: number) {
        this.start = start;
        this.end = end;
    }

    public middleIndex() {
        return Math.floor(this.start + (this.end - this.start) / 2);
    }
}

export default Range;