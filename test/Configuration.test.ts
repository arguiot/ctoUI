import { Placement } from "../dist/index";

describe("Configuration", () => {
  it("should lowercase option tabs", () => {
    expect(Placement.Option("Alphabet")).toBe("alphabet");
  });
});
