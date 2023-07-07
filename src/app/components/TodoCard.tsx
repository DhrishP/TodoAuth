"use client";
import React, { useEffect, useRef, useState } from "react";

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
  const [Todo, Settodo] = useState<Todos[]>([]);
  const inputref = useRef<HTMLInputElement>(null);
  const FetchTodos = async () => {
    const fetchtodo = await fetch("http://localhost:3000/api/checktodos", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (fetchtodo.status === 200) {
      const todos: Todos[] = await fetchtodo.json();
      Settodo(todos);
    }
  };

  const Handleadd = async (e: React.FormEvent) => {
    const task = inputref.current?.value;
    if (task?.length === 0) alert("please write something before adding");
    const res = await fetch("http://localhost:3000/api/addtodo", {
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
          {Todo ? (
            Todo.map((todo) => (
              <>
                <div className="todo hover:bg-gray-800 cursor-pointer bg-black shadow-md rounded-md p-4 mb-4 flex items-center justify-between w-1/2">
                  <p className="text-lg text-white">{todo.task}</p>
                  <div className="icons flex gap-2">
                    <div className="icon cursor-pointer text-gray-500 text-xl">
                      Edit
                    </div>
                    <div className="icon cursor-pointer text-gray-500 text-xl">
                      Delete
                    </div>
                  </div>
                </div>
              </>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
