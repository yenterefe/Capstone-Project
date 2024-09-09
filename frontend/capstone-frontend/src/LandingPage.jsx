// import Title from "./Title";
// import Button from "./Button";
// import { Link } from "react-router-dom";
// import img1 from "./images/img1.jpg";

// export default function LandingPage() {
//   return (
//     <>
//       <h1 className="text-black-300 italic">
//         ~ Fresh Search ~<br></br>
//         Food Access Research
//       </h1>

//       {/* <Title /> */}
//       <Link to="/SearchMap">
//         <Button />
//       </Link>
//       <div>
//         <img className="w-90 h-90 rounded" src={img1} />
//       </div>
//     </>
//   );
// }
import React, { useState } from "react";
import img1 from "./images/img1.jpg";
import img5 from "./images/img5.webp";
import logo1 from "./images/logo1.png";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <div className="relative bg-white pb-[110px] pt-[120px] dark:bg-dark lg:pt-[150px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4 lg:w-5/12">
              {/* <div className="hero-content"> */}
              {/* <h1 className="mb-5 text-3xl font-bold text-dark dark:text-white sm:text-[40px]/[48px]">
                Welcome
              </h1> */}
              <p className="mb-20 font-bold max-w-[480px] text-base text-body-color dark:text-dark-6">
                Welcome to fresh finder, your trusted resource for tackling food deserts
                and making fresh, nutritious food accessible. We connect
                individuals with local farms, markets, and sustainable programs
                that provide affordable produce, helping you advance toward a
                healthier lifestyle and stronger community.
              </p>

              <div className="clients absolute bottom-0 left-0 w-full p-4">
                <h6 className="mt-20 flex items-center text-sm font-normal text-body-color dark:text-dark-6">
                  For more information about food access:
                  <span className="ml-2 inline-block h-px w-6 bg-body-color"></span>
                </h6>

                <div className="flex  items-center space-x-2">
                  <SingleImage
                    href="https://gisportal.ers.usda.gov/portal/apps/experiencebuilder/experience/?id=a53ebd7396cd4ac3a3ed09137676fd40&page=Introduction"
                    imgSrc={img5}
                  />
                  {/* <SingleImage
                      href="#"
                      imgSrc="https://cdn.tailgrids.com/2.0/image/assets/images/brands/graygrids.svg"
                    />

                    <SingleImage
                      href="#"
                      imgSrc="https://cdn.tailgrids.com/2.0/image/assets/images/brands/uideck.svg"
                    /> */}
                </div>
              </div>
              {/* </div> */}
            </div>
            <div className="hidden px-4 lg:block lg:w-1/12"></div>
            <div className="w-full px-4 lg:w-6/12">
              <div className="lg:ml-auto lg:text-right">
                <div className="relative z-10 inline-block pt-11 lg:pt-0">
                  <img
                    src={img1}
                    alt="hero"
                    className="max-w-full lg:ml-auto"
                  />
                  <span className="absolute -bottom-8 -left-8 z-[-1]">
                    <svg
                      width="93"
                      height="93"
                      viewBox="0 0 93 93"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="2.5" cy="2.5" r="2.5" fill="#3056D3" />
                      <circle cx="2.5" cy="24.5" r="2.5" fill="#3056D3" />
                      <circle cx="2.5" cy="46.5" r="2.5" fill="#3056D3" />
                      <circle cx="2.5" cy="68.5" r="2.5" fill="#3056D3" />
                      <circle cx="2.5" cy="90.5" r="2.5" fill="#3056D3" />
                      <circle cx="24.5" cy="2.5" r="2.5" fill="#3056D3" />
                      <circle cx="24.5" cy="24.5" r="2.5" fill="#3056D3" />
                      <circle cx="24.5" cy="46.5" r="2.5" fill="#3056D3" />
                      <circle cx="24.5" cy="68.5" r="2.5" fill="#3056D3" />
                      <circle cx="24.5" cy="90.5" r="2.5" fill="#3056D3" />
                      <circle cx="46.5" cy="2.5" r="2.5" fill="#3056D3" />
                      <circle cx="46.5" cy="24.5" r="2.5" fill="#3056D3" />
                      <circle cx="46.5" cy="46.5" r="2.5" fill="#3056D3" />
                      <circle cx="46.5" cy="68.5" r="2.5" fill="#3056D3" />
                      <circle cx="46.5" cy="90.5" r="2.5" fill="#3056D3" />
                      <circle cx="68.5" cy="2.5" r="2.5" fill="#3056D3" />
                      <circle cx="68.5" cy="24.5" r="2.5" fill="#3056D3" />
                      <circle cx="68.5" cy="46.5" r="2.5" fill="#3056D3" />
                      <circle cx="68.5" cy="68.5" r="2.5" fill="#3056D3" />
                      <circle cx="68.5" cy="90.5" r="2.5" fill="#3056D3" />
                      <circle cx="90.5" cy="2.5" r="2.5" fill="#3056D3" />
                      <circle cx="90.5" cy="24.5" r="2.5" fill="#3056D3" />
                      <circle cx="90.5" cy="46.5" r="2.5" fill="#3056D3" />
                      <circle cx="90.5" cy="68.5" r="2.5" fill="#3056D3" />
                      <circle cx="90.5" cy="90.5" r="2.5" fill="#3056D3" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;

const SingleImage = ({ href, imgSrc }) => {
  return (
    <>
      <a href={href} className="flex w-full items-center justify-start ">
        <img src={img5} alt="brand image" className="w-40 h-40 mr-30" />
      </a>
    </>
  );
};

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className={`absolute left-0 top-0 z-20 flex w-full items-center `}>
      <div className="container">
        <div className="relative -mx-4 flex items-center justify-between">
          <div className="w-100 max-w-sm ml-10 px-4 rounded-md">
            <a href="/SearchMap" className="block w-full py-5 ">
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
                className="px-7 py-3 text-base font-medium text-white bg-green-800 hover:text-primary dark:text-white rounded"
              >
                Discover Fresh Food Markets
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
