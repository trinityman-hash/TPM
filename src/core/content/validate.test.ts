import { describe, expect, it } from "vitest";
import { chapters } from "@/content";
import { validateChapters } from "./validate";

const base = { subject: "physics", classLevel: 11, title: "T", backfill: [], blocks: [{ type: "text", tracks: ["board"], body: "x" }] };

describe("content validation", () => {
  it("all real chapters are valid", () => expect(chapters.length).toBeGreaterThan(0));
  it("rejects unknown prerequisite", () =>
    expect(() => validateChapters([{ ...base, id: "a", prerequisites: ["zzz"] }])).toThrow(/unknown prerequisite/));
  it("rejects cycles", () =>
    expect(() => validateChapters([{ ...base, id: "a", prerequisites: ["b"] }, { ...base, id: "b", prerequisites: ["a"] }])).toThrow(/cycle/));
  it("rejects duplicate ids", () =>
    expect(() => validateChapters([{ ...base, id: "a", prerequisites: [] }, { ...base, id: "a", prerequisites: [] }])).toThrow(/Duplicate/));
  it("rejects a block with no track", () =>
    expect(() => validateChapters([{ ...base, id: "a", prerequisites: [], blocks: [{ type: "text", tracks: [], body: "x" }] }])).toThrow());
});
