import { Configuration } from "./Configuration";
import { Algorithm } from "./Algorithm";

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
   * Initiate the plugin
   * @param config Configuration for the plugin. The configuration defines the views and he layout of the plugin.
   */
  constructor(algorithm: Algorithm, config: Configuration) {
    this.configuration = config;
    this.algorithm = algorithm;
  }
}
