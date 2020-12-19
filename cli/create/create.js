const prompts = require('prompts');

export default async function createPlugin() {
    const response = await prompts([
        {
            type: "text",
            name: "name", // Plugin Name
            message: "How do you want to name your plugin?"
        }
    ])
}
