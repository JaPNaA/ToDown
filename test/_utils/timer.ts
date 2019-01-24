class Time {
    public arr: [number, number];

    constructor() {
        this.arr = [0, 0];
    }

    public now() {
        this.arr = process.hrtime();
    }
}

class Timer {
    private startTime: Time;
    private static NANOSECONDS_PER_SECOND = 1e9;
    private static NANOSECONDS_PER_MILLISECOND = 1e6;

    constructor() {
        this.startTime = new Time();
    }

    public start(): void {
        this.startTime.now();
    }

    public getDeltaNanos(): number {
        const diff = process.hrtime(this.startTime.arr);
        return diff[0] * Timer.NANOSECONDS_PER_SECOND + diff[1];
    }

    public getDeltaMillis(): number {
        const deltaNanos = this.getDeltaNanos();
        return deltaNanos / Timer.NANOSECONDS_PER_MILLISECOND;
    }
}

export default Timer;