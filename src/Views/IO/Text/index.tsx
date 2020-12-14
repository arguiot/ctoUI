import { Configuration } from "../../../Configuration";
import { Placement, PlacementType } from "../../Placement";
import { View } from "../../View";

export class Text extends View {
  placement: PlacementType;

  constructor() {
    super();
    this.placement = Placement.Input;
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

    return element;
  }

  update(element: HTMLElement, state: Configuration) {
    element.querySelector("textarea")!.value = state.input.value;
  }

  get value() {
    return "";
  }
  set value(_val: any) {
    return;
  }
}
