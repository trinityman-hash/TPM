"use client";
import { useId, useState } from "react";
import { displacement, distance, velocityAt } from "@/core/physics/kinematics";

const W = 320, H = 180, PAD = 28;

function Slider({ label, min, max, step, value, onChange }: {
  label: string; min: number; max: number; step: number; value: number; onChange: (v: number) => void;
}) {
  const id = useId();
  return (
    <label htmlFor={id} className="slider">
      <span>{label} = {value}</span>
      <input id={id} type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))} />
    </label>
  );
}

export function VtAreaWidget() {
  const [u, setU] = useState(10);
  const [a, setA] = useState(-5);
  const [t, setT] = useState(4);

  const v1 = velocityAt(u, a, t);
  const vMax = Math.max(1, Math.abs(u), Math.abs(v1));
  const sx = (x: number) => PAD + (x / 10) * (W - 2 * PAD);
  const sy = (v: number) => H / 2 - (v / vMax) * (H / 2 - PAD / 2);
  const area = `${sx(0)},${sy(0)} ${sx(0)},${sy(u)} ${sx(t)},${sy(v1)} ${sx(t)},${sy(0)}`;
  const s = displacement(u, a, t);
  const d = distance(u, a, t);
  const reversed = Math.abs(d - Math.abs(s)) > 1e-9;

  return (
    <figure className="widget">
      <svg viewBox={`0 0 ${W} ${H}`} role="img"
        aria-label={`Velocity-time graph. Velocity goes from ${u} to ${v1} metres per second over ${t} seconds.`}>
        <line x1={PAD} y1={sy(0)} x2={W - PAD / 2} y2={sy(0)} stroke="currentColor" opacity=".5" />
        <line x1={PAD} y1={PAD / 2} x2={PAD} y2={H - PAD / 2} stroke="currentColor" opacity=".5" />
        <polygon points={area} fill="var(--accent)" opacity=".25" />
        <line x1={sx(0)} y1={sy(u)} x2={sx(t)} y2={sy(v1)} stroke="var(--accent)" strokeWidth="2.5" />
        <text x={W - PAD / 2} y={sy(0) - 4} fontSize="10" textAnchor="end" fill="currentColor">t (s)</text>
        <text x={PAD + 4} y={PAD / 2 + 8} fontSize="10" fill="currentColor">v (m/s)</text>
      </svg>
      <div className="controls">
        <Slider label="u (m/s)" min={-20} max={20} step={1} value={u} onChange={setU} />
        <Slider label="a (m/s²)" min={-10} max={10} step={1} value={a} onChange={setA} />
        <Slider label="t (s)" min={0} max={10} step={1} value={t} onChange={setT} />
      </div>
      <p aria-live="polite" className="readout">
        v = {v1} m/s &nbsp;|&nbsp; displacement = {s} m &nbsp;|&nbsp; distance = {d} m
        {reversed && <strong> — direction reversed, so distance ≠ |displacement|</strong>}
      </p>
    </figure>
  );
}
