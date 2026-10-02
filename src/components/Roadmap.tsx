import Link from "next/link";
import type { Chapter, Track } from "@/core/content/schema";
import { getChapter } from "@/content";

export function Roadmap({ chapter, track }: { chapter: Chapter; track: Track }) {
  const prereqs = chapter.prerequisites.map(getChapter).filter((c): c is Chapter => !!c);
  const backfill = chapter.backfill.filter((b) => b.tracks.includes(track));
  if (!prereqs.length && !backfill.length) return null;
  return (
    <aside className="roadmap" aria-labelledby="roadmap-h">
      <h2 id="roadmap-h">Before you start</h2>
      {prereqs.length > 0 && (
        <ul>{prereqs.map((p) => <li key={p.id}><Link href={`/course/${p.id}`}>{p.title}</Link></li>)}</ul>
      )}
      {backfill.map((b) => (
        <p key={b.topic}><strong>{b.topic}.</strong> {b.why}</p>
      ))}
    </aside>
  );
}
