const techGroups = [
  {
    category: "Frontend",
    items: ["HTML5", "CSS / Sass", "JavaScript", "TypeScript", "Vue.js", "Quasar", "React", "Tailwind CSS", "jQuery"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express.js", "PHP", "MongoDB"],
  },
  {
    category: "Narzędzia",
    items: ["Git", "Docker", "Cypress", "Jira"],
  },
];

const timeline = [
  {
    year: "2022–teraz",
    title: "Frontend Developer",
    desc: "Praca komercyjna z Vue.js, Quasar, TypeScript i narzędziami DevOps.",
  },
  {
    year: "2023",
    title: "Fullstack Blog",
    desc: "Własny projekt — React, Tailwind, Node.js, Express, MongoDB.",
  },
  {
    year: "2021",
    title: "Pierwsze kroki",
    desc: "HTML, CSS, JavaScript — start przygody z webdevelopmentem.",
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute -top-20 -right-20 w-96 h-96 rounded-full blur-3xl opacity-20 dark:opacity-15"
            style={{ background: "radial-gradient(circle, #0891b2, transparent 70%)" }}
          />
          <div
            className="absolute bottom-0 -left-20 w-80 h-80 rounded-full blur-3xl opacity-10"
            style={{ background: "radial-gradient(circle, #6366f1, transparent 70%)" }}
          />
        </div>
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(6,182,212,1) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,1) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: "radial-gradient(ellipse 80% 80% at 80% 20%, black 10%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 80% 20%, black 10%, transparent 100%)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-6xl px-6 py-24 lg:py-32 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <div className="flex-1 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/40 bg-cyan-500/10 px-4 py-1.5 w-fit">
              <span className="h-2 w-2 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">Frontend Developer</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight">
              Cześć, jestem{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #0891b2 0%, #2563eb 60%, #7c3aed 100%)" }}
              >
                Kamil
              </span>
            </h1>

            <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl">
              Frontend Developer z{" "}
              <span className="font-semibold text-slate-700 dark:text-slate-200">4-letnim doświadczeniem komercyjnym</span> w technologiach
              webowych. Specjalizuję się w tworzeniu nowoczesnych i dynamicznych aplikacji internetowych. Nieustannie poszerzam swoje
              umiejętności, realizując własne projekty publikowane na GitHubie.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-cyan-500/40"
                style={{ background: "linear-gradient(135deg, #0891b2, #2563eb)" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub
              </a>
              <a
                href="#kontakt"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/60 dark:bg-transparent px-6 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 backdrop-blur-sm transition-all duration-200 hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/60"
              >
                Kontakt
              </a>
            </div>
          </div>

          {/* Photo */}
          <div className="relative flex-shrink-0 w-72 h-72 lg:w-96 lg:h-96">
            <div
              className="absolute -inset-3 rounded-2xl opacity-30 dark:opacity-20 blur-sm"
              style={{ background: "linear-gradient(135deg, #0891b2, #6366f1)" }}
            />
            <div className="absolute -inset-[2px] rounded-2xl bg-white dark:bg-slate-950" />
            <div
              className="absolute -inset-[1px] rounded-2xl opacity-60"
              style={{ background: "linear-gradient(135deg, #0891b2, #6366f1)" }}
            />
            <img src="src/assets/kp.jpg" alt="Zdjęcie właściciela bloga" className="relative z-10 w-full h-full object-cover rounded-2xl" />
            <div className="absolute -bottom-4 -right-4 z-20 flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2.5 shadow-xl">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">Open to work</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TECH STACK ─── */}
      <section className="bg-slate-50 dark:bg-slate-900/50 py-20 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">Umiejętności</span>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Stack technologiczny</h2>
          </div>

          <div className="flex flex-col gap-8">
            {techGroups.map(({ category, items }) => (
              <div key={category}>
                {/* Category label */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">{category}</span>
                  <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
                </div>
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {items.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800/50 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 transition-all duration-200 hover:border-cyan-400/60 hover:bg-cyan-50 dark:hover:bg-cyan-500/10 hover:text-cyan-700 dark:hover:text-cyan-400 cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ABOUT PROJECT ─── */}
      <section className="py-20 px-6 bg-white dark:bg-slate-950">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">Projekt</span>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">O tym blogu</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <path
                    d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                ),
                title: "Fullstack",
                desc: "React + Tailwind na froncie, Node.js + Express + MongoDB na backendzie. Komunikacja przez REST API.",
              },
              {
                icon: (
                  <path
                    d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.8 12H3"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                ),
                title: "Autoryzacja",
                desc: "Logowanie e-mailem i hasłem oraz przez Google OAuth. Obsługa sesji i JWT.",
              },
              {
                icon: (
                  <path
                    d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                ),
                title: "Panel admina",
                desc: "Tworzenie, edytowanie i usuwanie postów z poziomu dashboardu. Obsługa obrazków i kategorii.",
              },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-6 transition-all duration-200 hover:border-cyan-400/40 hover:shadow-lg hover:shadow-cyan-500/5 dark:hover:shadow-cyan-500/10"
              >
                <div
                  className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{ background: "linear-gradient(135deg, rgba(8,145,178,0.15), rgba(99,102,241,0.15))" }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" className="text-cyan-600 dark:text-cyan-400">
                    {icon}
                  </svg>
                </div>
                <h3 className="mb-2 text-base font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TIMELINE ─── */}
      <section className="py-20 px-6 bg-slate-50 dark:bg-slate-900/50">
        <div className="mx-auto max-w-2xl">
          <div className="mb-12 text-center">
            <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">Historia</span>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Moja droga</h2>
          </div>

          <div className="relative flex flex-col">
            <div className="absolute left-[19px] top-3 bottom-3 w-px bg-gradient-to-b from-cyan-500/60 via-indigo-500/40 to-transparent" />
            {timeline.map(({ year, title, desc }, i) => (
              <div key={i} className="relative flex gap-6 pb-10 last:pb-0">
                <div className="relative z-10 mt-1 flex-shrink-0">
                  <div
                    className="h-10 w-10 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                    style={{ background: "linear-gradient(135deg, #0891b2, #6366f1)" }}
                  >
                    {i + 1}
                  </div>
                </div>
                <div className="flex-1 pt-1.5">
                  <span className="text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">{year}</span>
                  <h3 className="mt-0.5 text-base font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
