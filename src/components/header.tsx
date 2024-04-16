import Image from "next/image";
import { Lexend } from "next/font/google";
import styles from "@/styles/header.module.css";

//use lexend
const lexend = Lexend({ subsets: ["latin"] });

export default function Header() {
  return (
    <section className="flex items-center p-2 bg-[#181A1B] fixed z-10 opacity-100 w-screen">
      <Image src="/ieee-logo.webp" alt="logo" width={50} height={50} />
      <section
        className={`w-full text-2xl flex justify-center ${lexend.className} tracking-[1rem]`}
      >
        <section className={styles.heading}>CLUB MANAGEMENT SYSTEM</section>
        <section className={styles.heading2}>CMS</section>
      </section>
    </section>
  );
}
