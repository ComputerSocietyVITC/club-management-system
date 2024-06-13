"use client";
import DeleteConfirmationModal from "@/components/modals/deleteconfirmation";
import { useState, useEffect } from "react";

interface Member {
  name: string | null;
  email: string;
  roleId: number;
  discordid: string;
  githubid: string;
}

const Page = () => {
  const [newMember, setNewMember] = useState<Member>({
    name: "",
    email: "",
    roleId: 0,
    discordid: "",
    githubid: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [members, setMembers] = useState<Member[]>([]);

  const roles = ["Master", "OB", "Technical", "Management", "Design", "SMC"];
  useEffect(() => {
    async function fetchMembers() {
      const response = await fetch("/api/members", { method: "GET" });
      setMembers(await response.json());
    }
    fetchMembers();
  }, []);

  const handleAddMember = async (event: React.FormEvent) => {
    event.preventDefault();
    const memberExists = members.some(
      (member) => member.email === newMember.email
    );

    if (!isEditing && !memberExists) {
      const response = await fetch("/api/members", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMember),
      });
      const addedMember = await response.json();
      setMembers([...members, addedMember]);
    } else if (isEditing && !memberExists) {
      console.log("It ain't possible to edit a non-existent member");
    } else if (!isEditing && memberExists) {
      console.log("Member already exists");
    } else {
      const response = await fetch(`/api/members/${newMember.email}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMember),
      });
      const updatedMember = await response.json();
      setMembers(
        members.map((member) =>
          member.email === newMember.email ? updatedMember : member
        )
      );
      setIsEditing(false);
    }
    setNewMember({
      name: "",
      email: "",
      roleId: 0,
      discordid: "",
      githubid: "",
    });
  };

  const handleEditMember = async (memberemail: string) => {
    const memberToEdit = members.find((member) => member.email === memberemail);
    if (memberToEdit) {
      setIsEditing(true);
      setNewMember(memberToEdit);
    }
  };

  const handleDeleteMember = async (memberemail: string) => {
    try {
      const response = await fetch(`/api/members/${memberemail}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete the member");
      }
      // Update the state only if the deletion was successful
      setMembers(members.filter((member) => member.email !== memberemail));
    } catch (error) {
      console.error("Error deleting member:", error);
      // Optionally, revert the UI change or notify the user
    }
  };

  return (
    <>
      <section className="w-screen py-16" />
      <section className="flex justify-center min-h-screen text-white m-6">
        <section className="border border-white/[0.2] rounded-3xl p-12">
          {/* Display Members */}
          <div className="grid grid-rows-6 text-center gap-4 p-12">
            {/* Header Row */}
            <div className="grid grid-cols-6 gap-2 items-center font-medium text-xl border-[1px] p-2 rounded-3xl border-white/[0.2]">
              <span className="col-span-1">Name</span>
              <span className="col-span-1">Email</span>
              <span className="col-span-1">Role</span>
              <span className="col-span-1">Discord</span>
              <span className="col-span-1">GitHub</span>
              <span className="col-span-1">Actions</span>{" "}
              {/* Placeholder for the edit/delete buttons */}
            </div>
            {/* Adjust the number of columns and gap as needed */}
            {members.map((member, idx) => (
              <div key={idx} className="grid grid-cols-6 gap-2 items-center text-sm">
                {/* This ensures each member's info is in one row */}
                <span className="col-span-1">{member.name}</span>
                <span className="col-span-1">{member.email}</span>
                <span className="col-span-1">{roles[member.roleId - 1]}</span>
                <span className="col-span-1">{member.discordid}</span>
                <span className="col-span-1">{member.githubid}</span>
                <div className="col-span-1 flex justify-around">
                  {/* Adjust buttons layout */}
                  <button
                    onClick={() => handleEditMember(member.email)}
                    className="border border-white/[0.2] rounded-xl px-6 transition duration-100 ease-in-out scale-100 hover:scale-110 hover:bg-blue-950"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setDeleteConfirmation(member.email)}
                    className="border border-white/[0.2] rounded-xl px-6 transition duration-100 ease-in-out scale-100 hover:scale-110 hover:bg-red-950"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add/Edit Member Form */}
          <form
            onSubmit={handleAddMember}
            className="text-white border border-white/[0.2] rounded-3xl p-6 mx-6 my-3 flex justify-around"
          >
            <input
              type="text"
              className="text-center bg-transparent border border-white/[0.2] rounded-3xl p-1 m-1"
              placeholder="Name"
              value={newMember.name || ""}
              onChange={(e) =>
                setNewMember({ ...newMember, name: e.target.value })
              }
            />
            <input
              type="email"
              className="text-center bg-transparent border border-white/[0.2] rounded-3xl p-1 m-1"
              placeholder="Email"
              value={newMember.email}
              onChange={(e) =>
                setNewMember({ ...newMember, email: e.target.value })
              }
              required
            />
            <select
              className="text-center bg-transparent text-white border border-white/[0.2] rounded-3xl p-1.5 px-3 m-1"
              value={newMember.roleId}
              onChange={(e) =>
                setNewMember({ ...newMember, roleId: Number(e.target.value) })
              }
              required
            >
              <option value="" selected>
                Role
              </option>
              {roles.map((role, idx) => (
                <option key={idx} value={idx + 1}>
                  {role}
                </option>
              ))}
            </select>
            <input
              type="text"
              className="text-center bg-transparent border border-white/[0.2] rounded-3xl p-1 m-1"
              placeholder="Discord ID"
              value={newMember.discordid}
              onChange={(e) =>
                setNewMember({ ...newMember, discordid: e.target.value })
              }
            />
            <input
              type="text"
              className="text-center bg-transparent border border-white/[0.2] rounded-3xl p-1 m-1"
              placeholder="Github ID"
              value={newMember.githubid}
              onChange={(e) =>
                setNewMember({ ...newMember, githubid: e.target.value })
              }
            />
            <button
              type="submit"
              className="rounded-3xl px-6 border border-white/[0.2] text-white p-1 m-1 transition duration-100 ease-in-out scale-100 hover:scale-110 hover:bg-green-950"
            >
              {isEditing ? "Update Member" : "Add Member"}
            </button>
          </form>

          {/* Delete Confirmation Dialog */}
          {deleteConfirmation && (
            <DeleteConfirmationModal
              deleteConfirmation={deleteConfirmation}
              handleDeleteMember={handleDeleteMember}
              setDeleteConfirmation={setDeleteConfirmation}
            />
          )}
        </section>
      </section>
    </>
  );
};

export default Page;
