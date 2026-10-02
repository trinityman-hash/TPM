import type { Block } from "@/core/content/schema";
import { VtAreaWidget } from "./VtAreaWidget";

const widgets = { "vt-area": VtAreaWidget } as const;

/** Content is rendered as React text nodes only: no raw HTML, so authored content cannot inject markup. */
export function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "text":
      return <section>{block.heading && <h2>{block.heading}</h2>}<p>{block.body}</p></section>;
    case "interactive": {
      const W = widgets[block.widget];
      return <section><W /><p className="caption">{block.caption}</p></section>;
    }
    case "trap":
      return (
        <section className="callout trap">
          <h3>⚠ Common trap: {block.title}</h3><p>{block.body}</p>
          {block.review === "draft" && <small>Awaiting teacher review</small>}
        </section>
      );
    case "teacher-note":
      return (
        <section className="callout note">
          <h3>Teacher&apos;s note</h3><p>{block.body}</p>
          {block.review === "draft" && <small>Awaiting teacher review</small>}
        </section>
      );
  }
}
