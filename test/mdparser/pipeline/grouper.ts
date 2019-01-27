import Test from "../../test";
import Grouper from "../../../src/mdparser/parser/pipeline/grouper";
import pluginsList from "../../../src/mdparser/pluginsImporter";

const grouperTest = new Test(function() {
    console.log(
        new Grouper("a\n# jeep is a car\nwhat about you?", pluginsList).group()
    );
});

export default grouperTest;