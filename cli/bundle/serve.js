import path from "path";
import Parcel from "parcel-bundler";
import fs from "fs"

export default async function serve(entry = "index.html") {
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

    process.on("SIGINT", () => {
        console.log("Clean up...")
        
        fs.rmdirSync(path.join(process.cwd(), "dist"), { recursive: true });
        fs.rmdirSync(path.join(process.cwd(), ".cache"), { recursive: true });

        process.exit();
    })

    await bundler.serve();
}