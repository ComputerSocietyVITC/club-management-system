"use client";

import Header from "@/components/header";
import { useSession } from "next-auth/react";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";

type SessionData = {
  user: {
    name: string;
  };
};

type EmailType = "allClubMembers" | "specificMembers" | "custom";

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

  useEffect(() => {
    setError(null);
    setSuccess(false);
  }, [emailType]);

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

  const addRoleField = () => {
    setCriteria({ ...criteria, roles: [...criteria.roles, ""] });
  };

  const addYearField = () => {
    setCriteria({ ...criteria, years: [...criteria.years, ""] });
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
        setError("Couldnt send email. Please try again.");
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
      <div className="flex items-center justify-center min-h-screen">
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
                <option value="specificMembers">Specific Members</option>
                <option value="custom">Custom List (CSV)</option>
              </select>
            </div>

            {emailType === "custom" && (
              <div>
                <label className="block text-sm mb-2">
                  Upload CSV {"  "}
                  <span className="text-red-400">*</span>
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
                  Specify Criteria {"  "}
                  <span className="text-red-400">*</span>
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
                    {index === criteria.roles.length - 1 && (
                      <div className="flex flex-row items-center justify-center">
                        <button
                          type="button"
                          onClick={addRoleField}
                          className="ml-2 p-2 bg-blue-600 text-white rounded"
                        >
                          +
                        </button>

                        {index > 0 && (
                          <button
                            type="button"
                            onClick={removeLastRoleField}
                            className="ml-2 p-2 bg-red-500 text-white rounded"
                          >
                            -
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                ))}
                <p className="mt-8"> </p>
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
                    {index === criteria.years.length - 1 && (
                      <div className="flex flex-row items-center justify-center">
                        <button
                          type="button"
                          onClick={addYearField}
                          className="ml-2 p-2 bg-blue-600 text-white rounded"
                        >
                          +
                        </button>

                        {index > 0 && (
                          <button
                            type="button"
                            onClick={removeLastYearField}
                            className="ml-2 p-2 bg-red-500 text-white rounded"
                          >
                            -
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div>
              <label className="block text-sm mb-2">Attachments</label>
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

            <div>
              <label className="block text-sm mb-2">
                Subject {"  "}
                <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-2">
                Message {"  "}
                <span className="text-red-400">*</span>
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
                rows={4}
                required
              />
            </div>

            {error && <p className="text-red-400">{error}</p>}
            {success && (
              <p className="text-green-400">Email sent successfully!</p>
            )}
            {loading ? (
              <button
                type="submit"
                className="w-full p-2 bg-blue-900 text-white rounded"
                disabled
              >
                Sending...
              </button>
            ) : (
              <button
                type="submit"
                className="w-full p-2 bg-blue-600 text-white rounded"
              >
                Send Email
              </button>
            )}
          </form>
        </section>
      </div>
    </>
  );
}
