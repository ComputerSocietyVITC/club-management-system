"use client";
import Header from "@/components/header";
import ProfileModal from "@/components/modals/profilemodal";
import { FloatingNav } from "@/components/navbar";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Home() {
  const session = useSession();
  const [data, setData] = useState({ name: "" });

  useEffect(() => {
    fetch("/api/me")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);
  return (
    <>
      <section className="grid grid-cols-2 gap-4 mx-24 text-6xl text-center text-white items-center justify-center mt-48">
        <ProfileModal className="col-span-1" session={session} />
        <section className="col-span-1 w-full h-full p-8">
          <section className="text-center text-3xl">Achievements </section>
          <section className="my-12 text-left">
            <section className="text-xl">* achievement 1</section>      
            <section className="text-xl">* achievement 2</section>
            <section className="text-xl">* achievement 3</section>
            <section className="text-xl">* achievement 4</section>
          </section>
        </section>
      </section>
    </>
  );
}
// have to write a new modal for achievement and achievements should look like posts in instagram, that would look cool