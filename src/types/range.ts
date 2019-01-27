class Range {
    start: number;
    end: number;

    constructor(start: number, end: number) {
        this.start = start;
        this.end = end;
    }

    public middleIndex(): number {
        return Math.floor(this.start + this.length() / 2);
    }

    public offset(by: number): Range {
        this.start += by;
        this.end += by;
        return this;
    }

    public length(): number {
        return this.end - this.start;
    }

    public sliceOn(arr: string): string;
    public sliceOn(arr: any[]): any[];

    public sliceOn(arr: string | any[]): string | any[] {
        return arr.slice(this.start, this.end);
    }
}

export default Range;