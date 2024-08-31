"use client";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ProfileModalProps {
  className?: string;
  session: any; // Consider defining a more specific type if possible
}

interface Member {
  name: string | null;
  email: string;
  roleId: number;
  discordid: string | null;
  githubid: string | null;
}

const roles = ["Master", "OB", "Technical", "Management", "Design", "SMC"];

const ProfileModal = ({ className, session }: ProfileModalProps) => {
  const imageUrl = session?.user?.image.replace("=s96-c", "=s400-c");

  const [data, setData] = useState<Member>();

  useEffect(() => {
    fetch("/api/me")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  
  return (
    <section
      className={clsx(
        "flex flex-col bg-white/[0.05] border border-white/[0.2] rounded-3xl",
        "w-full h-full p-4 max-w-md mx-auto",
        className
      )}
    >
      <h2 className="text-2xl font-bold text-center mb-4">PROFILE</h2>
      <div className="flex justify-center mb-4">
        <Image
          src={imageUrl}
          width={150}
          height={150}
          alt="Profile Picture"
          className="rounded-full"
        />
      </div>
      {/* Profile details */}
      <div className="grid grid-cols-1 gap-4 text-lg">
        <div className="flex justify-between">
          <span className="font-semibold">Name:</span>
          <span>{data?.name || 'N/A'}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Email:</span>
          <span>{data?.email || 'N/A'}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Role:</span>
          <span>{data ? roles[data?.roleId - 1] : "Not Assigned"}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Discord ID:</span>
          <span>{data?.discordid || '[your Discord ID]'}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">GitHub ID:</span>
          <span>{data?.githubid || '[your GitHub ID]'}</span>
        </div>
      </div>
    </section>
  );
};

export default ProfileModal;
