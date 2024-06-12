"use client";
import { useState, useEffect } from "react";

interface Member {
  name: string | null;
  email: string;
  roleId: number;
  discordid: string;
}

const Page = () => {
  const [newMember, setNewMember] = useState<Member>({
    name: "",
    email: "",
    roleId: 0,
    discordid: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    async function fetchMembers() {
      const response = await fetch("/api/members", { method: "GET" });
      setMembers(await response.json());
    }
    fetchMembers();
  }, []);

  const handleAddMember = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(newMember);
    const response = await fetch("/api/members", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMember),
    });
    const addedMember = await response.json();
    setMembers([...members, addedMember]);
    setNewMember({ name: "", email: "", roleId: 0, discordid: "" });
  };

  const handleEditMember = async (memberemail: string) => {
    const memberToEdit = members.find((member) => member.email === memberemail);
    if (memberToEdit) {
      setIsEditing(true);
      setNewMember(memberToEdit);
    }
  };

  const handleDeleteMember = async (memberemail: string) => {
    await fetch(`/api/members/${memberemail}`, {
      method: "DELETE",
    });
    setMembers(members.filter((member) => member.email !== memberemail));
  };

  return (
    <>
      <section className="w-screen py-16" />
      <section className="flex justify-center min-h-screen text-white">
        <section className="bg-red-500">
          {/* Display Members */}
          {members.map((member, idx) => (
            <div key={idx} className="bg-blue-500">
              <span>{member.name}</span>
              <span>{member.email}</span>
              <span>{member.roleId}</span>
              <span>{member.discordid}</span>
              <button onClick={() => handleEditMember(member.email)}>
                Edit
              </button>
              <button onClick={() => setDeleteConfirmation(member.email)}>
                Delete
              </button>
            </div>
          ))}

          {/* Add/Edit Member Form */}
          <form onSubmit={handleAddMember} className="text-black">
            <input
              type="text"
              placeholder="Name"
              value={newMember.name || ""}
              onChange={(e) =>
                setNewMember({ ...newMember, name: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="Email"
              value={newMember.email}
              onChange={(e) =>
                setNewMember({ ...newMember, email: e.target.value })
              }
              required
            />
            <input
              type="number"
              placeholder="Role ID"
              value={newMember.roleId}
              onChange={(e) =>
                setNewMember({ ...newMember, roleId: Number(e.target.value) })
              }
            />
            <input
              type="text"
              placeholder="Discord ID"
              value={newMember.discordid}
              onChange={(e) =>
                setNewMember({ ...newMember, discordid: e.target.value })
              }
            />
            <button type="submit">
              {isEditing ? "Update Member" : "Add Member"}
            </button>
          </form>

          {/* Delete Confirmation Dialog */}
          {deleteConfirmation && (
            <div>
              <p>Are you sure you want to delete this member?</p>
              <button
                onClick={() => {
                  handleDeleteMember(deleteConfirmation);
                  setDeleteConfirmation("");
                }}
              >
                Yes
              </button>
              <button onClick={() => setDeleteConfirmation("")}>No</button>
            </div>
          )}
        </section>
      </section>
    </>
  );
};

export default Page;
