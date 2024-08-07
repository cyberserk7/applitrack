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
  message: string;
  email: string;
}

export const SupportEmail = ({ message, email }: OTPEmailProps) => (
  <Html>
    <Head />
    <Preview>`Support Request | ${email}`,</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src="https://utfs.io/f/428a61d4-b6eb-4518-93a1-0c6852d4cf3a-smzzpw.png"
          width="32"
          height="32"
          alt="AppliTrack"
        />

        <Text style={title}>Support Request</Text>

        <Section style={section}>
          <Text style={text}>
            Hey <strong>@nilabjodey</strong>
          </Text>
          <Text style={text}>
            You have a new support request: from <strong>{email}</strong>
          </Text>
          <Text style={text}>
            <Text style={italicText}>Content: </Text> {message}
          </Text>
          <Text style={text}>
            Be sure to get back to the sender with a response.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default SupportEmail;

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
