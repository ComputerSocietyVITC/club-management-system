import Image from "next/image";
import { Lexend } from "next/font/google";
import SideButton from "./sidebar/button";

//use lexend
const lexend = Lexend({ subsets: ["latin"] });

export default function Sidebar() {
  return (
    <section className="w-1/6 p-2 bg-[#0e383753] justify-between items-center flex border-r-[1px] border-zinc-600">
      <section className="items-center flex-grow">
        <SideButton text="Dashboard" href="/" />

        <SideButton text="Events" href="/" />
        <SideButton text="Projects" href="/" />

        <SideButton text="Leaderboard" href="/" />

        <SideButton text="Documentations" href="/" />
      </section>
    </section>
  );
}
