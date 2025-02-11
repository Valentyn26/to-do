"use client";

import TaskLists from "@/components/TaskLists";
import Button from "@/components/UI/Button";
import { useUserContext } from "@/contexts/UserContext";
import { getUserRole, logOut } from "@/firebase/auth";
import { auth } from "@/firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  const { user, setUser } = useUserContext();

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");

    if (!storedToken) return;
    const unsubscribe = onAuthStateChanged(auth, async (currentUser: any) => {
      if (currentUser) {
        const role = await getUserRole(currentUser.uid);
        setUser({ ...currentUser, role });
      }
    });

    return () => unsubscribe();
  }, []);

  function handleLogOut() {
    logOut()
    setUser(null);
  }

  return (
    <main>
      <header className="p-5 flex justify-end">
        {!user ?
          <Link href="/signin"
            className="px-4 py-2 rounded bg-blue-400 text-white"
          >
            Login
          </Link>
          :
          <Button onClick={() => handleLogOut()}>Logout</Button>
        }
      </header>
      <TaskLists />
    </main>
  );
}