import { addPlugin } from "./_pluginsList";
import Emphasizer from "./abstractEmphasizer";

class Asterisks extends Emphasizer {
    public startToken: RegExp = /^\*+/;
    protected endToken: RegExp = /^\*+/;

    constructor() {
        super();
    }
}

addPlugin(new Asterisks());

export default Asterisks;