import React from "react";
import { useSelector } from "react-redux";

export default function ModeProvider({ children }) {
  const { mode } = useSelector((state) => state.mode);
  return (
    <div className={mode}>
      <div className="bg-white text-gray-700 dark:text-gray-200 dark:bg-[rgb(16,23,42)] min-h-screen ">{children}</div>
    </div>
  );
}
