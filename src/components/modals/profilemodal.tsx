"use client";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaEdit, FaSave } from "react-icons/fa";

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
  const imageUrl = session?.user?.image.replace("=s96-c", "=s400-c");
  // State for user profile data
  const [data, setData] = useState<Member>();

   // State to toggle editing mode
  const [isEditing, setIsEditing] = useState<boolean>(false);

    // State for profile fields being edited (currently only Discord and GitHub IDs)
  const [profile, setProfile] = useState<{ githubid: string | null; discordid: string | null }>({
    githubid: null,
    discordid: null,
  });

    /**
   * Fetch user data when the component mounts.
   */

  useEffect(() => {
    fetch("/api/me")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setProfile({
          githubid: data?.githubid || null,
          discordid: data?.discordid || null,
        });
      });
  }, []);


  /**
   * Toggles editing mode.
   */

  const handleEditClick = () => setIsEditing(!isEditing);

  
  /**
   * Saves the updated profile data to the server.
   */
  const handleSaveClick = () => {
    
    fetch(`/api/members/${data?.email}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profile),
    })
      .then((res) => res.json())
      .then((updatedData) => {
        setData(updatedData);
        setIsEditing(false);
      });
  };

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
      <div className="grid grid-cols-1 gap-4 text-lg">
        <div className="flex justify-between">
          <span className="font-semibold">Name:</span>
          <span>{data?.name || "N/A"}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Email:</span>
          <span>{data?.email || "N/A"}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Role:</span>
          <span>{data ? roles[data.roleId - 1] : "Not Assigned"}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Discord ID:</span>
          {isEditing ? (
            <input
              type="text"
              value={profile.discordid || ""}
              onChange={(e) => setProfile(prev => ({ ...prev, discordid: e.target.value }))}
              className="border rounded p-1"
            />
          ) : (
            <span>{profile.discordid || "[your Discord ID]"}</span>
          )}
        </div>
        <div className="flex justify-between items-center">
          <span className="font-semibold">GitHub ID:</span>
          {isEditing ? (
            <input
              type="text"
              value={profile.githubid || ""}
              onChange={(e) => setProfile(prev => ({ ...prev, githubid: e.target.value }))}
              className="border rounded p-1"
            />
          ) : (
            <span>{profile.githubid || "[your GitHub ID]"}</span>
          )}
        </div>
        <div className="flex justify-end mt-4">
          {isEditing ? (
            <FaSave className="text-xl cursor-pointer" onClick={handleSaveClick} />
          ) : (
            <FaEdit className="text-xl cursor-pointer" onClick={handleEditClick} />
          )}
        </div>
      </div>
    </section>
  );
};

export default ProfileModal;
