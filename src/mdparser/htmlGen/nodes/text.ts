import HNode from "../node";

class HTextNode extends HNode {
    private value: string;

    constructor(value?: string) {
        super();
        this.value = value || "";
    }

    public toElement(): HTMLElement {
        throw new Error("Not implemented");
    }

    public toString(): string {
        return this.escapeString(this.value);
    }

    private escapeString(str: string) {
        return str
            // .replace(/\n/g, "<br>") // not needed: using .innerText
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
    }
}

export default HTextNode;