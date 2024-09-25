import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SidebarDashboard from "../components/SidebarDashboard";
import Profile from "../components/Profile";
import Posts from "../components/Posts";

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
      {tab === "posts" && <Posts />}
    </div>
  );
}
