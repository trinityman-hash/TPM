import { describe, expect, it } from "vitest";
import { displacement, distance, velocityAt } from "./kinematics";

describe("kinematics", () => {
  it("v = u + at", () => expect(velocityAt(10, -5, 4)).toBe(-10));
  it("thrown up and back: displacement 0, distance 20", () => {
    expect(displacement(10, -5, 4)).toBe(0);
    expect(distance(10, -5, 4)).toBe(20);
  });
  it("no reversal: distance equals |displacement|", () => expect(distance(2, 3, 4)).toBe(32));
  it("a = 0 is uniform motion", () => expect(distance(-3, 0, 5)).toBe(15));
  it("reversal after the window ends is ignored", () => expect(distance(10, -5, 1)).toBe(7.5));
});
