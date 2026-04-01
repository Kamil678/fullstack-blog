import { Navbar } from "flowbite-react";
import { Link } from "react-router-dom";

export default function NavLinks({ navLinks, currentPath }) {
  return (
    <Navbar.Collapse>
      {navLinks.map(({ to, label }) => {
        const isActive = currentPath === to;

        return (
          <Navbar.Link
            key={to}
            active={isActive}
            as="div"
            className={`
              rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer
              ${
                isActive
                  ? "text-cyan-600 dark:text-cyan-400"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/60"
              }
            `}
          >
            <Link to={to}>{label}</Link>
          </Navbar.Link>
        );
      })}
    </Navbar.Collapse>
  );
}
