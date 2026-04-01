import React from "react";
import ProjectBox from "../components/ProjectBox";

const projects = [
  {
    id: 1,
    name: "Movie App",
    image: new URL("../assets/projects/movie-app.webp", import.meta.url).href,
    link: "https://dazzling-valkyrie-c0fb6c.netlify.app/",
    linkGithub: "https://github.com/Kamil678/movie-app",
  },
  {
    id: 2,
    name: "All Countries App",
    image: new URL("../assets/projects/all-countries-app.webp", import.meta.url).href,
    link: "https://kamil678.github.io/countries-project/",
    linkGithub: "https://github.com/Kamil678/countries-project",
  },
  {
    id: 3,
    name: "Wedding Friends",
    image: new URL("../assets/projects/wedding-friends-page.webp", import.meta.url).href,
    link: "https://weddingfriends.pl/",
  },
  {
    id: 4,
    name: "Weddings In Krakow",
    image: new URL("../assets/projects/weddings-in-krakow.webp", import.meta.url).href,
    link: "https://weddingsinkrakow.com/",
  },
];

export default function Projects() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden py-24 px-6">
        {/* Blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-64 rounded-full blur-3xl opacity-15 dark:opacity-10"
            style={{ background: "radial-gradient(ellipse, #0891b2, transparent 70%)" }}
          />
          <div
            className="absolute bottom-0 -right-20 w-72 h-72 rounded-full blur-3xl opacity-10"
            style={{ background: "radial-gradient(circle, #6366f1, transparent 70%)" }}
          />
        </div>

        {/* Grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(6,182,212,1) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,1) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: "radial-gradient(ellipse 60% 80% at 50% 0%, black 10%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 60% 80% at 50% 0%, black 10%, transparent 100%)",
          }}
        />

        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/40 bg-cyan-500/10 px-4 py-1.5 mb-6">
            <span className="h-2 w-2 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">Portfolio</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight mb-5">
            Moje{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #0891b2 0%, #2563eb 60%, #7c3aed 100%)" }}
            >
              projekty
            </span>
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
            Rzeczy, które zbudowałem po godzinach. Każdy projekt to nowa technologia lub problem do rozwiązania.
          </p>
        </div>
      </section>

      {/* ─── PROJECTS GRID ─── */}
      <section className="relative bg-slate-50 dark:bg-slate-900/50 py-20 px-6">
        {/* Top glow line */}
        <div
          className="absolute top-0 left-1/2 h-px w-[480px] -translate-x-1/2"
          style={{ background: "linear-gradient(90deg, transparent, rgba(8,145,178,0.4), transparent)" }}
        />

        <div className="mx-auto max-w-6xl">
          {/* Stats */}
          <div className="flex justify-center gap-8 mb-14">
            <div className="text-center">
              <div
                className="text-3xl font-extrabold bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #0891b2, #6366f1)" }}
              >
                {projects.length}
              </div>
              <div className="text-xs uppercase tracking-widest text-slate-400 dark:text-slate-500 font-medium mt-0.5">Projekty</div>
            </div>
            <div className="w-px bg-slate-200 dark:bg-slate-800" />
            <div className="text-center">
              <div
                className="text-3xl font-extrabold bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #0891b2, #6366f1)" }}
              >
                100%
              </div>
              <div className="text-xs uppercase tracking-widest text-slate-400 dark:text-slate-500 font-medium mt-0.5">Open source</div>
            </div>
            <div className="w-px bg-slate-200 dark:bg-slate-800" />
            <div className="text-center">
              <div
                className="text-3xl font-extrabold bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #0891b2, #6366f1)" }}
              >
                ∞
              </div>
              <div className="text-xs uppercase tracking-widest text-slate-400 dark:text-slate-500 font-medium mt-0.5">Pomysłów</div>
            </div>
          </div>

          {/* Cards */}
          <div className="flex flex-wrap justify-center gap-6">
            {projects.map((project) => (
              <ProjectBox key={project.id} project={project} />
            ))}
          </div>

          {/* GitHub link */}
          <div className="mt-14 text-center">
            <a
              href="https://github.com/Kamil678"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-sm font-medium text-cyan-600 dark:text-cyan-400 transition-all duration-200 hover:opacity-70"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              Zobacz wszystkie projekty na GitHubie
              <svg
                className="transition-transform duration-200 group-hover:translate-x-1"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="relative overflow-hidden bg-white dark:bg-slate-950 py-24 px-6">
        <div
          className="pointer-events-none absolute inset-0 opacity-5 dark:opacity-10 blur-3xl"
          style={{ background: "radial-gradient(ellipse 60% 60% at 50% 50%, #0891b2, transparent)" }}
        />
        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100">Masz pomysł na współpracę?</h2>
          <p className="mb-8 text-slate-500 dark:text-slate-400 leading-relaxed">
            Chętnie porozmawiam o nowych projektach i możliwościach.
          </p>
          <a
            href="https://www.linkedin.com/in/kamil-pigulak/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl px-8 py-4 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cyan-500/30"
            style={{ background: "linear-gradient(135deg, #0891b2, #4f46e5)" }}
          >
            Skontaktuj się
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </section>
    </div>
  );
}
