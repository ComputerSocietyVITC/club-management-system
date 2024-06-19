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

type EmailType = "custom" | "allClubMembers" | "specificMembers";

export default function MailingSystem() {
  const { data: session } = useSession<SessionData>();
  const [emailType, setEmailType] = useState<EmailType>("custom");
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [subject, setSubject] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [criteria, setCriteria] = useState<{
    department: string;
    year: string;
  }>({
    department: "",
    year: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation for specific members
    if (emailType === "specificMembers") {
      if (!criteria.department || !criteria.year) {
        setError("Please provide both department and year.");
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
      formData.append("department", criteria.department);
      formData.append("year", criteria.year);
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
    } catch (error) {
      console.error("Error sending email:", error);
      setError("An error occurred while sending the email. Please try again.");
      setLoading(false);
    }
  };

  const userName = session?.user?.name || "";
  const userYear = userName.split(" ").pop()?.slice(-4) || "";
  console.log("session:", session?.user);

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
                <option value="custom">Custom List (CSV)</option>
                <option value="allClubMembers">All Club Members</option>
                <option value="specificMembers">Specific Members</option>
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
                  className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
                  required
                />
              </div>
            )}

            {emailType === "specificMembers" && (
              <div>
                <label className="block text-sm mb-2">
                  Specify Criteria {"  "}
                  <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Department (e.g., Technical)"
                  value={criteria.department}
                  onChange={(e) =>
                    setCriteria({ ...criteria, department: e.target.value })
                  }
                  className="w-full p-2 mb-2 border border-gray-600 rounded bg-gray-700 text-white"
                />
                <input
                  type="text"
                  placeholder={`Year (e.g., ${userYear})`}
                  value={criteria.year}
                  onChange={(e) =>
                    setCriteria({ ...criteria, year: e.target.value })
                  }
                  className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
                />
              </div>
            )}

            <div>
              <label className="block text-sm mb-2">Attachments</label>
              <input
                type="file"
                multiple
                onChange={handleAttachmentsChange}
                className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
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
            {loading ? (
              <button
                type="submit"
                className="w-full p-2 bg-blue-600 text-white rounded"
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
