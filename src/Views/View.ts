import { Configuration } from "../Configuration";
import { Placement, PlacementType } from "./Placement";
import { NotificationCenter } from "@arguiot/broadcast.js";

/**
 * View protocol.
 *
 * A View is object that translates into an HTML element, and manages its lifecycle.
 */
export interface ViewType {
  placement: PlacementType;
  render(): JSX.Element | void;
  update(element: HTMLElement, state: Configuration): void;
  value: any;
}

export class View implements ViewType {
  placement: PlacementType;

  constructor() {
    NotificationCenter.default.addObserver(
      "render",
      this.render.bind(this),
      `${NotificationCenter.default.observers.length}`
    );

    this.placement = Placement.Option();
  }

  render() {}
  update(_element: HTMLElement, _state: Configuration) {}

  get value() {
    return null;
  }
  set value(_val: any) {}
}

/**
 * Renders JSX without React
 * @param element Any JSX element
 * @param container The HTML element you want to render your component in
 */
export function render(element: JSX.Element, container: HTMLElement) {
  const dom = container.ownerDocument.createElement(element.type);
  const isProperty = (key: any) => key !== "children";
  Object.keys(element.props)
    .filter(isProperty)
    .forEach(name => {
      dom[name] = element.props[name];
    });

  if (Array.isArray(element.props.children)) {
    element.props.children.forEach((child: JSX.Element) => render(child, dom));
  } else if (typeof element.props.children == "string") {
    (dom as HTMLElement).innerHTML = element.props.children;
  }
  container.appendChild(dom);
}
