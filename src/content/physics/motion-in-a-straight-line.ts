import type { Chapter } from "@/core/content/schema";

// All trap / teacher-note blocks are "draft" until a teacher signs them off.
export const motionInAStraightLine: Chapter = {
  id: "motion-in-a-straight-line",
  subject: "physics",
  classLevel: 11,
  title: "Motion in a Straight Line",
  prerequisites: [],
  backfill: [
    { tracks: ["board", "jee"], topic: "Slope of a line and area under a graph", why: "Every v-t and x-t graph question reduces to slope = rate of change, area = accumulated change." },
    { tracks: ["jee"], topic: "Basic differentiation and integration (JEE track)", why: "Variable acceleration needs v = dx/dt and a = dv/dt; start the Maths calculus chapters in parallel." },
  ],
  blocks: [
    { type: "text", tracks: ["board", "jee"], heading: "Position, path length, displacement",
      body: "Position is measured from a chosen origin along a chosen positive direction. Path length (distance) is the total length travelled and is never negative. Displacement is the change in position, final minus initial, and can be positive, negative or zero." },
    { type: "trap", tracks: ["board", "jee"], review: "draft", title: "Distance is not |displacement|",
      body: "They are equal only if the object never reverses direction. A ball thrown up and caught at the same height has displacement 0 but a non-zero distance. Try it in the simulator below: u = 10, a = −5, t = 4." },
    { type: "interactive", tracks: ["board", "jee"], widget: "vt-area",
      caption: "Change u, a and t. The shaded area under the v-t graph (signed) is the displacement. Watch distance separate from displacement once v crosses zero." },
    { type: "text", tracks: ["board"], heading: "Equations of motion (constant acceleration)",
      body: "Derive all three from the v-t graph. Slope of the graph gives a, so v = u + at. The area under the graph (a trapezium) gives s = ut + ½at². Eliminating t gives v² = u² + 2as. Board answers are expected to show the graph, the construction and each step." },
    { type: "text", tracks: ["jee"], heading: "Variable acceleration",
      body: "Use definitions, not the three equations: v = dx/dt, a = dv/dt = v·dv/dx. If a is a function of t, integrate over t. If a is a function of x, use a = v·dv/dx and integrate over x. The three equations of motion are invalid here." },
    { type: "trap", tracks: ["board", "jee"], review: "draft", title: "The three equations need constant acceleration",
      body: "Check that a is constant before using them. Also fix a sign convention first (usually upward positive). At the highest point of a throw, v = 0 but a is still −g, not zero." },
    { type: "trap", tracks: ["jee"], review: "draft", title: "Average speed is not the mean of two speeds",
      body: "Average speed = total distance / total time. If equal distances are covered at v₁ and v₂, the average is the harmonic mean 2v₁v₂/(v₁+v₂), not (v₁+v₂)/2. The simple mean holds only for equal time intervals." },
    { type: "teacher-note", tracks: ["board", "jee"], review: "draft",
      body: "Before substituting numbers, write the sign convention, list u, v, a, s, t with signs, and name the formula. Most lost marks in numericals come from sign slips, not from wrong physics." },
  ],
};
