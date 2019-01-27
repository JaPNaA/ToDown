import Test from "../../test";
import Grouper from "../../../src/mdparser/parser/pipeline/grouper";
import pluginsList from "../../../src/mdparser/pluginsImporter";

const str = `
a
# jeep is a car
what about you?
## Do you think jeep is a car # 3as
Because you better
## It's really important#
# okay
`;

const grouperTest = new Test(function () {
    const groups = new Grouper(str, pluginsList).group();
    for (let group of groups) {
        console.log(str.slice(group.start, group.end));
    }
});

export default grouperTest;