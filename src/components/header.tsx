import Image from "next/image";
import { Lexend } from "next/font/google";

//use lexend
const lexend = Lexend({ subsets: ["latin"] });

export default function Header() {
  return (
    <section className="flex items-center p-2 bg-transparent">
      <Image src="/ieee-logo.webp" alt="logo" width={50} height={50} />
      <section
        className={`w-full text-2xl flex justify-center ${lexend.className} tracking-[1rem]`}
      >
        <section>CLUB MANAGEMENT SYSTEM</section>
      </section>
    </section>
  );
}
