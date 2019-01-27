import Test from "../../test";
import Grouper from "../../../src/mdparser/parser/pipeline/grouper";
import pluginsList from "../../../src/mdparser/parser/pluginsImporter";

const grouperTest = new Test(function() {
    new Grouper("# jeep is a car", pluginsList);
    // this.test("Finds Headings", function() {
    //     const grouper = new Grouper("# This is a test \n# This is a test");
    //     const result = grouper.group();
    //     this.assertArrayEquals(
    //         result,
    //         ["#", "#"]
    // });
});

export default grouperTest;