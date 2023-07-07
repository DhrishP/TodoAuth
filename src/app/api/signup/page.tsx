"use client"
import { useRouter } from "next/navigation";
import React from "react";
import { FormEvent } from "react";




const SignUpModal = () => {
  const router = useRouter()
 
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    const Siteurl = process.env.NEXT_URL || 'http://localhost:3000';
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") || "";
    const email = formData.get("email") || "";
    const password = formData.get("password") || "";
    if (!(email || password || username )) {
      alert("enter the credentials");
    }
    const res = await fetch(`${Siteurl}/api/Users`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email, password,username }),
    });
    if (!res.ok) alert("Credentials already exists");
    else{
      router.push('/api/auth/signin')
    }
   
    
   
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block mb-2">
              Username
            </label>
            <input
              type="text"
            
              name="username"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your email"
              required
            />
            <label htmlFor="email" className="block mb-2">
              Email
            </label>
            <input
              type="email"
             
              name="email"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2">
              Password
            </label>
            <input
              type="password"
            
              name="password"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpModal;
