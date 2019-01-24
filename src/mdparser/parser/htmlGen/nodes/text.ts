import HNode from "../node";

class HTextNode extends HNode {
    value: string;

    constructor(value: string) {
        super();
        this.value = value;
    }

    public toElement(): HTMLElement {
        throw new Error("Not implemented");
    }

    public toString(): string {
        return this.escapeString(this.value);
    }

    private escapeString(str: string) {
        return str
            .replace(/\n/g, "<br>")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
    }
}

export default HTextNode;