import { Placement } from "./Placement";
/**
 * View protocol.
 *
 * A View is object that translates into an HTML element, and manages its lifecycle.
 */
export default interface View {
  placement: Placement;
  render(): void;
  value: any;
  bindings: any;
  element: HTMLElement;
}
