import { ChapterSchema, type Chapter, type Track } from "./schema";

/** Parses every chapter and checks the prerequisite graph. Throws on any content error. */
export function validateChapters(raw: unknown[]): Chapter[] {
  const chapters = raw.map((c) => ChapterSchema.parse(c));
  const ids = new Set<string>();
  for (const c of chapters) {
    if (ids.has(c.id)) throw new Error(`Duplicate chapter id: ${c.id}`);
    ids.add(c.id);
  }
  const byId = new Map(chapters.map((c) => [c.id, c]));
  for (const c of chapters)
    for (const p of c.prerequisites)
      if (!byId.has(p)) throw new Error(`${c.id}: unknown prerequisite "${p}"`);

  const state = new Map<string, 1 | 2>(); // 1 = visiting, 2 = done
  const visit = (id: string, path: string[]): void => {
    if (state.get(id) === 2) return;
    if (state.get(id) === 1) throw new Error(`Prerequisite cycle: ${[...path, id].join(" -> ")}`);
    state.set(id, 1);
    for (const p of byId.get(id)!.prerequisites) visit(p, [...path, id]);
    state.set(id, 2);
  };
  for (const c of chapters) visit(c.id, []);
  return chapters;
}

export function blocksForTrack(chapter: Chapter, track: Track) {
  return chapter.blocks.filter((b) => b.tracks.includes(track));
}
