import { Configuration } from "../../../Configuration";
import { Placement, PlacementType } from "../../Placement";
import { View, render } from "../../View";

export class Text implements View {
  bindings: Configuration;
  placement: PlacementType;
  element: HTMLElement;

  constructor(bindings: Configuration, element: HTMLElement) {
    this.bindings = bindings;
    this.placement = Placement.Input;
    this.element = element;
  }

  render() {
    const element = (
      <div className="form-group mt-3">
        <label>Label</label>
        <textarea
          spellCheck="false"
          rows={4}
          className="form-control"
          id="input"
        >
          Input
        </textarea>
        <span id="input-len" className="float-right length-label"></span>
      </div>
    );

    render(element, this.element);
  }

  get value() {
    return "";
  }
  set value(_val: any) {
    return;
  }
}
