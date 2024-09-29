"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getCurrentUser, getUserRole, signOut } from "../utils/auth";
export default function Layout({ children }) {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      if (currentUser) {
        const role = await getUserRole(currentUser.id);
        setUserRole(role);
      }
    };
    fetchUser();
  }, []);
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4">
        <nav className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            TaskWise
          </Link>
          <div>
            {user ? (
              <>
                <Link href="/projects" className="mr-4">
                  Projects
                </Link>
                {userRole === "admin" && (
                  <>
                    <Link href="/admin/users" className="mr-4">
                      User Management
                    </Link>
                    <Link href="/analytics" className="mr-4">
                      Analytics
                    </Link>
                  </>
                )}
                <button onClick={signOut}>Sign Out</button>
              </>
            ) : (
              <Link href="/auth">Sign In</Link>
            )}
          </div>
        </nav>
      </header>
      <main className="flex-grow container mx-auto p-4">{children}</main>
      <footer className="bg-gray-200 p-4 text-center">© 2024 TaskWise</footer>
    </div>
  );
}
