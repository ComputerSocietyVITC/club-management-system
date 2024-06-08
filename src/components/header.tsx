import Link from "next/link";
import navItems from "./paths";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Header = () => {
  const pathname = usePathname();

  return (
    <section className="flex w-[calc(100vw-10vw)] mt-8 mx-auto border border-transparent dark:border-white/[0.2] rounded-full bg-gradient-to-r from-black via-50% from-5% to-95% via-[#0414288f] to-black  z-[5000] px-8 py-2  items-center justify-around">
      {navItems.map((navItem: any, idx: number) => (
        <>
          <Link
            key={`link=${idx}`}
            href={navItem.link}
            className=" dark:text-neutral-50 transition duration-500 ease-in-out hover:scale-110 items-center flex text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
          >
            <button className="w-[150px] border text-sm font-medium relative hover:bg-[#0f0816] border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full">
              <span className="hidden sm:block text-sm font-light">
                {navItem.name}
              </span>
              {pathname === navItem.link ? (
                <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent h-px" />
              ) : (
                ""
              )}
            </button>
          </Link>
          {idx === navItems.length / 2 - 1 && (
            <Image
              height={50}
              width={50}
              quality={100}
              src="/comsoclogo.png"
              alt="IEEECS logo"
              className="rounded-2xl shadow-all-2xl  shadow-[#b1f8e6]"
            />
          )}
        </>
      ))}
    </section>
  );
};
export default Header;
