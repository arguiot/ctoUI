import { Direction } from "./Directions";
import { ViewType } from "./Views/View";

/**
 * Dictionary containing views that will be passed to the algorithm
 */
interface Options {
  [key: string]: ViewType;
}
/**
 * Configuation interface for the algorithm
 */
export interface Configuration {
  input: ViewType;
  output: ViewType;
  direction: Direction;
  options: Options;
}

/**
 * Dictionary containing view classes that will be created by the PluginUI
 */
interface OptionsInitiator {
  [key: string]: new (name: string) => ViewType;
}

/**
 * Configuation interface for the PluginUI class
 */
export interface ConfigurationInitiator {
  input: new (name: string) => ViewType;
  output: new (name: string) => ViewType;
  direction: Direction;
  options: OptionsInitiator;
  parent: HTMLElement;
}
