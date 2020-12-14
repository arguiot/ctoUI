import { Placement } from "../src";

describe("Configuration", () => {
  it("should lowercase option tabs", () => {
    expect(Placement.Option("Alphabet")).toBe("alphabet");
  });
});
