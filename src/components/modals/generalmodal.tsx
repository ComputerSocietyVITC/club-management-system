import Link from "next/link";
import React, { useState } from "react";
import clsx from "clsx";

interface GeneralModalProps {
  className?: string;
  content: string;
  isButton?: boolean;
  isIframe?: boolean;
  redirectTo?: string;
}

const GeneralModal: React.FC<GeneralModalProps> = ({
  className,
  content,
  isButton,
  isIframe,
  redirectTo,
}) => {
  return (
    <>
      {isButton ? (
        <Link
          href={redirectTo || "/"}
          className={clsx("w-full h-full", className)}
        >
          <button
            className={clsx(
              "border border-t-white/[0.2] border-b-white/[0.5] border-l-white/[0.2]",
              "border-r-white/[0.2] transition ease-in-out duration-500 rounded-3xl bg-gradient-to-b from-black via-[#07142d9c] hover:via-[#07232d8e] from-5% to-95% to-black p-4 w-full h-full",
              className
            )}
          >
            <section className="">{content}</section>
          </button>
        </Link>
      ) : (
        ""
      )}
      {isIframe ? (
        <section
          className={clsx(
            "border border-t-white/[0.2] border-b-white/[0.5] border-l-white/[0.2]",
            "border-r-white/[0.2] rounded-3xl bg-white bg-opacity-[10px]",
            className
          )}
        >
          <iframe src={redirectTo} title={content} />
        </section>
      ) : (
        ""
      )}
    </>
  );
};

export default GeneralModal;
