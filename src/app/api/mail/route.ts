import { NextRequest, NextResponse } from "next/server";
import { session } from "../../../lib/auth";
const nodemailer = require("nodemailer"); // not using es6 syntanx because linter complains
import { parse } from "csv-parse/sync";

let responseJson: any[] = [];

async function getMembers(baseUrl: string, cookie: string) {
  const response = await fetch(`${baseUrl}/api/members`, {
    method: "GET",
    headers: {
      Cookie: cookie,
    },
  });

  responseJson = await response.json();

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
  const cookie = req.headers.get("cookie") || "";
  await getMembers(baseUrl, cookie);

  // allowing only master role members to send emails
  const masters = responseJson.filter((member: any) => member.roleId === 1);
  const masterEmails = masters.map((member) => member.email);

  if (!masterEmails.includes(isSession?.user?.email)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

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
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const emailPromises = recipients.map((recipient) => {
    return transporter
      .sendMail({
        from: '"IEEE CMS" <ieeecsvitc@gmail.com>',
        to: recipient,
        subject: subject,
        html: message,
        attachments: attachments,
      })
      .then((info: any) => {
        console.log("Message sent to: %s", recipient);
        console.log("Message sent: %s", info.messageId);
      })
      .catch((error: Error) => {
        console.log("Error sending email to %s: %s", recipient, error.message);
        return NextResponse.json(
          { message: "Error sending emails", error: error.message },
          { status: 500 },
        );
      });
  });

  await Promise.all(emailPromises);

  return NextResponse.json({ message: "Emails sent successfully" });
}

async function getAllClubMembers(): Promise<string[]> {
  const data = responseJson.map((member) => member.email);
  return data;
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
  const filteredMembers = responseJson.filter(
    (member) => roleIds.includes(member.roleId) && years.includes(member.year),
  );
  const filteredEmails = filteredMembers.map((member) => member.email);

  return filteredEmails;
}
