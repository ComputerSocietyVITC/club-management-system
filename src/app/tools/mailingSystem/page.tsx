"use client";

import Header from "@/components/header";
import { useSession } from "next-auth/react";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";




type EmailType =
  | "allClubMembers"
  | "singleMember"
  | "specificMembers"
  | "custom";

const roles = ["Master", "OB", "Technical", "Management", "Design", "SMC"];
const years = ["2022", "2023", "2024"];

export default function MailingSystem() {
  const { data: session } = useSession();
  const [emailType, setEmailType] = useState<EmailType>("allClubMembers");
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [subject, setSubject] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [criteria, setCriteria] = useState<{
    roles: string[];
    years: string[];
  }>({
    roles: [""],
    years: [""],
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [members, setMembers] = useState<{ name: string; email: string }[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([""]);
  const [showFloatingNav, setShowFloatingNav] = useState(true);
  useEffect(() => {
    setError(null);
    setSuccess(false);
  }, [emailType]);

  useEffect(() => {
    // Fetch members to populate the dropdown for single member email
    async function fetchMembers() {
      try {
        const response = await axios.get("/api/members");
        setMembers(response.data);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    }

    fetchMembers();
  }, []);
  

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setCsvFile(e.target.files[0]);
    }
  };

  const handleAttachmentsChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments(Array.from(e.target.files));
    }
  };

  const handleRoleChange = (index: number, value: string) => {
    const newRoles = [...criteria.roles];
    newRoles[index] = value;
    setCriteria({ ...criteria, roles: newRoles });
  };

  const handleYearChange = (index: number, value: string) => {
    const newYears = [...criteria.years];
    newYears[index] = value;
    setCriteria({ ...criteria, years: newYears });
  };

  const handleMemberChange = (index: number, value: string) => {
    const newSelectedMembers = [...selectedMembers];
    newSelectedMembers[index] = value;
    setSelectedMembers(newSelectedMembers);
  };

  const addRoleField = () => {
    setCriteria({ ...criteria, roles: [...criteria.roles, ""] });
  };

  const addYearField = () => {
    setCriteria({ ...criteria, years: [...criteria.years, ""] });
  };

  const addMemberField = () => {
    setSelectedMembers([...selectedMembers, ""]);
  };

  const removeLastRoleField = () => {
    if (criteria.roles.length > 1) {
      setCriteria({
        ...criteria,
        roles: criteria.roles.slice(0, -1),
      });
    }
  };

  const removeLastYearField = () => {
    if (criteria.years.length > 1) {
      setCriteria({
        ...criteria,
        years: criteria.years.slice(0, -1),
      });
    }
  };

  const removeLastMemberField = () => {
    if (selectedMembers.length > 1) {
      setSelectedMembers(selectedMembers.slice(0, -1));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (emailType === "specificMembers") {
      if (
        criteria.roles.some((role) => role === "") ||
        criteria.years.some((year) => year === "")
      ) {
        setError("Please provide all roles and years.");
        return;
      }
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("emailType", emailType);
    formData.append("subject", subject);
    formData.append("message", message);

    if (emailType === "custom" && csvFile) {
      formData.append("csvFile", csvFile);
    }

    if (emailType === "specificMembers") {
      formData.append("roles", JSON.stringify(criteria.roles));
      formData.append("years", JSON.stringify(criteria.years));
    }

    if (emailType === "singleMember") {
      selectedMembers.forEach((member) =>
        formData.append("recipients", member),
      );
    }

    attachments.forEach((file) => formData.append("attachments", file));

    try {
      const response = await axios.post("/api/mail", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Email sent successfully:", response.data);
      setLoading(false);
      setSuccess(true);
    } catch (error: any) {
      console.error("Error sending email:", error);
      if (error.response && error.response.status === 401) {
        setError(
          "Unauthorized: You do not have permission to perform this action.",
        );
      } else if (error.response && error.response.status === 500) {
        setError("Couldn't send email. Please try again.");
      } else {
        setError(
          "An error occurred while sending the email. Please try again.",
        );
      }
      setLoading(false);
    }
  };

  const userName = session?.user?.name || "";
  const userYear = userName.split(" ").pop()?.slice(-4) || "";

  return (
    <>
      <Header />
      
      <div className="flex items-center justify-center min-h-screen mt-20">
        <section className="w-full max-w-lg p-8 bg-gray-800 bg-opacity-20 rounded-lg shadow-md text-white">
          <h2 className="text-center text-2xl mb-6">Send Email</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-2">Select Email Type:</label>
              <select
                value={emailType}
                onChange={(e) => setEmailType(e.target.value as EmailType)}
                className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
              >
                <option value="allClubMembers">All Club Members</option>
                <option value="singleMember">Single Member</option>
                <option value="specificMembers">Specific Members</option>
                <option value="custom">Custom List (CSV)</option>
              </select>
            </div>

            {emailType === "custom" && (
              <div>
                <label className="block text-sm mb-2">
                  Upload CSV <span className="text-red-400">*</span>
                </label>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  required
                  className="block w-full text-sm text-slate-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm
                    file:bg-gray-700 file:text-white
                    hover:file:bg-gray-700
                  "
                />
              </div>
            )}

            {emailType === "specificMembers" && (
              <div>
                <label className="block text-sm mb-2">
                  Specify Criteria <span className="text-red-400">*</span>
                </label>
                {criteria.roles.map((role, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <select
                      value={role}
                      onChange={(e) => handleRoleChange(index, e.target.value)}
                      className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
                    >
                      <option value="">Select Role</option>
                      {roles.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={removeLastRoleField}
                      className="ml-2 px-4 py-2 bg-red-500 text-white rounded"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addRoleField}
                  className="w-full px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Add Role
                </button>

                {criteria.years.map((year, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <select
                      value={year}
                      onChange={(e) => handleYearChange(index, e.target.value)}
                      className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
                    >
                      <option value="">Select Year</option>
                      {years.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={removeLastYearField}
                      className="ml-2 px-4 py-2 bg-red-500 text-white rounded"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addYearField}
                  className="w-full px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Add Year
                </button>
              </div>
            )}

            {emailType === "singleMember" && (
              <div>
                <label className="block text-sm mb-2">
                  Select Member(s): <span className="text-red-400">*</span>
                </label>
                {selectedMembers.map((member, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <select
                      value={member}
                      onChange={(e) => handleMemberChange(index, e.target.value)}
                      className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
                    >
                      <option value="">Select Member</option>
                      {members.map((member) => (
                        <option key={member.email} value={member.email}>
                          {member.name}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={removeLastMemberField}
                      className="ml-2 px-4 py-2 bg-red-500 text-white rounded"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addMemberField}
                  className="w-full px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Add Member
                </button>
              </div>
            )}

            <div>
              <label className="block text-sm mb-2">
                Subject: <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
              />
            </div>

            <div>
              <label className="block text-sm mb-2">
                Message: <span className="text-red-400">*</span>
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Attachments:</label>
              <input
                type="file"
                multiple
                onChange={handleAttachmentsChange}
                className="block w-full text-sm text-slate-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm
                  file:bg-gray-700 file:text-white
                  hover:file:bg-gray-700
                "
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 bg-green-500 text-white rounded"
            >
              {loading ? "Sending..." : "Send Email"}
            </button>

            {success && (
              <p className="text-green-500 text-center">Email sent successfully!</p>
            )}

            {error && (
              <p className="text-red-500 text-center">{error}</p>
            )}
          </form>
        </section>
      </div>
    </>
  );
}
