"use server";

import { NextRequest, NextResponse } from "next/server";
import { session } from "../../../lib/auth";
const nodemailer = require("nodemailer");
import { parse } from "csv-parse/sync";

export async function POST(req: NextRequest, res: NextResponse) {
  const isSession = await session(req, res);

  if (!isSession) {
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
    const department = formData.get("department") as string;
    const year = formData.get("year") as string;
    recipients = await getSpecificMembers(department, year);
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

async function getAllClubMembers(): Promise<string[]> {
  return ["karan.kumar2023@vitstudent.ac.in"];
}

async function getSpecificMembers(
  department: string,
  year: string,
): Promise<string[]> {
  return ["karan.kumar2023@vitstudent.ac.in"];
}
