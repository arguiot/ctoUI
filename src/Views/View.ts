import { Configuration } from "../Configuration";
import { PlacementType } from "./Placement";
/**
 * View protocol.
 *
 * A View is object that translates into an HTML element, and manages its lifecycle.
 */
export interface View {
  placement: PlacementType;
  render(): void;
  value: any;
  bindings: Configuration;
  element: HTMLElement;
}

export { Text } from "./IO/Text";

/**
 * Renders JSX without React
 * @param element Any JSX element
 * @param container The HTML element you want to render your component in
 */
export function render(element: JSX.Element, container: HTMLElement) {
  const dom =
    element.type === "TEXT_ELEMENT"
      ? container.ownerDocument.createTextNode("")
      : container.ownerDocument.createElement(element.type);
  const isProperty = (key: any) => key !== "children";
  Object.keys(element.props)
    .filter(isProperty)
    .forEach(name => {
      dom[name] = element.props[name];
    });
  element.props.children.forEach((child: JSX.Element) => render(child, dom));
  container.appendChild(dom);
}
