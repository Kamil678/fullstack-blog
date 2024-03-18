import { Footer, FooterCopyright, FooterDivider, FooterIcon, FooterLink, FooterLinkGroup, FooterTitle } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { BsGithub, BsLinkedin, BsFacebook, BsInstagram } from "react-icons/bs";

export default function FooterComponent() {
  return (
    <Footer
      container
      className="border border-t-8 border-teal-500 "
    >
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-3 mb-3">
            <Logo textSize="text-lg sm:text-xl" />
          </div>
          <div className="grid grid-cols-2 gap-6 sm:mt-4 sm:grid-cols-3 sm:gap-6">
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
        </div>
        <FooterDivider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <FooterCopyright
            href="#"
            by="Fullstack Blog"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-5 sm:mt-0 mt-4 sm:justify-center">
            <FooterIcon
              href="#"
              icon={BsGithub}
            />
            <FooterIcon
              href="#"
              icon={BsLinkedin}
            />
            <FooterIcon
              href="#"
              icon={BsFacebook}
            />
            <FooterIcon
              href="#"
              icon={BsInstagram}
            />
          </div>
        </div>
      </div>
    </Footer>
  );
}
