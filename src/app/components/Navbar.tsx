"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Link from "next/link";

const Navbar = () => {
  const router = useRouter();
  return (
    <>
      <nav className="bg-gray-800 py-4">
        <div className="max-w-8xl  sm:px-4 lg:px-6 ">
          <div className="flex items-center justify-between w-full">
            <div className="">
              <a href="#" className="text-white font-bold text-xl">
                Logo
              </a>
            </div>
            <div className=" flex  ">
              <Link href={'/api/auth/signout'} className="text-gray-300 self-end hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                Sign Out
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
