import pluginsList from "../../src/mdparser/pluginsImporter";
import Plugin from "../../src/mdparser/parser/types/plugin";
import Test from "../test";

function isStringArray(arr: any): boolean {
    if (!Array.isArray(arr)) { return false; }

    for (let elm of arr) {
        if (typeof elm !== "string") {
            return false;
        }
    }

    return true;
}

function testPlugin(plugin: Plugin) {
    for (let property of ["startTokenArr", "endTokenArr", "stopFindEndTokenArr"]) {
        // @ts-ignore
        if (plugin[property] instanceof RegExp) {
            pluginsTest.test("Should have a RegExp as " + property, function () {
                // @ts-ignore
                pluginsTest.assertTrue(plugin[property] instanceof RegExp);
            });

            pluginsTest.test(property + "RegExp should start with ^", function() {
                // @ts-ignore
                const regexp = plugin[property] as RegExp;
                pluginsTest.assertEquals(regexp.source[0], "^");
            });

            pluginsTest.test(property + "RegExp should not be global", function () {
                // @ts-ignore
                const regexp = plugin[property] as RegExp;
                pluginsTest.assertFalse(regexp.global);
            });
        } else {
            pluginsTest.test("Should have a string[] as " + property, function () {
                // @ts-ignore
                pluginsTest.assertTrue(isStringArray(plugin[property]));
            });
        }
    }
}

const pluginsTest = new Test(function () {
    this.test("pluginsList should have plugins", function () {
        if (pluginsList.length === 0) {
            this.warnWithStack("There are no plugins in pluginsList");
        } else if (pluginsList.length < 0) {
            this.errorWithStack("There seems to be a plugin made out of anti-matter here.");
        }
    });

    this.test("plugins", function () {
        for (let plugin of pluginsList) {
            this.test(plugin.constructor.name, () => testPlugin(plugin));
        }
    });
});

export default pluginsTest;