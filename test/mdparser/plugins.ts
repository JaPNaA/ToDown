import pluginsList from "../../src/mdparser/pluginsImporter";
import MDPlugin from "../../src/mdparser/parser/types/plugin";
import Test from "../test";

function testPlugin(plugin: MDPlugin) {
    for (let property of ["startToken", "endToken"]) {
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
            pluginsTest.test("Should have a string or regex as " + property, function () {
                // @ts-ignore
                pluginsTest.assertEquals(typeof plugin[property], "string");
            });
        }
    }

    pluginsTest.test("Should have a string, regex, or null as stopFindEndToken", function() {
        pluginsTest.assertTrue(
            typeof plugin.stopFindEndToken === "string" ||
            plugin.stopFindEndToken instanceof RegExp ||
            plugin.stopFindEndToken === null
        );
    });
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