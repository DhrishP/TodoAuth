
import TodoCard from "./components/TodoCard";
import { getServerSession } from "next-auth/next";
import { options } from "./api/auth/[...nextauth]/options";

export default async function Home() {
  const Session =await getServerSession(options)

  return (
    <>
      {Session ? (
        <TodoCard email={Session.user?.email} username={Session?.user?.name} />
      ) : (
        <p className="text-7xl font-semibold text-center mt-10 font-mono">
          You shall not pass
        </p>
      )}
    </>
  );
}
