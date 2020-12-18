import { JSDOM } from "jsdom";
import {
  Algorithm,
  PluginUI,
  Configuration,
  IO,
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
        input: IO.Text,
        direction: Direction.Both,
        output: IO.Text,
        parent: window.document.body,
    });

    plugin.render(window);

    expect(window.document.body.innerHTML).toMatchSnapshot();
  });
});
