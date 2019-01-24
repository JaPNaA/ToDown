import HElement from "../element";

class HAnchor extends HElement {
    constructor() {
        super("a");
    }

    set href(e: string | undefined) {
        this.setAttrib("href", e);
    }

    get href(): string | undefined {
        return this.getAttrib("href");
    }

    set name(e: string | undefined) {
        this.setAttrib("name", e);
    }

    get name(): string | undefined {
        return this.getAttrib("name");
    }

    set target(e: string | undefined) {
        this.setAttrib("target", e);
    }

    get target(): string | undefined {
        return this.getAttrib("target");
    }
}

export default HAnchor;