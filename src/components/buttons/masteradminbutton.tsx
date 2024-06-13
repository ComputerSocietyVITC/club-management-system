// components/MasterAdminButton.js
import React from "react";
import Link from "next/link";

const MasterAdminButton = () => {
  return (
    <Link href="/admin/master">
      <button className="border text-sm font-medium w-[150px] relative hover:bg-[#0f102a6f] border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full">
        Master Admin
      </button>
    </Link>
  );
};

export default MasterAdminButton;
