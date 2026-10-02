import { z } from "zod";

/** board = CBSE/NCERT board exam; jee = JEE Main/Advanced. Blocks declare which tracks they serve. */
export const TrackSchema = z.enum(["board", "jee"]);
export type Track = z.infer<typeof TrackSchema>;

const tracks = z.array(TrackSchema).min(1);
/** Teacher-experience content must be signed off by a human teacher before it is shown as final. */
const review = z.enum(["draft", "teacher-reviewed"]);

export const BlockSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("text"), tracks, heading: z.string().optional(), body: z.string() }),
  z.object({ type: z.literal("interactive"), tracks, widget: z.enum(["vt-area"]), caption: z.string() }),
  z.object({ type: z.literal("trap"), tracks, title: z.string(), body: z.string(), review }),
  z.object({ type: z.literal("teacher-note"), tracks, body: z.string(), review }),
]);
export type Block = z.infer<typeof BlockSchema>;

export const ChapterSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  subject: z.enum(["physics", "chemistry", "maths"]),
  classLevel: z.union([z.literal(11), z.literal(12)]),
  title: z.string(),
  /** Chapters that must be understood first. Used for the roadmap. */
  prerequisites: z.array(z.string()),
  /** "Needs a little backing" notes: what to revise and why, before starting this chapter. */
  backfill: z.array(z.object({ tracks, topic: z.string(), why: z.string() })),
  blocks: z.array(BlockSchema).min(1),
});
export type Chapter = z.infer<typeof ChapterSchema>;
