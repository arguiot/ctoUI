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

    expect(window.document.body.innerHTML).toMatchSnapshot()
  });
});
