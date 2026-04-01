import { Footer, FooterCopyright, FooterDivider, FooterIcon, FooterLink, FooterLinkGroup, FooterTitle } from "flowbite-react";
import React from "react";
import { BsGithub, BsLinkedin, BsFacebook, BsInstagram } from "react-icons/bs";
import Logo from "../../components/ui/Logo";

export default function FooterComponent() {
  return (
    <Footer container className="rounded-none border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      <div className="w-full max-w-7xl mx-auto">
        {/* Top row */}
        <div className="flex flex-col sm:flex-row justify-between gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-4 max-w-xs">
            <Logo textSize="text-lg sm:text-xl" />
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Blog o programowaniu, narzędziach i nowoczesnym webdevelopmencie.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3 mt-1">
              {[
                { href: "https://github.com/Kamil678", icon: BsGithub, label: "GitHub" },
                { href: "https://www.linkedin.com/in/kamil-pigulak/", icon: BsLinkedin, label: "LinkedIn" },
                { href: "#", icon: BsFacebook, label: "Facebook" },
                { href: "#", icon: BsInstagram, label: "Instagram" },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 transition-all duration-200 hover:border-cyan-400/60 hover:bg-cyan-50 dark:hover:bg-cyan-500/10 hover:text-cyan-600 dark:hover:text-cyan-400"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Informacje */}
            <div>
              <FooterTitle
                title="Informacje"
                className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-slate-100"
              />
              <FooterLinkGroup col>
                <FooterLink
                  href="/about"
                  className="text-sm text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                >
                  O mnie
                </FooterLink>
                <FooterLink
                  href="/projects"
                  className="text-sm text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                >
                  Projekty
                </FooterLink>
              </FooterLinkGroup>
            </div>

            {/* Znajdź mnie */}
            <div>
              <FooterTitle
                title="Znajdź mnie"
                className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-slate-100"
              />
              <FooterLinkGroup col>
                <FooterLink
                  href="https://github.com/Kamil678"
                  target="_blank"
                  className="text-sm text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                >
                  GitHub
                </FooterLink>
                <FooterLink
                  href="https://www.linkedin.com/in/kamil-pigulak/"
                  target="_blank"
                  className="text-sm text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                >
                  LinkedIn
                </FooterLink>
              </FooterLinkGroup>
            </div>

            {/* Regulaminy */}
            <div>
              <FooterTitle
                title="Regulaminy"
                className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-slate-100"
              />
              <FooterLinkGroup col>
                <FooterLink
                  href="#"
                  className="text-sm text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                >
                  Polityka prywatności
                </FooterLink>
                <FooterLink
                  href="#"
                  className="text-sm text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                >
                  Regulamin serwisu
                </FooterLink>
              </FooterLinkGroup>
            </div>
          </div>
        </div>

        {/* Divider */}
        <FooterDivider className="my-8 border-slate-200 dark:border-slate-800" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <FooterCopyright
            href="#"
            by="Fullstack Blog"
            year={new Date().getFullYear()}
            className="text-sm text-slate-400 dark:text-slate-500"
          />
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-slate-400 dark:text-slate-500">Kamil Pigulak — Frontend Developer</span>
          </div>
        </div>
      </div>
    </Footer>
  );
}
