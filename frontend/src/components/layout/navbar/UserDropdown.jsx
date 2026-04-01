import { Dropdown, DropdownHeader, DropdownItem, DropdownDivider, Avatar } from "flowbite-react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function UserDropdown({ user, onSignout }) {
  return (
    <Dropdown
      arrowIcon={false}
      inline
      label={
        <Avatar
          alt="User avatar"
          img={user.picture}
          rounded
          className="ring-2 ring-transparent hover:ring-cyan-400/60 transition-all duration-200 rounded-full"
        />
      }
      className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-slate-950/50"
    >
      <DropdownHeader className="border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
          <FaUser className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-medium truncate">{user.username}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mt-1">
          <MdEmail className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="truncate">{user.email}</span>
        </div>
      </DropdownHeader>

      <Link to="/dashboard?tab=profile">
        <DropdownItem className="text-sm hover:text-cyan-600 dark:hover:text-cyan-400">Profil</DropdownItem>
      </Link>

      <DropdownDivider />

      <DropdownItem onClick={onSignout} className="text-sm hover:text-red-500 dark:hover:text-red-400">
        Wyloguj się
      </DropdownItem>
    </Dropdown>
  );
}
