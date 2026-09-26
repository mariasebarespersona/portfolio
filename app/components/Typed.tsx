"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

/** She works in three languages. The greeting is where that shows up, instead
 *  of being a bullet in an about page nobody opens. */
const LINES = ["Hi, this is María", "Hola, soy María", "Bonjour, c'est María"];

const TYPE = 58;
const ERASE = 26;
const HOLD = 2100;
const SWITCH = 260;

type State = { i: number; n: number; erasing: boolean };

export default function Typed({ onFirstLine }: { onFirstLine?: () => void }) {
  const reduce = useReducedMotion();
  const [s, setS] = useState<State>({ i: 0, n: 0, erasing: false });
  const announced = useRef(false);

  // The page arrives in two beats: the line lands first, everything else
  // follows. With reduced motion there is no first beat to wait for.
  useEffect(() => {
    if (announced.current) return;
    if (reduce || (s.i === 0 && !s.erasing && s.n === LINES[0].length)) {
      announced.current = true;
      const t = setTimeout(() => onFirstLine?.(), reduce ? 0 : 340);
      return () => clearTimeout(t);
    }
  }, [s, reduce, onFirstLine]);

  useEffect(() => {
    if (reduce) return;
    const full = LINES[s.i];
    const atEnd = !s.erasing && s.n === full.length;
    const atStart = s.erasing && s.n === 0;
    const delay = atEnd ? HOLD : atStart ? SWITCH : s.erasing ? ERASE : TYPE;

    // Every transition happens in the timeout callback, never in the effect
    // body, so there is no synchronous setState and no cascading render.
    const t = setTimeout(() => {
      setS((p) => {
        const line = LINES[p.i];
        if (!p.erasing && p.n === line.length) return { ...p, erasing: true };
        if (p.erasing && p.n === 0)
          return { i: (p.i + 1) % LINES.length, n: 0, erasing: false };
        return { ...p, n: p.n + (p.erasing ? -1 : 1) };
      });
    }, delay);
    return () => clearTimeout(t);
  }, [s, reduce]);

  // The name is always in the accessibility tree as one stable string; the
  // animated copy is decorative, so a screen reader never hears it retyped.
  return (
    <h1 className="display relative text-[clamp(30px,7.4vw,60px)] leading-[1.05] text-[color:var(--title)]">
      <span className="sr-only">Hi, this is María</span>
      <span aria-hidden className="inline-flex items-baseline">
        {reduce ? LINES[0] : LINES[s.i].slice(0, s.n)}
        <span className="caret ml-[0.09em] inline-block h-[0.82em] w-[0.055em] translate-y-[0.02em] rounded-[1px] bg-[color:var(--accent)]" />
      </span>
    </h1>
  );
}
