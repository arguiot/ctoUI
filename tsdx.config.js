const postcss = require('rollup-plugin-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const url = require("@rollup/plugin-url");
module.exports = {
    rollup(config, options) {
        config.plugins = [
            url(),
            postcss({
                plugins: [
                    autoprefixer(),
                    cssnano({
                        preset: 'default',
                    }),
                ],
                inject: true,
                // only write out CSS for the first bundle (avoids pointless extra files):
                extract: !!options.writeMeta,
            }),
            ...config.plugins
        ]
        return config;
    },
};