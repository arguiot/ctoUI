import { Configuration, ConfigurationInitiator } from "./Configuration";
import { Algorithm } from "./Algorithm";
import { render, ViewType } from "./Views/View";
import { NotificationCenter } from "@arguiot/broadcast.js";
import { Direction } from "./Directions";
import { DirectionView } from "./Views/DirectionView";

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
    this.direction = Direction.InputToOutput;

    NotificationCenter.default.addObserver(
      "requestRender",
      this.dispatchUpdate.bind(this)
    );
  }

  configure(config: ConfigurationInitiator) {
    this.directionView = new DirectionView("direction")
    return {
      input: new config.input("input"),
      output: new config.output("output"),
      direction: config.direction,
      options: Object.fromEntries(
        Object.entries(config.options).map(entry => {
          const view = new entry[1](entry[0]);
          return [entry[0], view];
        })
      ),
    };
  }

  directionView?: ViewType;

  render(windowObject: any) {
    const views = [
      ["input", this.configuration.input],
      ["direction", this.directionView!],
      ["output", this.configuration.output],
      ...Object.entries(this.configuration.options),
    ];
    views.forEach(view => {
      let doc: Document;
      if (__DEV__ && typeof window != "undefined") {
        doc = windowObject.document;
      } else {
        doc = window.document;
      }
      const container = doc.createElement("div");
      container.className = view[0] as string;
      this.parent.appendChild(container);

      const element = (view[1] as ViewType).render(container);
      render(element, container, view[1] as ViewType);
    });

    this.dispatchUpdate(); // Hydration
  }

  direction: Direction;

  dispatchUpdate(from?: Direction) {
    if (from) {
      this.direction = from;
    }

    switch (this.direction) {
      case Direction.InputToOutput:
        this.algorithm.encode();
        break;
      case Direction.OutputToInput:
        if (this.algorithm.decode) {
          this.algorithm.decode();
        }
        break;
    }

    const views = [
      this.configuration.input,
      this.directionView!,
      this.configuration.output,
      ...Object.values(this.configuration.options),
    ];

    views.forEach(view => {
      if (view.update) {
        view.update({
          currentDirection: this.direction,
          ...this.configuration
        });
      }
    });
  }
}
