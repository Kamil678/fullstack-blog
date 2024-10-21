import {
  Avatar,
  Button,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  TextInput,
} from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaUser, FaSun } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { toggleMode } from "../app/mode/modeSlice";
import { signoutSuccess } from "../app/user/userSlice";
import Logo from "./Logo";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { mode } = useSelector((state) => state.mode);
  const [serachTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    } else {
      setSearchTerm("");
    }
  }, [location.search]);

  const handleSubmitSearchForm = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", serachTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleSignout = async () => {
    try {
      const response = await fetch("/api/auth/signout", {
        method: "POST",
      });

      const responseData = await response.json();

      if (response.ok) {
        dispatch(signoutSuccess());
      } else {
        console.log(responseData.message);
      }
    } catch (err) {
      console.log(err.errMessage);
    }
  };

  return (
    <Navbar className="border-b-2">
      <Logo textSize="text-sm sm:text-xl" />
      <form onSubmit={handleSubmitSearchForm}>
        <TextInput
          type="text"
          placeholder="Wyszukaj..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline "
          value={serachTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      <Button className="w-12 h-8 lg:hidden" color="gray" pill>
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
            label={<Avatar alt="User avatar" img={user.picture} />}
          >
            <DropdownHeader>
              <div className="flex gap-2 items-center">
                <FaUser className="w-4 h-4" />
                <span className="block text-sm">{user.username}</span>
              </div>
              <div className="flex gap-2 items-center">
                <MdEmail className="w-4 h-4" />
                <span className="block text-sm font-medium truncate">
                  {user.email}
                </span>
              </div>
            </DropdownHeader>
            <Link to={"/dashboard?tab=profile"}>
              <DropdownItem>Profil</DropdownItem>
            </Link>
            <DropdownDivider />
            <DropdownItem onClick={handleSignout}>Wyloguj się</DropdownItem>
          </Dropdown>
        ) : (
          <Link to="/sign-in">
            <Button gradientDuoTone="purpleToBlue" outline>
              Zaloguj się
            </Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to="/">Strona główna</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link to="/about">O mnie</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/projects"} as={"div"}>
          <Link to="/projects">Projekty</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
