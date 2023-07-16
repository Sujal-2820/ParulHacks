import { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Tooltip from "./Tooltip";

import Sidebar from "./Sidebar";
import BackgroundSVG from "./BackgroundSVG";
import { Link } from "react-router-dom";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
];

export default function Example({ user, handleLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <div className="bg-grad-shivam fixed w-screen p-[23px] lg:p-6 opacity-80 shadow-slate-900"></div>
        <nav
          className="fixed top-0 z-[100] flex items-center shadow-md shadow-slate-400 justify-between w-screen px-6 backdrop-blur-[2.5px] lg:px-8 bg-transparent"
          aria-label="Global"
        >
          <div className="flex lg:flex-1 ">
            <Link to="/" className="p-1.5">
              <span className="text-2xl font-bold capitalize z-10 text-white">
                HIREXA
              </span>
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="hidden lg:flex lg:gap-x-10 font-semibold text-stone-50">
            {navigation.map((item) => (
              <Tooltip
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                {item.name}
              </Tooltip>
            ))}
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {user.token ? (
              <button
                onClick={handleLogout}
                className="bg-white text-gray-900 px-3 py-0.5 rounded-md"
              >
                Logout <span aria-hidden="true">&rarr;</span>
              </button>
            ) : (
              <Link
                to={"/login"}
                className="bg-white text-gray-900 px-3 py-0.5 rounded-md"
              >
                Sign in <span aria-hidden="true">&rarr;</span>
              </Link>
            )}
          </div>
        </nav>

        <Sidebar
          key={"Sidebar"}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          navigation={navigation}
        />
      </header>
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <BackgroundSVG />
      </div>
    </div>
  );
}

/*
//search type 
 { <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full py-1 px-3 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Announcing our next round of funding.{" "}
              <a href="#" className="font-semibold text-indigo-600">
                <span className="absolute inset-0" aria-hidden="true" />
                Read more <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div> }

//
//SVG

{ <div className="fixed inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <svg
            className="relative bg-cyan-200  left-[calc(50%-11rem)] -z-10 h-[20.1875rem] max-w-none  -translate-x-1 rotate-[10deg] sm:left-[calc(50%-35rem)] sm:h-[42.375rem]"
            viewBox="0 0 1155 678"
          >
            <path
              fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
              fillOpacity=".4"
              d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
            />
            <defs>
              <linearGradient
                id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
                x1="1155.49"
                x2="-78.208"
                y1=".177"
                y2="474.645"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#9089FC" />
                <stop offset={1} stopColor="#FF80B5" />
                <stop offset={2} stopColor="#80D0C7" />
              </linearGradient>
            </defs>
          </svg>
          <svg
            className="relative bg-emerald-200 left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none  rotate-[0deg] sm:left-[calc(50%-35rem)] sm:h-[42.375rem]"
            viewBox="0 0 1155 678"
          >
            <path
              fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
              fillOpacity=".4"
              d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
            />
            <defs>
              <linearGradient
                id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
                x1="1155.49"
                x2="-78.208"
                y1=".177"
                y2="474.645"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#9089FC" />
                <stop offset={1} stopColor="#FF80B5" />
                <stop offset={2} stopColor="#80D0C7" />
              </linearGradient>
            </defs>
          </svg>
        </div> }

//


<div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
          <svg
            className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
            viewBox="0 0 1155 678"
          >
            <path
              fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
              fillOpacity=".3"
              d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
            />
            <defs>
              <linearGradient
                id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
                x1="1155.49"
                x2="-78.208"
                y1=".177"
                y2="474.645"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#9089FC" />
                <stop offset={1} stopColor="#FF80B5" />
              </linearGradient>
            </defs>
          </svg>
        </div>

*/
