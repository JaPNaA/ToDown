import HElement from "./element";

class HDom {
    rootElms: HElement[];

    constructor() {
        this.rootElms = [];
    }

    public appendChild(child: HElement) {
        this.rootElms.push(child);
    }

    public toString() {
        return this.rootElms.map(elm => elm.toString()).join('');
    }

    public toElements() {
        throw new Error("Not implemented");
    }
}

export default HDom;