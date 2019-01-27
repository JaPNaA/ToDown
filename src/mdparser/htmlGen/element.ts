import HNode from "./node";

class HElement extends HNode {
    public tagName: string;
    public children: HNode[];

    private attribs: Map<string, string>;
    private _classes: string[];
    private classesAttribDirty: boolean;

    constructor(tagName: string) {
        super();
        this.tagName = tagName;
        this.children = [];

        this.attribs = new Map();
        this._classes = [];
        this.classesAttribDirty = false;
    }

    public appendChild(elm: HNode) {
        this.children.push(elm);
    }

    public toElement(): HTMLElement {
        throw new Error("Not implemented");
    }

    public toString(): string {
        return this.elmToString();
    }

    public setId(id: string): void {
        this.attribs.set("id", id);
    }

    public removeId(): void {
        this.attribs.delete("id");
    }

    public addClass(cls: string): void {
        this.classesAttribDirty = true;
        this._classes.push(cls);
    }

    public setAttrib(key: string, value?: string): void {
        if (value) {
            this.attribs.set(key, value);
        } else {
            this.removeAttrib(key);
        }
    }

    public removeAttrib(key: string) {
        this.attribs.delete(key);
    }

    public getAttrib(key: string): string | undefined {
        if (this.classesAttribDirty) { this.updateClassAttrib(); }

        return this.attribs.get(key);
    }

    private elmToString(): string {
        let attribs = this.attribsToString();

        if (!attribs) {
            attribs = "";
        } else {
            attribs = " " + attribs;
        }

        return "<" + this.tagName +
            attribs +
            ">" + this.childrenToString() + "</" + this.tagName + ">";
    }

    private attribsToString(): string | null {
        if (this.attribs.size > 0 || this._classes.length > 0) {
            return this._attribsToString();
        } else {
            return null;
        }
    }

    private _attribsToString(): string {
        const str: string[] = [];

        this.updateClassAttrib();
        for (let [attr, value] of this.attribs) {
            const val = this.attribToString(attr, value);
            if (val) {
                str.push(val);
            }
        }

        return str.join(" ");
    }

    private updateClassAttrib() {
        this.classesAttribDirty = false;
        this.attribs.set("class", this._classes.join(" "));
    }

    private attribToString(attr: string, value: string): string | null {
        if (!value) {
            return null;
        }

        return attr + "=\"" + this.escapeDoubleQuotes(value) + "\"";
    }

    private escapeDoubleQuotes(str: string) {
        return str.replace(/"/g, '&quot;');
    }

    private childrenToString(): string {
        return this.children.map(child => child.toString()).join('');
    }
}

export default HElement;