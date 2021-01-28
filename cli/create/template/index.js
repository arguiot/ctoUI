import { PluginUI } from "@cryptool/cto-ui";

// Your algorithm. Can act as a controller for more complex plugins
class Algorithm {
    constructor(bindings) {
        this.bindings = bindings;
    }

    encode() {
        // Create encode method
    }
}

const plugin = new PluginUI(Algorithm, {
    // Describe your UI here

    // By default, leave this.
    parent: window.document.querySelector(".plugin"),
})

// Loads translations. Make sure to leave that here, even when you don't need to translate anything
plugin.loadTranslations({}, window)
// Renders the final UI!
plugin.render(window)