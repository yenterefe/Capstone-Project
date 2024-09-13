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
import Navigation from './Navigation'
import img1 from "./images/img1.jpg";
import img5 from "./images/img5.webp";
import logo1 from "./images/logo1.png";

const LandingPage = () => {
  return (
    <>
      <Navigation />
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
