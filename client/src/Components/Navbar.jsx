import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import image from "../assets/nwe.png";
import cart from "../assets/cart.png";
import search from "../assets/search.png";
import account from "../assets/account.png";
import menu from "../assets/menu.png";
import cross from "../assets/cross.png";

const Navbar = () => {
  const [hoverIndex, setHoverIndex] = useState(null);
  const [open, setOpen] = useState(false);
  const links = [
    { path: "/collections", name: "Collections" },
    { path: "/about", name: "About" },
    { path: "/contact", name: "Contact" },
    { path: "/login", name: "Login" },
  ];
  return (
      <div className="flex relative items-center justify-between font-medium py-1">
        <Link
          onClick={() => setOpen(false)}
          className="w-36 h-12 mt-2 cursor-pointer   items-center flex "
          to="/"
        >
          <img src={image} className="w-full  object-contain" alt="" />
        </Link>

        <div className=" items-center md:flex hidden justify-center gap-8">
          <div className="flex  items-center nav justify-between gap-6">
            {links.map((link, index) => (
              <NavLink
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
                to={link.path}
                key={index}
                className={({ isActive }) =>
                  isActive
                    ? " font-bold border-black"
                    : "text-gray-700 font-medium"
                }
              >
                <div className="h-5 flex flex-col   uppercase overflow-hidden transition-all sm:text-sm duration-300">
                  <div
                    className={`transition-transform transform duration-300 ease-in-out ${
                      hoverIndex === index
                        ? "-translate-y-full"
                        : "translate-y-0"
                    }`}
                  >
                    {link.name}
                  </div>
                  <div
                    className={`transition-transform transform duration-300 ease-in-out ${
                      hoverIndex === index
                        ? "-translate-y-full"
                        : "translate-y-full"
                    }`}
                  >
                    {link.name}
                  </div>
                </div>
              </NavLink>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center gap-4 md:gap-7">
          <img src={search} className="w-6" alt="" />
          <img src={account} className="w-6" alt="" />

          <Link to="/cart" className="w-6 flex relative cursor-pointer">
            <img src={cart} className=" w-full h-full" alt="" />
            <div className="absolute top-2.5 -right-0.5 text-[12px] flex items-center justify-center text-center text-white w-4 h-4 bg-black rounded-full">
              <p className="mx-auto my-auto">10</p>
            </div>
          </Link>

          <div
            onClick={() => setOpen(!open)}
            className="w-8 h-6 flex items-center md:hidden justify-center"
          >
            <div
              key={open ? "menu" : "cross"} // force re-render on toggle
              className="animate-[pop_0.2s_ease-out] w-full h-full flex items-center justify-center"
            >
              {open ? (
                <img
                  src={cross}
                  className="w-full object-contain scale-110"
                  alt=""
                />
              ) : (
                <img src={menu} className="w-6 object-contain" alt="" />
              )}
            </div>
          </div>
        </div>

        <div
          className={`w-full z-[999999] md:hidden bg-[#EEE8E6] text-gray-700 hover:text-black flex flex-col ${
            open ? "max-h-60" : "max-h-0"
          } overflow-hidden transition-all duration-300 top-16 absolute`}
        >
          <NavLink
            to={"/collections"}
            onClick={() => setOpen(!open)}
            className="border border-1 text-start uppercase font-medium px-3 py-2"
          >
            Collection
          </NavLink>
          <NavLink
            to={"/about"}
            onClick={() => setOpen(!open)}
            className="border text-start uppercase font-medium  px-3 py-2"
          >
            About
          </NavLink>
          <NavLink
            to={"/contact"}
            onClick={() => setOpen(!open)}
            className="border text-start uppercase font-medium  px-3 py-2"
          >
            Contact
          </NavLink>
          <NavLink
            to={"/login"}
            onClick={() => setOpen(!open)}
            className="border text-start uppercase font-medium  px-3 py-2"
          >
            Login
          </NavLink>
        </div>
      </div>
    
  );
};

export default Navbar;
