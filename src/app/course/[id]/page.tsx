import Link from "next/link";
import { notFound } from "next/navigation";
import { BlockView } from "@/components/BlockView";
import { Roadmap } from "@/components/Roadmap";
import { chapters, getChapter } from "@/content";
import { blocksForTrack } from "@/core/content/validate";
import { TrackSchema } from "@/core/content/schema";

export const generateStaticParams = () => chapters.map((c) => ({ id: c.id }));

export default async function ChapterPage({ params, searchParams }: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ track?: string }>;
}) {
  const { id } = await params;
  const chapter = getChapter(id);
  if (!chapter) notFound();
  // Untrusted input: fall back to "board" on anything that is not a valid track.
  const parsed = TrackSchema.safeParse((await searchParams).track);
  const track = parsed.success ? parsed.data : "board";

  return (
    <>
      <p><Link href="/">← All chapters</Link></p>
      <h1>{chapter.title}</h1>
      <nav aria-label="Track" className="tabs">
        {(["board", "jee"] as const).map((t) => (
          <Link key={t} href={`?track=${t}`} aria-current={t === track ? "page" : undefined}>
            {t === "board" ? "Board" : "JEE"}
          </Link>
        ))}
      </nav>
      <Roadmap chapter={chapter} track={track} />
      {blocksForTrack(chapter, track).map((b, i) => <BlockView key={i} block={b} />)}
    </>
  );
}
