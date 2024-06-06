"use client";
import Header from "@/components/header";
import { FloatingNav } from "@/components/navbar";

export default function Home() {
  return (
    <>
      <FloatingNav />
      <Header />

      <section className="h-[2000px] text-6xl text-center text-white flex items-center justify-center">
        <section>
          Hello <section>SAM SHERVIN</section>
        </section>
      </section>
    </>
  );
}
