import Direction from "./Directions";
import View from "./Views/View";

/**
 * Dictionary containing views that will be passed to the algorithm
 */
interface Options {
  [key: string]: View;
}
/**
 * Configuation interface for the PluginUI class
 */
export interface Configuration {
  input: View;
  output: View;
  direction: Direction;
  options: Options;
}
