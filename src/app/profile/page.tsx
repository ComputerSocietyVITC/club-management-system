"use client";
import Header from "@/components/header";
import ProfileModal from "@/components/modals/profilemodal";
import AchievementsModal from "@/components/modals/Achievementsmodal";
import { FloatingNav } from "@/components/navbar";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      <Header />
      <FloatingNav />
      <section className="p-10 md:p-12 mt-6 lg:p-24">
        <div className="relative flex flex-col lg:flex-row gap-6 ">
          {/* Profile Modal Component */}
          <ProfileModal className="flex-1 mt-3 z-30" session={session} />

          {/* Achievements Modal Component */}
          <AchievementsModal className="flex-1 z-10 mt-3 lg:ml-6" />
        </div>
      </section>
    </>
  );
}
