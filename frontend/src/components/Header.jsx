import { Avatar, Button, Dropdown, DropdownDivider, DropdownHeader, DropdownItem, Navbar, TextInput } from "flowbite-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaUser, FaSun } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { toggleMode } from "../app/mode/modeSlice";
import Logo from "./Logo";

export default function Header() {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { mode } = useSelector((state) => state.mode);

  return (
    <Navbar className="border-b-2">
      <Logo textSize="text-sm sm:text-xl" />
      <form>
        <TextInput
          type="text"
          placeholder="Wyszukaj..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline "
        />
      </form>
      <Button
        className="w-12 h-8 lg:hidden"
        color="gray"
        pill
      >
        <AiOutlineSearch />
      </Button>
      <div className="flex items-center	gap-2.5 md:order-2">
        <Button
          className="w-12 h-10 hidden sm:inline"
          color="gray"
          pill
          onClick={() => dispatch(toggleMode())}
        >
          {mode === "light" ? <FaMoon /> : <FaSun />}
        </Button>
        {user ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="User avatar"
                img={user.picture}
              />
            }
          >
            <DropdownHeader>
              <div className="flex gap-2 items-center">
                <FaUser className="w-4 h-4" />
                <span className="block text-sm">{user.username}</span>
              </div>
              <div className="flex gap-2 items-center">
                <MdEmail className="w-4 h-4" />
                <span className="block text-sm font-medium truncate">{user.email}</span>
              </div>
            </DropdownHeader>
            <Link to={"/dashboard?tab=profile"}>
              <DropdownItem>Profil</DropdownItem>
            </Link>
            <DropdownDivider />
            <DropdownItem>Wyloguj się</DropdownItem>
          </Dropdown>
        ) : (
          <Link to="/sign-in">
            <Button
              gradientDuoTone="purpleToBlue"
              outline
            >
              Zaloguj się
            </Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link
          active={path === "/"}
          as={"div"}
        >
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link
          active={path === "/about"}
          as={"div"}
        >
          <Link to="/about">About</Link>
        </Navbar.Link>
        <Navbar.Link
          active={path === "/projects"}
          as={"div"}
        >
          <Link to="/projects">Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
