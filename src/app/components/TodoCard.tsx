"use client";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { useRouter } from "next/navigation";

type TodoProps = {
  email: string | null | undefined;
  // username: string | null | undefined;
  // Image: string | null | undefined;
};
type Todos = {
  id: string;
  task: string;
  completed: boolean;
  userId: string | null;
};

const TodoCard = ({ email }: TodoProps) => {
  const Siteurl = process.env.NEXT_URL || "http://localhost:3000";
  const router = useRouter()
  const [Todo, Settodo] = useState<Todos[]>([]);
  const inputref = useRef<HTMLInputElement>(null);
  const FetchTodos = async () => {
    const fetchtodo = await fetch(`${Siteurl}/api/checktodos`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (fetchtodo.status === 200) {
      const todos: Todos[] = await fetchtodo.json();
      Settodo(todos);
    }
  };

  const handleDelete = async (e:React.FormEvent,id:string,userId:string | null) =>{

    const siteUrl = process.env.NEXT_URL
    const res = await fetch(`${siteUrl}/api/deletetodo`,{
      method:"POST",
      headers:{'Content-type':"application/json"},
      body:JSON.stringify({id,userId})
    })
    if (res.ok) {
      console.log("deleted")
      FetchTodos()
    }
  }

  const Handleadd = async (e: React.FormEvent) => {

    const task = inputref.current?.value;
    if (task?.length === 0) alert("please write something before adding");
    const res = await fetch(`${Siteurl}/api/addtodo`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ email, task }),
    });
    if (!res) throw new Error("some error occured");
 
    console.log("sucess");
  };
  useEffect(() => {
    FetchTodos();
  }, []);
  return (
    <div className="App flex flex-col items-center justify-center">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-4">ToDo App</h1>
        <div className=" mb-4">
          <form className="flex flex-col items-center" onSubmit={Handleadd}>
            <input
              type="text"
              ref={inputref}
              placeholder="Add ToDos..."
              className="border border-gray-300 rounded-md px-4 py-2 w-1/2 mb-2"
            />
            <button
              type="submit"
              className="bg-gray-800 text-white py-2 px-16 rounded-md cursor-pointer"
            >
              Add
            </button>
          </form>
        </div>
        <div className="list flex flex-col items-center">
          {Todo.length>=1 ? (
            Todo.map((todo) => (
              <>
                <div
                  key={todo.id}
                  className="todo hover:bg-gray-800 cursor-pointer bg-black shadow-md rounded-md p-4 mb-4 flex items-center justify-between w-1/2"
                >
                  <p className="text-lg text-white">{todo.task}</p>
                  <div className="icons flex gap-2">
                    <AiOutlineEdit className="cursor-pointer text-gray-100 text-xl h-6 mr-1" />
                    <BsTrash onClick={(e)=>{handleDelete(e,todo.id,todo.userId)}} className="cursor-pointer text-gray-100 text-xl" />
                  </div>
                </div>
              </>
            ))
          ) : (
            <>
              <div className="h-full flex items-center justify-center space-x-4">
                <div className="bg-gray-500  h-3 w-3 border-white border-3 animate-bounce "></div>
                <p className="font-mono text-lg animate-pulse ">Add some useful todos</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
