import { describe, expect, it } from "vitest";

let testfunc = function () {
  return true;
};

describe("ello world", () => {
  it("to pass", () => {
    expect(testfunc()).toBe(true)
  });
});