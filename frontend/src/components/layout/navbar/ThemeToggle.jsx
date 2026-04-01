import { Button } from "flowbite-react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function ThemeToggle({ mode, onToggle }) {
  return (
    <Button
      onClick={onToggle}
      className="hidden sm:flex w-10 h-10 rounded-md border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 focus:ring-0 [&>span]:p-0 [&>span]:flex [&>span]:items-center [&>span]:justify-center"
      color="gray"
      pill
    >
      {mode === "light" ? <FaMoon className="w-3.5 h-3.5" /> : <FaSun className="w-3.5 h-3.5" />}
    </Button>
  );
}
