"use client"
import { redirect } from 'next/dist/server/api-utils';
import React from 'react'

const Navbar = () => {
    const handlesignout = (e:React.FormEvent) =>{
        e.preventDefault()
    }
    const handlesignIN = (e:React.FormEvent) =>{
        e.preventDefault()
        
    }
    const isLoggedIn=0;
  return (
   <>
     <nav className="bg-gray-800 py-4">
      <div className="max-w-8xl  sm:px-4 lg:px-6 ">
        <div className="flex items-center justify-between w-full">
          <div className="">
            <a href="#" className="text-white font-bold text-xl">Logo</a>
          </div>
          <div className=" flex  ">
            {isLoggedIn  ? (
              <button onClick={handlesignout} className="text-gray-300 self-end hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Sign Out</button>
            ) : (
              <button onClick={handlesignIN} className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Sign In</button>
            )}
          </div>
        </div>
      </div>
    </nav>
   
   </>
  )
}

export default Navbar