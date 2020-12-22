import { DirectionList } from "../../../Direction/DirectionList";
import { View } from "../../View";
import { Configuration } from "../../../Configuration";

export class Text extends View {
  element?: HTMLElement;

  constructor(name: string) {
    super(name);
  }

  render(parent: HTMLElement) {
    this.element = parent;
    const element = (
      <div className="form-group mt-3">
        <label>Label</label>
        <textarea
          spellCheck="false"
          rows={4}
          className="form-control"
          onInput={() => {
            this.requestUpdate(this.name == "input" ? DirectionList.InputToOutput : DirectionList.OutputToInput);
          }}
        >
          Input
        </textarea>
        <span id="field-len" className="float-end length-label"></span>
      </div>
    );

    return element;
  }

  update(_state: Configuration) {
    if (this.element) {
      this.element.querySelector(
        "#field-len"
      )!.innerHTML = `length: ${this.value.length}`;
    }
  }

  get value() {
    return this.element?.querySelector("textarea")!.value;
  }
  set value(val: any) {
    if (this.element) {
      this.element.querySelector("textarea")!.value = val;
    }
  }
}
