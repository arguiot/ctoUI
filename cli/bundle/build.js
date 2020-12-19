import path from "path";
import Parcel from "@parcel/core";
import fs from "fs"
import prependFile from "prepend-file"
export default async function build(entry = "index.js") {
    fs.rmSync(path.join(process.cwd(), "dist"), {
        recursive: true,
        force: true
    });

    process.env.NODE_ENV = "production"

    fs.copyFileSync(path.join(__dirname, "build.html"), path.join(process.cwd(), "index.html"))

    const entryFile = path.join(process.cwd(), "index.html")
    const options = {
        entries: entryFile,
        distDir: path.join(process.cwd(), "dist"),
        defaultConfig: require.resolve("@parcel/config-default"),
        defaultEngines: {
            browsers: [">0.2%"],
        },
        patchConsole: false,
        sourceMaps: true,
        scopeHoist: true,
        autoinstall: true,
        mode: "production"
    }

    const bundler = new Parcel(options);
    
    const build = await bundler.run();

    build.bundleGraph
    .getBundles()
    .filter(e => e.name.slice(-2) == "js")
    .forEach(async file => {
        await prependFile(file.filePath, "globalThis.require=()=>{throw new Error(\"Calls to `require` from umd module definitions are not supported\")};") // Fix Parcel scopehoist issue
    })

    fs.rmSync(path.join(process.cwd(), "index.html"));
}