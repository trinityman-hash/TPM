# TPM

Interactive Class 11/12 Physics, Chemistry and Maths for **Board** and **JEE**, as two tracks over shared content.

## Run
    npm install && npm run dev      # http://localhost:3000
    npm test && npm run typecheck && npm run build

## Add a chapter
1. Create `src/content/<subject>/<id>.ts` exporting a `Chapter` (see `src/core/content/schema.ts`).
2. Register it in `src/content/index.ts`. Unknown prerequisites, cycles, duplicate ids and malformed blocks fail the build.
3. Mark every `trap` / `teacher-note` as `review: "draft"` until a teacher signs it off.

## Rules
- Content renders as text only (no raw HTML).
- Syllabus facts must come from the current NCERT/CBSE documents (Board) and the official JEE Advanced brochure (JEE).
