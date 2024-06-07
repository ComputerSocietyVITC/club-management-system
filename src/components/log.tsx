"use client";
import { signIn } from "next-auth/react";
import { signOut } from "next-auth/react";

const Log = ({ choice }: { choice: "signin" | "signout" | "loading" }) => {
  if (choice === "signin") {
    return (
      <>
        <section className="flex items-center min-h-screen">
          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="flex items-center mx-auto border border-transparent transition duration-1000 ease-in-out scale-50 hover:scale-75 dark:border-white/[0.2] rounded-3xl bg-gradient-to-r from-black via-50% from-5% to-95% via-[#0414288f] to-black px-16 py-6 justify-around font-light text-white text-6xl"
          >
            Sign in with Google
          </button>
        </section>
      </>
    );
  } else if (choice === "loading") {
    return (
      <section className="flex items-center min-h-screen">
        <button className="flex items-center mx-auto justify-around font-light text-white text-4xl">
          Loading...
        </button>
      </section>
    );
  } else if (choice === "signout") {
    return (
      <>
        <section className="flex items-center min-h-screen">
          <button
            onClick={() => signOut()}
            className="flex items-center mx-auto border transition duration-1000 ease-in-out scale-50 hover:scale-75 border-transparent dark:border-white/[0.2] bg-gradient-to-r from-black via-50% from-5% to-95% via-[#0414288f] to-black px-16 rounded-full py-6 justify-around font-light text-white text-6xl"
          >
            Logout
          </button>
        </section>
      </>
    );
  }
};

export default Log;
