import prompts from 'prompts';
import path from "path";
import fse from "fs-extra"

export default async function createPlugin() {
    const response = await prompts([
        {
            type: "text",
            name: "name", // Plugin Name
            message: "How do you want to name your plugin?"
        }
    ])

    const folder = path.join(__dirname, "template")

    await fse.copy(folder, path.join(process.cwd(), response.name))
}
