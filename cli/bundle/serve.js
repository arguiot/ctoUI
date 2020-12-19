import path from "path";
import Parcel from "parcel-bundler";
import fs from "fs"
import kleur from 'kleur';
const app = require('express')();

export default async function serve(entry = "index.js") {
    const entryFile = path.join(process.cwd(), entry)
    const options = {
        outDir: './dist', // The out directory to put the build files in, defaults to dist
        publicUrl: '/', // The url to serve on, defaults to '/'
        watch: true, // Whether to watch the files and rebuild them on change, defaults to process.env.NODE_ENV !== 'production'
        cache: true, // Enabled or disables caching, defaults to true
        contentHash: true, // Disable content hash from being included on the filename
        minify: false, // Minify files, enabled if process.env.NODE_ENV === 'production'
        target: 'browser', // Browser/node/electron, defaults to browser
        hmr: true, // Enable or disable HMR while watching
        sourceMaps: true, // Enable or disable sourcemaps, defaults to enabled (minified builds currently always create sourcemaps)
        autoInstall: true, // Enable or disable auto install of missing dependencies found during bundling
    }

    const bundler = new Parcel(entryFile, options);

    console.log(`${kleur.bold().white("Server listening:")} ${kleur.bold().cyan("http://localhost:1234/")}`)

    process.on("SIGINT", () => {
        console.log("Clean up...")
        
        fs.rmSync(path.join(process.cwd(), "dist"), { recursive: true, force: true });
        fs.rmSync(path.join(process.cwd(), ".cache"), { recursive: true, force: true });

        process.exit();
    })

    app.set('view engine', 'html');
    app.engine('html', require('hbs').__express);
    app.set('views', __dirname);

    app.use(bundler.middleware())

    app.get("/", (req, res) => {
        res.render("live")
    })

    app.listen(1234)
}