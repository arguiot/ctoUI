import { Direction } from "../../../Directions";
import { Placement, PlacementType } from "../../Placement";
import { View } from "../../View";
import { Notification, NotificationCenter } from "@arguiot/broadcast.js";
import { Configuration } from "../../../Configuration";

export class Text extends View {
  placement: PlacementType;
  element?: HTMLElement;

  constructor(name: string) {
    super(name);
    this.placement = Placement.Input;
  }

  render(parent: HTMLElement) {
    this.element = parent
    const element = (
      <div className="form-group mt-3">
        <label>Label</label>
        <textarea
          spellCheck="false"
          rows={4}
          className="form-control"
          onInput={() => {
            this.requestUpdate()
          }}
        >
          Input
        </textarea>
        <span id="field-len" className="float-right length-label"></span>
      </div>
    );

    return element;
  }

  update(_state: Configuration) {
    if (this.element) {
      this.element.querySelector("#field-len")!.innerHTML = `length: ${this.value.length}`
    }
  }

  requestUpdate() {
		const request = new Notification("requestRender", this.name == "input" ? Direction.InputToOutput : Direction.OutputToInput)
		NotificationCenter.default.post(request)
	}

  get value() {
    return this.element?.querySelector("textarea")!.value;
  }
  set value(val: any) {
    if (this.element) {
      this.element.querySelector("textarea")!.value = val
    }
  }
}
