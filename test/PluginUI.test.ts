import { JSDOM } from "jsdom";
import {
  Algorithm,
  PluginUI,
  Configuration,
  Text,
  Direction,
} from "../dist/index";

describe("Render Input", () => {
  it("should render Input", () => {
    class Algo implements Algorithm {
      bindings: Configuration;
      constructor(bindings: Configuration) {
        this.bindings = bindings;
      }
      encode() {
        return;
      }
    }
    const { window } = new JSDOM();

    const plugin = new PluginUI(Algo, {
      input: Text,
      output: Text,
      direction: Direction.Unidirectional,
      options: {},
      parent: window.document.body,
    });

    plugin.render(window);

    expect(window.document.body.innerHTML).toBe(
      '<div class="input"><div class="form-group mt-3"><label>Label</label><textarea rows="4" class="form-control" id="input">Input</textarea><span id="input-len" class="float-right length-label"></span></div></div><div class="output"><div class="form-group mt-3"><label>Label</label><textarea rows="4" class="form-control" id="input">Input</textarea><span id="input-len" class="float-right length-label"></span></div></div>'
    );
  });
});
