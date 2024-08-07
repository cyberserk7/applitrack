import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface OTPEmailProps {
  name: string;
  companyName: string;
  jobTitle: string;
  interviewDate: Date;
}

export const ReminderEmail = ({
  companyName,
  jobTitle,
  interviewDate,
  name,
}: OTPEmailProps) => (
  <Html>
    <Head />
    <Preview>
      Interview Reminder: {companyName} - {jobTitle}
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src="https://utfs.io/f/428a61d4-b6eb-4518-93a1-0c6852d4cf3a-smzzpw.png"
          width="32"
          height="32"
          alt="AppliTrack"
        />

        <Text style={title}>Interview Reminder</Text>

        <Section style={section}>
          <Text style={text}>
            Hey <strong>{name}</strong>!
          </Text>
          <Text style={text}>
            This is a friendly reminder about your upcoming interview tomorrow.
            Here are the details:
          </Text>
          <Text style={text}>
            <strong>Company:</strong> {companyName}
            <br />
            <strong>Position:</strong> {jobTitle}
            <br />
            <strong>Date:</strong> {interviewDate.toDateString()}
          </Text>
          <Text style={text}>Remember to:</Text>
          <ul style={list}>
            <li style={listItem}>
              Review the job description and your application
            </li>
            <li style={listItem}>Prepare questions for the interviewer</li>
            <li style={listItem}>
              Test your equipment if it&apos;s a virtual interview
            </li>
            <li style={listItem}>
              Plan your route if it&apos;s an in-person interview
            </li>
            <li style={listItem}>Get a good night&apos;s sleep</li>
          </ul>
          <Text style={text}>
            Good luck with your interview! You&apos;ve got this!
          </Text>
          <Text style={italicText}>
            This is an automated reminder from AppliTrack. If you believe you
            received this in error, please ignore this email.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default ReminderEmail;

const main = {
  backgroundColor: "#ffffff",
  color: "#24292e",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
};

const container = {
  maxWidth: "480px",
  margin: "0 auto",
  padding: "20px 0 48px",
};

const title = {
  fontSize: "24px",
  lineHeight: 1.25,
};

const section = {
  padding: "24px",
  border: "solid 1px #dedede",
  borderRadius: "5px",
  textAlign: "center" as const,
};

const text = {
  margin: "0 0 10px 0",
  textAlign: "left" as const,
};

const otp = {
  margin: "0 0 10px 0",
  textAlign: "center" as const,
  fontSize: "20px",
};

const italicText = {
  fontStyle: "italic",
  margin: "0 0 10px 0",
  textAlign: "left" as const,
};

const list = {
  marginLeft: "26px",
  padding: 0,
};

const listItem = {
  fontSize: "16px",
  lineHeight: "26px",
  marginBottom: "10px",
  listStyleType: "disc",
};
