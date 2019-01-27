import MDPlugin from "../parser/types/plugin";

const pluginsList: MDPlugin[] = [];

function addPlugin(plugin: MDPlugin) {
    pluginsList.push(plugin);
}

export { addPlugin, pluginsList };