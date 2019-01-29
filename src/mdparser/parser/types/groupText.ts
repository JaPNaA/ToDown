import Group from "./group";

class TextGroup extends Group {
    public text: string;
    
    constructor(start: number, stop: number) {
        super(start, stop, start, stop);
        this.text = "";
    }

    public groupChildren(): void { }

    public parse(): void {
        throw new Error("Method not implemented.");
    }
}

export default TextGroup;