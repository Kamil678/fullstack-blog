import { BsGithub } from "react-icons/bs";

export default function ProjectBox({ project }) {
  return (
    <div className="group relative w-full sm:w-[420px] h-[360px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm transition-all duration-300 hover:border-cyan-400/40 hover:shadow-xl hover:shadow-cyan-500/10 dark:hover:shadow-cyan-500/10 hover:-translate-y-1">
      <div className="h-[240px] overflow-hidden">
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-3">
        <p className="text-base font-semibold text-slate-900 dark:text-slate-100 group-hover:text-white transition-colors duration-300 line-clamp-1">
          {project.name}
        </p>

        <div className="flex gap-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <a
            href={project.linkGithub}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-2 text-sm font-medium text-white hover:bg-white/20 transition-all duration-200"
          >
            <BsGithub className="w-4 h-4" />
            Kod
          </a>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #0891b2, #2563eb)" }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path
                d="M7 3H3a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1V9M10 2h4m0 0v4m0-4L7 9"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Demo
          </a>
        </div>
      </div>
    </div>
  );
}
