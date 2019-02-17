import HElement from "../element";

class HHeading extends HElement {
    constructor(level: number) {
        super("h" + level);
    }
}

export default HHeading;