import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SidebarDashboard from "../components/SidebarDashboard";
import Profile from "../components/Profile";
import Posts from "../components/Posts";
import Users from "../components/Users";
import { ToastContainer } from "react-toastify";
import Comments from "../components/Comments";
import DashboardComponent from "../components/DashboardComponent";

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabFromUrl = params.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        <SidebarDashboard />
      </div>
      {tab === "profile" && <Profile />}
      {tab === "dashboard" && <DashboardComponent />}
      {tab === "posts" && <Posts />}
      {tab === "users" && <Users />}
      {tab === "comments" && <Comments />}
      <ToastContainer />
    </div>
  );
}
