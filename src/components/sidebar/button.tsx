import Image from "next/image";
import { Lexend } from "next/font/google";

//use lexend
const lexend = Lexend({ subsets: ["latin"] });

export default function SideButton({
  text,
  href,
}: {
  text: string;
  href: string;
}) {
  return (
    <a href={href}>
      <section className="p-2 my-4 py-6 justify-center flex items-center rounded-2xl hover:bg-[#ffffff46] bg-transparent">
        {text}
      </section>
    </a>
  );
}
