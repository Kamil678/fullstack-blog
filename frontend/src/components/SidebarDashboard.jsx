import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";
import {
  HiArrowSmRight,
  HiDocumentText,
  HiOutlineUserGroup,
  HiUser,
} from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { signoutSuccess } from "../app/user/userSlice";
import { LiaComments } from "react-icons/lia";

export default function SidebarDashboard() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabFromUrl = params.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const response = await fetch("api/auth/signout", {
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
    <Sidebar className=" w-full md:w-56">
      <SidebarItems>
        <SidebarItemGroup className="flex flex-col gap-1">
          <Link to="/dashboard?tab=profile">
            <SidebarItem
              active={tab === "profile"}
              icon={HiUser}
              label={user.isAdmin ? "Admin" : "User"}
              labelColor="dark"
              as="div"
            >
              Profil
            </SidebarItem>
          </Link>
          {user.isAdmin && (
            <>
              <Link to="/dashboard?tab=posts">
                <SidebarItem
                  active={tab === "posts"}
                  icon={HiDocumentText}
                  as="div"
                >
                  Posty
                </SidebarItem>
              </Link>
              <Link to="/dashboard?tab=users">
                <SidebarItem
                  active={tab === "users"}
                  icon={HiOutlineUserGroup}
                  as="div"
                >
                  Użytkownicy
                </SidebarItem>
              </Link>
              <Link to="/dashboard?tab=comments">
                <SidebarItem
                  active={tab === "comments"}
                  icon={LiaComments}
                  as="div"
                >
                  Komentarze
                </SidebarItem>
              </Link>
            </>
          )}
          <SidebarItem
            icon={HiArrowSmRight}
            className="cursor-pointer"
            onClick={handleSignout}
          >
            Wyloguj się
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
}
