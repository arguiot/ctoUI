import path from "path";
import Parcel from "parcel-bundler";

export default async function build(entry = "index.html") {
    
    process.env.NODE_ENV = "production"

    const entryFile = path.join(process.cwd(), entry)
    const options = {
        outDir: './dist', // The out directory to put the build files in, defaults to dist
        outFile: 'fragment.html', // The name of the outputFile
        watch: false, // Whether to watch the files and rebuild them on change, defaults to process.env.NODE_ENV !== 'production'
        cache: false, // Enabled or disables caching, defaults to true
        contentHash: false, // Disable content hash from being included on the filename
        minify: true, // Minify files, enabled if process.env.NODE_ENV === 'production'
        scopeHoist: true, // Turn on experimental scope hoisting/tree shaking flag, for smaller production bundles
        target: 'browser', // Browser/node/electron, defaults to browser
        sourceMaps: true, // Enable or disable sourcemaps, defaults to enabled (minified builds currently always create sourcemaps)
        detailedReport: true, // Prints a detailed report of the bundles, assets, filesizes and times, defaults to false, reports are only printed if watch is disabled
        autoInstall: true, // Enable or disable auto install of missing dependencies found during bundling
    }

    const bundler = new Parcel(entryFile, options);

    await bundler.bundle();
}