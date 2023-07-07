"use client"
import Link from "next/link";
import { useSession } from "next-auth/react";

const Navbar =  () => {
  const {data} = useSession()
  return (
    <>
      <nav className="bg-gray-800 py-4">
        <div className="max-w-8xl  sm:px-4 lg:px-6 ">
          <div className="flex items-center justify-between w-full">
            <div className="">
              <a href="#" className="text-white font-bold text-xl">
              {data?.user?.email}
              </a>
            </div>
            <div className=" flex  ">
             {data? <Link
                  href={"/api/auth/signout"}
                  className="text-gray-300 self-end hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign Out
                </Link>:
                <>
                <Link
                href={"/api/signup"}
                className="text-gray-300 self-end hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
              Sign Up
              </Link>
                <Link
                href={"/api/auth/signin"}
                className="text-gray-300 self-end hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
              Sign IN
              </Link>
              </>
                }
               
              
            
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
