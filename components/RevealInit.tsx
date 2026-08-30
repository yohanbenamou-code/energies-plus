"use client";

import * as React from "react";

/**
 * Active le système de révélation CSS :
 *  - pose `html.js` (le masquage `.reveal` n'est actif que dans ce cas) ;
 *  - observe les `.reveal` et leur ajoute `.is-visible` à l'entrée en viewport ;
 *  - filet de sécurité : révèle tout au bout de 3 s, quoi qu'il arrive.
 *
 * Résultat : si le JS ne tourne pas (ou tourne mal), le contenu reste
 * simplement visible — jamais bloqué à `opacity: 0`.
 */
export function RevealInit() {
  React.useEffect(() => {
    const root = document.documentElement;
    root.classList.add("js");

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const revealAll = () => {
      document
        .querySelectorAll(".reveal:not(.is-visible)")
        .forEach((el) => el.classList.add("is-visible"));
    };

    if (reduce) {
      revealAll();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 },
    );

    const observe = () =>
      document
        .querySelectorAll(".reveal:not(.is-visible)")
        .forEach((el) => io.observe(el));

    observe();

    // Contenu ajouté après coup (rare ici, mais robuste).
    const mo = new MutationObserver(observe);
    mo.observe(document.body, { childList: true, subtree: true });

    const safety = window.setTimeout(revealAll, 3000);

    return () => {
      io.disconnect();
      mo.disconnect();
      window.clearTimeout(safety);
    };
  }, []);

  return null;
}
