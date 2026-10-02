import { validateChapters } from "@/core/content/validate";
import { motionInAStraightLine } from "./physics/motion-in-a-straight-line";

/** Single registry. Validated once at load; a bad chapter fails the build, not the student. */
export const chapters = validateChapters([motionInAStraightLine]);
export const getChapter = (id: string) => chapters.find((c) => c.id === id);
