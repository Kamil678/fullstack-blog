import { Footer, FooterLink, FooterLinkGroup, FooterTitle } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function FooterComponent() {
  return (
    <Footer
      container
      className="border border-t-8 border-teal-500 "
    >
      <div className="w-full max-w-7xl mx-auto">
        <Logo textSize="text-lg sm:text-xl" />
      </div>
      <div className="grid grid-cols-2 gap-3 sm:mt-4 sm:grid-cols-3 sm:gap-6">
        <div>
          <Footer.Title
            title="Informacje"
            className="mb-2"
          />
          <Footer.LinkGroup col>
            <Footer.Link
              href="/about"
              target="_blank"
            >
              O mnie
            </Footer.Link>
          </Footer.LinkGroup>
          <Footer.LinkGroup col>
            <Footer.Link
              href="/projects"
              target="_blank"
            >
              Projekty
            </Footer.Link>
          </Footer.LinkGroup>
        </div>
        <div>
          <Footer.Title
            title="Znajdź mnie"
            className="mb-2"
          />
          <Footer.LinkGroup col>
            <Footer.Link
              href="https://github.com/Kamil678"
              target="_blank"
            >
              Github
            </Footer.Link>
          </Footer.LinkGroup>
          <Footer.LinkGroup col>
            <Footer.Link
              href="https://www.linkedin.com/in/kamil-pigulak/"
              target="_blank"
            >
              Linkedin
            </Footer.Link>
          </Footer.LinkGroup>
        </div>
        <div>
          <Footer.Title
            title="Regulaminy"
            className="mb-2"
          />
          <Footer.LinkGroup col>
            <Footer.Link href="#">Polityka prywatności</Footer.Link>
          </Footer.LinkGroup>
          <Footer.LinkGroup col>
            <Footer.Link href="#">Regulamin serwisu</Footer.Link>
          </Footer.LinkGroup>
        </div>
      </div>
    </Footer>
  );
}
