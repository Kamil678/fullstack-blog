import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoggedInRoute from "./components/LoggedInRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/sign-in"
          element={<Signin />}
        />
        <Route
          path="/sign-up"
          element={<Signup />}
        />
        <Route
          path="/about"
          element={<About />}
        />
        <Route element={<LoggedInRoute />}>
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />
        </Route>
        <Route
          path="/projects"
          element={<Projects />}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
