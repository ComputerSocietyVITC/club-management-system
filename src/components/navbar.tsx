import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import navItems from "./paths";

export const FloatingNav = ({ className }: { className?: string }) => {
  const pathname = usePathname();

  const { scrollYProgress } = useScroll();

  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.3) {
        setVisible(false);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(true);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -200,
        }}
        animate={{
          y: visible ? 50 : -200,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.5,
        }}
        className={cn(
          "flex max-w-fit fixed inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] bg-[#9495aa11] rounded-full backdrop-blur-lg z-[5000] px-6 py-2 items-center",
          className
        )}
      >
        {navItems.map((navItem: any, idx: number) => (
          <React.Fragment key={idx}>
          <Link
            href={navItem.link}
            className="relative dark:text-neutral-50 mx-4 items-center flex text-neutral-600  hover:text-neutral-500"
          >
            <button className="border text-sm font-medium w-[150px] relative hover:bg-[#0f102a6f] border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full">
              <span className="hidden sm:block text-sm">{navItem.name}</span>
              {pathname === navItem.link ? (
                <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent h-px" />
              ) : (
                ""
              )}
            </button>
          </Link>
          </React.Fragment>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};
