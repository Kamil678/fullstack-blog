import { useTranslation } from "react-i18next";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { HiOutlineChatBubbleLeftRight, HiOutlineLockClosed, HiOutlineServerStack, HiOutlineSquares2X2 } from "react-icons/hi2";
import Button from "../components/ui/Button";
import Seo from "../components/ui/Seo";
import photo from "../assets/kp.jpg";
import { site } from "../lib/site";

const techGroups = [
  { key: "frontend", items: ["HTML5", "CSS / Sass", "JavaScript", "TypeScript", "Vue.js", "Quasar", "React", "Tailwind CSS", "jQuery"] },
  { key: "backend", items: ["Node.js", "Express.js", "PHP", "MongoDB"] },
  { key: "tools", items: ["Git", "Docker", "Cypress", "Jira"] },
];

export default function About() {
  const { t } = useTranslation();

  const blogFeatures = [
    { icon: HiOutlineServerStack, key: "stack" },
    { icon: HiOutlineLockClosed, key: "auth" },
    { icon: HiOutlineSquares2X2, key: "admin" },
    { icon: HiOutlineChatBubbleLeftRight, key: "comments" },
  ];
  const timeline = t("about.timeline", { returnObjects: true });

  return (
    <>
      <Seo title={t("nav.about")} description={t("about.intro")} />
      <section className="container-page grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1fr_auto]">
        <div className="max-w-2xl animate-fade-up">
          <p className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1 font-mono text-xs text-gray-600 dark:border-gray-800 dark:text-gray-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            {t("about.openToWork")}
          </p>
          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">{t("about.hello")}</h1>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-400">{t("about.intro")}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={site.github}>
              <BsGithub className="h-4 w-4" />
              GitHub
            </Button>
            <Button href={site.linkedin} variant="secondary">
              <BsLinkedin className="h-4 w-4" />
              LinkedIn
            </Button>
          </div>
        </div>
        <img
          src={photo}
          alt={site.author}
          className="h-64 w-64 rounded-3xl border border-gray-200 object-cover shadow-xl shadow-gray-200/50 sm:h-80 sm:w-80 dark:border-gray-800 dark:shadow-none"
        />
      </section>

      <section className="border-y border-gray-200 bg-gray-50/60 py-16 dark:border-gray-800 dark:bg-gray-900/30">
        <div className="container-page">
          <p className="font-mono text-xs uppercase tracking-widest text-brand-600 dark:text-brand-400">{t("about.skillsEyebrow")}</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">{t("about.skillsTitle")}</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {techGroups.map(({ key, items }) => (
              <div key={key}>
                <h3 className="text-sm font-semibold">{t(`about.groups.${key}`)}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="rounded-lg border border-gray-200 bg-white px-2.5 py-1 font-mono text-xs text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page grid gap-16 py-16 lg:grid-cols-2">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-brand-600 dark:text-brand-400">{t("about.blogEyebrow")}</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">{t("about.blogTitle")}</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {blogFeatures.map(({ icon: Icon, key }) => (
              <div key={key} className="rounded-2xl border border-gray-200 p-5 dark:border-gray-800">
                <Icon className="h-5 w-5 text-brand-600 dark:text-brand-400" />
                <h3 className="mt-3 font-semibold">{t(`about.features.${key}.title`)}</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{t(`about.features.${key}.desc`)}</p>
              </div>
            ))}
          </div>
          <Button href={site.repo} variant="secondary" className="mt-6">
            <BsGithub className="h-4 w-4" />
            {t("footer.sourceCode")}
          </Button>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-brand-600 dark:text-brand-400">{t("about.historyEyebrow")}</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">{t("about.historyTitle")}</h2>
          <ol className="mt-8 border-l border-gray-200 dark:border-gray-800">
            {timeline.map((item) => (
              <li key={item.title} className="relative pb-10 pl-6 last:pb-0">
                <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-brand-500 dark:border-gray-950" />
                <p className="font-mono text-xs text-gray-500">{item.year}</p>
                <h3 className="mt-1 font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
