
import React, { useState } from "react";
import { Link } from "react-router-dom";
import t1 from "./images/t1.jpg";
import logo1 from "./images/logo.png";

function Navigation() {
 
        const [open, setOpen] = useState(false);

    return (
     <header className="">
        <div className="container">
          <div className="relative -mx-4 flex items-center justify-between">
            <div className="w-100 max-w-sm ml-10 px-4 rounded-md">
              <a href="/" className="block w-full py-5 ">
                <img src={logo1} alt="logo" className="w-full rounded" />
                {/* <img
                  src="https://cdn.tailgrids.com/2.0/image/assets/images/logo/logo-white.svg"
                  alt="logo"
                  className="w-full hidden dark:block"
                /> */}
              </a>
            </div>
            <div className="flex w-full items-center justify-between px-4">
              <div>
                <button
                  onClick={() => setOpen(!open)}
                  id="navbarToggler"
                  className={` ${open && "navbarTogglerActive"
                    } absolute right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden`}
                >
                  <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color dark:bg-white"></span>
                  <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color dark:bg-white"></span>
                  <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color dark:bg-white"></span>
                </button>
                <nav
                  id="navbarCollapse"
                  className={`absolute right-4 top-full w-full max-w-[250px] rounded-lg bg-white px-6 py-5 shadow dark:bg-dark-2 lg:static lg:block lg:w-full lg:max-w-full lg:bg-transparent lg:shadow-none lg:dark:bg-transparent ${!open && "hidden"
                    } `}
                >
                  <ul className="block lg:flex ">
                    <ListItem  NavLink="/">Home</ListItem>
                    <ListItem NavLink="/mission">Mission</ListItem>
                    <ListItem NavLink="/team">Team</ListItem>
                    <ListItem NavLink="/SearchMap">Map</ListItem>
                    {/* <ListItem NavLink="/#">About</ListItem>
                    <ListItem NavLink="/#">Blog</ListItem> */}
                  </ul>
                </nav>
              </div>
              <div className="hidden justify-end pr-16 sm:flex lg:pr-0 ">
                <a
                  href="/SearchMap"
                  className="px-7 py-3 text-base font-medium rounded-full hover:text-white text-white bg-green-800 hover:text-primary dark:text-white rounded"
                >
                  Discover
                </a>
  
                {/* <a
                  href="/#"
                  className="rounded-lg bg-primary px-7 py-3 text-base font-medium text-white hover:bg-opacity-90"
                >
                  Discover Fresh Food Markets
                </a> */}
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  };

export default Navigation;


const ListItem = ({ children, NavLink }) => {
    return (
      <>
        <li>
          <a
            href={NavLink}
            className="flex py-2 text-base font-medium text-dark hover:text-primary dark:text-white lg:ml-10 lg:inline-flex"
          >
            {children}
          </a>
        </li>
      </>
    );
  };
  
