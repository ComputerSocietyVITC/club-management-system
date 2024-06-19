import { NextRequest, NextResponse } from "next/server";
import { session } from "../../../lib/auth";
const nodemailer = require("nodemailer");
import { parse } from "csv-parse/sync";

let responseJson: any[] = [];

async function getMembers(baseUrl: string, cookie: string) {
  const response = await fetch(`${baseUrl}/api/members`, {
    method: "GET",
    headers: {
      Cookie: cookie, // Include the session cookie in the headers
    },
  });

  responseJson = await response.json();
  console.log("Response JSON: ", responseJson);

  const yearRegex = /\d{4}/;
  responseJson.forEach((member: any) => {
    const match = member.email.match(yearRegex);

    if (match) {
      member.year = match[0];
    } else {
      member.year = null;
    }
  });
}

export async function POST(req: NextRequest, res: NextResponse) {
  const isSession = await session(req, res);

  if (!isSession) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const baseUrl = req.nextUrl.origin;
  const cookie = req.headers.get("cookie") || ""; // Get the session cookie
  await getMembers(baseUrl, cookie);

  const formData = await req.formData();
  const emailType = formData.get("emailType") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  let recipients: string[] = [];

  console.log("Email Type: %s", emailType);

  if (emailType === "custom") {
    const csvFile = formData.get("csvFile") as File;
    console.log("CSV FILE: ", csvFile);
    if (csvFile) {
      const csvText = await csvFile.text();
      console.log("CSV Text: ", csvText);

      // checking csv header
      const firstLine = csvText.split("\n")[0];
      let records;

      if (firstLine.includes("@")) {
        // if no header
        records = parse(csvText, {
          trim: true,
          skip_empty_lines: true,
        });
        recipients = records.flat();
      } else {
        records = parse(csvText, {
          columns: true,
          trim: true,
          skip_empty_lines: true,
        });
        recipients = records.map((record: any) => record.email);
      }

      console.log("Parsed Records: ", records);
      console.log("Recipients: %s", recipients.join(", "));
    }
  } else if (emailType === "allClubMembers") {
    recipients = await getAllClubMembers();
  } else if (emailType === "specificMembers") {
    const roles = JSON.parse(formData.get("roles") as string);
    const years = JSON.parse(formData.get("years") as string);
    recipients = await getSpecificMembers(roles, years);
  }

  const attachments: any[] = [];
  const attachmentFiles = formData.getAll("attachments") as File[];
  for (const file of attachmentFiles) {
    attachments.push({
      filename: file.name,
      content: Buffer.from(await file.arrayBuffer()),
    });
  }

  console.log("Final Recipients: %s", recipients.join(", "), subject, message);

  const transporter = nodemailer.createTransport({
    host: "localhost",
    port: 2525,
    secure: false,
    auth: {
      user: "username",
      pass: "password",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // Create an array of promises for sending emails
  const emailPromises = recipients.map((recipient) => {
    return transporter
      .sendMail({
        from: '"IEEE CMS" <ieeecsvitc@gmail.com>',
        to: recipient,
        subject: subject,
        html: `<h1>IEEE CMS</h1><b>${message}</b>`,
        attachments: attachments,
      })
      .then((info) => {
        console.log("Message sent to: %s", recipient);
        console.log("Message sent: %s", info.messageId);
      })
      .catch((error) => {
        console.log("Error sending email to %s: %s", recipient, error.message);
      });
  });

  // Wait for all email promises to complete
  await Promise.all(emailPromises);

  return NextResponse.json({ message: "Emails sent successfully" });
}

const members = [
  {
    name: "Karan Kumar",
    discordid: "",
    email: "karan.kumar2023@vitstudent.ac.in",
    githubid: "",
    roleId: 1,
    year: "2023",
  },
  {
    name: "Aviral Kumar",
    discordid: "",
    email: "aviral.kumar2022@vitstudent.ac.in",
    githubid: "",
    roleId: 2,
    year: "2022",
  },
];

async function getAllClubMembers(): Promise<string[]> {
  const data = members.map((member) => member.email);
  console.log("All club members: ", data);
  return [];
}

async function getSpecificMembers(
  roles: string[],
  years: string[],
): Promise<string[]> {
  const rolesList = [
    "Master",
    "OB",
    "Technical",
    "Management",
    "Design",
    "SMC",
  ];

  const roleIds = roles
    .map((role) => rolesList.indexOf(role) + 1)
    .filter((roleId) => roleId > 0);

  const filteredMembers = members.filter(
    (member) => roleIds.includes(member.roleId) && years.includes(member.year),
  );

  const filteredEmails = filteredMembers.map((member) => member.email);

  console.log("Filtered members: ", filteredMembers);
  return [];
}
