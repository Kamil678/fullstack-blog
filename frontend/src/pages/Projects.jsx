import { useTranslation } from "react-i18next";
import { BsGithub } from "react-icons/bs";
import { HiArrowUpRight } from "react-icons/hi2";
import PageHeader from "../components/ui/PageHeader";
import Seo from "../components/ui/Seo";
import movieApp from "../assets/projects/movie-app.webp";
import countriesApp from "../assets/projects/all-countries-app.webp";
import weddingFriends from "../assets/projects/wedding-friends-page.webp";
import weddingsInKrakow from "../assets/projects/weddings-in-krakow.webp";
import fullstackBlog from "../assets/projects/fullstack-blog.webp";
import { site } from "../lib/site";

const projects = [
  { name: "Fullstack Blog", image: fullstackBlog, github: site.repo },
  { name: "Movie App", image: movieApp, link: "https://dazzling-valkyrie-c0fb6c.netlify.app/", github: "https://github.com/Kamil678/movie-app" },
  {
    name: "All Countries App",
    image: countriesApp,
    link: "https://kamil678.github.io/countries-project/",
    github: "https://github.com/Kamil678/countries-project",
  },
  { name: "Wedding Friends", image: weddingFriends, link: "https://weddingfriends.pl/" },
  { name: "Weddings In Krakow", image: weddingsInKrakow, link: "https://weddingsinkrakow.com/" },
];

function ProjectCard({ project }) {
  const { t } = useTranslation();
  const linkClass =
    "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white";

  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-gray-200/60 dark:border-gray-800 dark:bg-gray-900/40 dark:hover:shadow-none">
      <div className="aspect-[16/10] overflow-hidden border-b border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-gray-900">
        <img
          src={project.image}
          alt={project.name}
          loading="lazy"
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex items-center justify-between gap-3 p-4">
        <h2 className="font-semibold">{project.name}</h2>
        <div className="flex gap-1">
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer" className={linkClass}>
              <BsGithub className="h-4 w-4" />
              <span className="sr-only sm:not-sr-only">{t("projects.code")}</span>
            </a>
          )}
          {project.link && (
            <a href={project.link} target="_blank" rel="noreferrer" className={linkClass}>
              {t("projects.live")}
              <HiArrowUpRight className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const { t } = useTranslation();

  return (
    <div className="container-page py-12 sm:py-16">
      <Seo title={t("nav.projects")} description={t("projects.description")} />
      <PageHeader eyebrow={t("projects.eyebrow")} title={t("projects.title")} description={t("projects.description")} />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </div>
  );
}
