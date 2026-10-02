/** 1-D motion with constant acceleration. SI units, signed quantities. */

export const velocityAt = (u: number, a: number, t: number) => u + a * t;

/** Signed displacement: s = ut + at²/2 (equals the signed area under the v-t graph). */
export const displacement = (u: number, a: number, t: number) => u * t + 0.5 * a * t * t;

/** Total path length. Differs from |displacement| when velocity reverses within [0, t]. */
export function distance(u: number, a: number, t: number): number {
  if (a !== 0) {
    const turn = -u / a; // instant when v = 0
    if (turn > 0 && turn < t) {
      const s1 = displacement(u, a, turn);
      return Math.abs(s1) + Math.abs(displacement(u, a, t) - s1);
    }
  }
  return Math.abs(displacement(u, a, t));
}
