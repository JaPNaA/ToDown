import { addPlugin } from "./_pluginsList";
import Emphasizer from "./abstractEmphasizer";

class Underscores extends Emphasizer {
    public startToken: RegExp = /^_+/;
    protected endToken: RegExp = /^_+/;

    constructor() {
        super();
    }
}

addPlugin(new Underscores());

export default Underscores;