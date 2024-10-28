import React from "react";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center mx-auto max-w-7xl p-10">
      <div className="lg:w-1/2 flex flex-col gap-5 shadow-lg p-7 z-10 bg-gray-50 dark:bg-gray-800 lg:mr-[-70px]">
        <h1 className="text-3xl font font-semibold text-center my-5">O mnie</h1>
        <p className="text-center">
          Jestem Frontend Developerem z prawie 3-letnim doświadczeniem
          komercyjnym w technologiach webowych, specjalizującym się w tworzeniu
          nowoczesnych i dynamicznych aplikacji internetowych.Moje mocne strony
          to zaawansowana znajomość HTML5, CSS (Sass, Scss), JavaScript,
          TypeScript oraz frameworków takich jak Vue.js i Quasar. Mam również
          podstawową wiedzę w zakresie innych technologii frontendowych (React,
          jQuery, Tailwind CSS), a także backendowych (PHP, Node.js, MongoDB).
          Nie obce mi są procesy testowania i automatyzacji (Cypress) oraz
          zarządzanie kodem i narzędzia DevOps, jak GIT, Docker i Jira.
          Nieustannie poszerzam swoje umiejętności, realizując własne projekty,
          które publikuję na GitHubie.
        </p>
        <p className="text-center">
          Aplikacja fullstack blog została stworzona w celu nauki przede
          wszystkim backendu, czyli Node.js, Express.js, MongoDB i
          poszczególnych składowych, które wchodzą w skład szeroko pojętego
          backendu. Dodatkowo dzięki tej aplikacji ugruntowano więdze z zakresu
          frontendu, a dokładniej z technologii takich jak React, Tailwind oraz
          Flowbite.
        </p>
        <p className="text-center">
          Jak wyżej wspomniano aplikacja składa sie z dwóch części: backendu i
          frontendu, które komunikują się za pomocą API. W aplikacji został
          zaimplementowany mechanizm logowania, który umożliwa zwykłe logowanie
          poprzez wprowadzenie e-maila i hasła, lub przez konto google.
        </p>
      </div>
      <div className="lg:w-1/2 shadow-lg">
        <img
          src={"./assets/kp.jpg"}
          alt="Blog owner image"
          className="w-full"
        />
      </div>
    </div>
  );
}
