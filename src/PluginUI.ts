import { Configuration, ConfigurationInitiator } from "./Configuration";
import { Algorithm } from "./Algorithm";
import { render, View } from "./Views/View";

/**
 * Creates and manages the plugin lifecycle
 */

export class PluginUI {
  /**
   * Configuration for the plugin. The configuration defines the views and he layout of the plugin.
   */
  configuration: Configuration;
  /**
   * The cipher algorithm object
   */
  algorithm: Algorithm;
  /**
   * Where the plugin will be rendered
   */
  parent: HTMLElement;

  /**
   * Initiate the plugin
   * @param config Configuration for the plugin. The configuration defines the views and he layout of the plugin.
   */
  constructor(
    algorithm: new (bindings: Configuration) => Algorithm,
    config: ConfigurationInitiator
  ) {
    this.configuration = this.configure(config);
    this.algorithm = new algorithm(this.configuration);
    this.parent = config.parent;
  }

  configure(config: ConfigurationInitiator) {
    return {
      input: new config.input(),
      output: new config.output(),
      direction: config.direction,
      options: Object.fromEntries(
        Object.entries(config.options).map(entry => {
          const view = new entry[1]();
          return [entry[0], view];
        })
      ),
    };
  }

  render(windowObject: any) {
    ["input", "output"].forEach(key => {
      let doc: Document;
      if (__DEV__ && typeof window != "undefined") {
        doc = windowObject.document;
      } else {
        doc = window.document;
      }
      const container = doc.createElement("div");
      container.className = key;
      this.parent.appendChild(container);

      interface Indexable<T = any> {
        [key: string]: T;
      }

      const config = (this.configuration as unknown) as Indexable<View>;
      const element = config[key].render();
      if (typeof element != "undefined") {
        render((element as unknown) as JSX.Element, container);
      }
    });
  }
}
