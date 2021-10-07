import path from "path";
import Parcel from "@parcel/core";
import fs from "fs/promises"
import prependFile from "prepend-file"
import Handlebars from "handlebars"
import Table from 'cli-table';
import filesize from "filesize"
import kleur from "kleur"
import ora from "ora";

export default async function build(entry = "index.js") {
    const spinner = ora('Cleaning previous dist directory').start();

    await fs.rm(path.join(process.cwd(), "dist"), {
        recursive: true,
        force: true
    })

    spinner.text = 'Creating HTML fragment';

    const raw = await fs.readFile(path.join(__dirname, "build.html"))
    const file = raw.toString()
    const template = Handlebars.compile(file)

    const compiled = template({
        entry
    })
    await fs.writeFile(path.join(process.cwd(), "index.html"), compiled)
    
    const entryFile = path.join(process.cwd(), "index.html")
    const options = {
        entries: entryFile,
        distDir: path.join(process.cwd(), "dist"),
        defaultConfig: "@parcel/config-default",
        defaultEngines: {
            browsers: [">0.2%"],
        },
        patchConsole: false,
        sourceMaps: true,
        scopeHoist: true,
        autoinstall: true,
        logLevel: "warn",
        mode: "production",
        env: {
            NODE_ENV: 'production'
        }
    }
    spinner.text = 'Creating and optimizing bundle';

    const bundler = new Parcel(options);

    const build = await bundler.run();

    const bundle = build.bundleGraph
        .getBundles();

    bundle
    .filter(e => e.name.slice(-2) == "js")
    .forEach(async file => {
        await prependFile(file.filePath, "globalThis.require=()=>{throw new Error(\"Calls to `require` from umd module definitions are not supported\")};") // Fix Parcel scopehoist issue
    })

    await fs.rm(path.join(process.cwd(), "index.html"));

    spinner.succeed("Successfully created bundle")

    // Print build summary
    const table = new Table({
        head: ['File name', 'Size', 'Build duration']
    });

    function prettifyTime(timeInMs) {
        return timeInMs < 1000 ? `${timeInMs}ms` : `${(timeInMs / 1000).toFixed(2)}s`;
    }

    bundle
    .filter(e => e.name.slice(-4) != "html")
    .forEach(file => {
        const dir = path.relative(process.cwd(), path.dirname(file.filePath));
        const { size, time } = file.stats
        table.push([
            (kleur.dim(dir + (dir ? path.sep : '')) + kleur.reset(path.basename(file.filePath))),
            kleur.bold().yellow(filesize(size)),
            kleur.white(prettifyTime(time))
        ])
    })
    spinner.info("Bundle size: \n" + table.toString())

    // Create config file
    const config = {
        name: "cto ui plugin",
        styles: bundle.filter(e => e.name.slice(-3).toLowerCase() == "css").map(file => path.relative(process.cwd() + "/dist", file.filePath)),
        scripts: bundle.filter(e => e.name.slice(-2).toLowerCase() == "js").map(file => path.relative(process.cwd() + "/dist", file.filePath)),
        html: "index.html"
    }

    await fs.writeFile(path.join(process.cwd(), "dist/cto.config.json"), JSON.stringify(config, null, "\t"))
}