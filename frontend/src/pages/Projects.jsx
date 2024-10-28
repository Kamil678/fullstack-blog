import React from "react";
import ProjectBox from "../components/ProjectBox";

export default function Projects() {
  const projects = [
    {
      id: 1,
      name: "Wedding Friends",
      image: "./assets/wedding-friends-page.png ",
      link: "https://weddingfriends.pl/",
      linkGithub: "https://github.com/Kamil678/weeding-friends",
    },
    {
      id: 2,
      name: "All Countries App",
      image: "./assets/all-countries-app.png",
      link: "https://kamil678.github.io/countries-project/",
      linkGithub: "https://github.com/Kamil678/countries-project",
    },
    {
      id: 3,
      name: "Guess Player App",
      image: "./assets/guess-player-app.png",
      link: "https://kamil678.github.io/guess-player-app/",
      linkGithub: "https://github.com/Kamil678/guess-player-app",
    },
  ];
  return (
    <div className="min-h-screen flex flex-col items-center m-10">
      <h1 className="text-3xl font font-semibold text-center my-10 ">
        Projekty
      </h1>
      <div className="flex items-center justify-center flex-wrap gap-4">
        {projects.map((project) => (
          <ProjectBox key={project.id} project={project} />
        ))}
      </div>
      <a
        href="https://github.com/Kamil678"
        className="text-lg text-teal-500 hover:underline text-center my-10"
      >
        Zobacz wszystkie projekty
      </a>
    </div>
  );
}
