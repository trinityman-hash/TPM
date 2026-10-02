import Link from "next/link";
import { chapters } from "@/content";

export default function Home() {
  return (
    <>
      <h1>TPM</h1>
      <p>Class 11 · Board and JEE tracks</p>
      <ul className="list">
        {chapters.map((c) => (
          <li key={c.id}><Link href={`/course/${c.id}`}>{c.title}</Link> <small>{c.subject} · Class {c.classLevel}</small></li>
        ))}
      </ul>
    </>
  );
}
