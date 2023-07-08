"use client"
import TodoCard from "./components/TodoCard";
import { useSession } from "next-auth/react";
export default  function Home() {
  const { data: session, status } = useSession();
  // console.log(status)
 if (status=== 'authenticated') {
  return  (
  <div>
  <h3 className="font-semibold text-right mx-2 mt-2">
          Hey,{session.user?.name}!
  </h3>
  <TodoCard
    email={session?.user?.email}
    // username={session?.user?.name}
    // Image={session?.user?.image}
  />
</div>
  )
 }else if(status === 'loading'){
  return (
    <>
    <div className="flex flex-col space-y-8 h-screen items-center justify-center">
      <div className="w-16 h-16  rounded-full border border-gray-600 border-b-gray-100 animate-spin"></div>
      <p className="font-mono text-lg ">Loading data please wait.....</p>
    </div>
    </>
  )
 }else{
  return(
    <>

      <div className="flex h-screen items-center justify-center space-x-2 ml-2 ">
        <div className="w-5 h-5 border-4 animate-spin border-gray-700 "></div>
       <p className="animate-pulse"> Login to continue</p>
        </div>
    </>
  )
 }
    
    

 
}
