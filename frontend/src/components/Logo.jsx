import React from "react";
import { Link } from "react-router-dom";

export default function Logo({ textSize }) {
  return (
    <Link
      to="/"
      className={`self-center whitespace-nowrap font-semibold dark:text-white ${textSize}`}
    >
      <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white mr-1">Fullstack</span>
      Blog
    </Link>
  );
}
