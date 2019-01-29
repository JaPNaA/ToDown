import Test from "../../test";
import Grouper from "../../../src/mdparser/parser/pipeline/grouper";
import pluginsList from "../../../src/mdparser/pluginsImporter";
import Timer from "../../_utils/timer";

const str = `
a
# jeep is a car
what about you?
## Do you think jeep is a car # 3as
Because you better
## It's really important#
# okay

**I'm bold**
*I'm itallic*
****I'm both***
* Assuming that it works

_ asdf
_im itallic_
__im bold__
___im both lol___
_underscores_ __look__ ___weird___
`;

function test() {
    const groups = new Grouper(str, pluginsList).group();
    for (let group of groups) {
        console.log(str.slice(group.start, group.end));
    }
}

const grouperTest = new Test(function () {
    this.test("group", test);
});

export default grouperTest;