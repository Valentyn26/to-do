"use client";

import TaskLists from "@/components/TaskList";
import { logOut } from "@/firebase/auth";
import { auth } from "@/firebase/firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");

    if (!storedToken) return;
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
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
          <button type="button" onClick={() => handleLogOut()}
            className="px-4 py-2 rounded bg-blue-400 text-white"
          >
            Logout
          </button>
        }
      </header>
    </main>
  );
}
