"use client";

import { useEffect, useRef, useCallback } from "react";

export default function CustomCursor() {
  const moonRef = useRef<HTMLDivElement>(null);

  const onMove = useCallback((e: MouseEvent) => {
    if (moonRef.current) {
      moonRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    }
  }, []);

  const onEnter = useCallback(() => {
    moonRef.current?.classList.add("is-hovering");
  }, []);

  const onLeave = useCallback(() => {
    moonRef.current?.classList.remove("is-hovering");
  }, []);

  useEffect(() => {
    document.addEventListener("mousemove", onMove);

    const addListeners = () => {
      document
        .querySelectorAll("a, button, [data-cursor-hover]")
        .forEach((el) => {
          el.addEventListener("mouseenter", onEnter);
          el.addEventListener("mouseleave", onLeave);
        });
    };

    addListeners();

    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", onMove);
      observer.disconnect();
    };
  }, [onMove, onEnter, onLeave]);

  return (
    <div ref={moonRef} className="cursor-moon" aria-hidden="true">
      <BatCursorSVG />
    </div>
  );
}

function BatCursorSVG() {
  return (
    <svg
      className="cursor-bat"
      viewBox="0 0 60 38"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Wings */}
      <path d="M30 18 L20 12 L6 14 L0 10 L2 20 L12 18 L22 26 L26 34 L30 36 L34 34 L38 26 L48 18 L58 20 L60 10 L54 14 L40 12 Z" />
      {/* Ears */}
      <polygon points="22,12 26,2 30,12" />
      <polygon points="38,12 34,2 30,12" />
    </svg>
  );
}
