import clsx from "clsx";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
interface ProfileModalProps {
  className?: string;
  session: any;
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
  const imageUrl = session.data?.user?.image.replace("=s96-c", "=s400-c");
  const [data, setData] = useState<Member>();

  useEffect(() => {
    fetch("/api/me")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);
  return (
    <>
      <section
        className={clsx(
          "justify-center flex flex-col bg-white/[0.05]",
          "border border-white/[0.2] rounded-3xl to-black w-full h-full",
          className
        )}
      >
        <section className="p-4 text-3xl"> PROFILE </section>
        <Image
          src={imageUrl}
          width={200}
          height={200}
          alt="pfp"
          className="rounded-3xl self-center"
        />
        <section className="grid grid-cols-3 text-lg justify-center rounded-3xl p-4 border border-white/[0.2] bg-white/[0.05] m-8 text-left">
          <section className="">Name:</section>
          <section className="col-span-2">{data?.name}</section>
          <section className="">Email:</section>
          <section className="col-span-2">{data?.email}</section>
          <section className="">Role:</section>
          <section className="col-span-2">
            {data ? roles[data?.roleId - 1] : ""}
          </section>
          <section className="">Discord id:</section>
          <section className="col-span-2">{data?.discordid ||'[your Discord id]'}</section>
          <section className="">GitHub id:</section>
          <section className="col-span-2">{data?.githubid || '[your GitHub id]'}</section>
        </section>
      </section>
    </>
  );
};

export default ProfileModal;
