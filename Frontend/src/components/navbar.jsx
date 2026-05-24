import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Login from "../components/Login";
import { useAuth } from "../context/AuthProvider";
import Logout from "./Logout";

const Navbar = () => {
  const [authUser] = useAuth();

  const modalRef = useRef(null);

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navbar Items
  const navItem = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>

      <li>
        <Link to="/course">Course</Link>
      </li>

      <li>
        <a>Contact</a>
      </li>

      <li>
        <a>About</a>
      </li>
    </>
  );

  return (
    <div
      className={`max-w-screen-2xl container mx-auto md:px-20 px-4 fixed top-0 left-0 right-0 z-[9999] bg-base-200 ${
        sticky ? "shadow-md" : ""
      }`}
    >
      <div className="navbar">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              ☰
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navItem}
            </ul>
          </div>

          <a className="text-2xl font-bold cursor-pointer">Book Store</a>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItem}</ul>
        </div>

        <div className="navbar-end flex items-center gap-3">
          <div className="hidden md:flex">
            <input
              type="search"
              placeholder="Search"
              className="px-3 py-2 border rounded-md outline-none"
            />
          </div>

          {/* Theme Toggle */}
          <label className="swap swap-rotate cursor-pointer">
            <input
              type="checkbox"
              checked={theme === "dark"}
              onChange={() => setTheme(theme === "light" ? "dark" : "light")}
            />

            <i className="fa-solid fa-sun swap-off h-7 w-7"></i>

            <i className="fa-solid fa-moon swap-on h-7 w-7"></i>
          </label>

          {authUser ? (
            <Logout />
          ) : (
            <button
              className="bg-black text-white p-2 rounded-md hover:bg-slate-800 duration-300 cursor-pointer"
              onClick={() => modalRef.current.showModal()}
            >
              Login
            </button>
          )}

          <Login ref={modalRef} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;