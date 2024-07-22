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

interface VerificationEmailProps {
  name?: string;
  url: string;
}

export const VerificationEmail = ({ name, url }: VerificationEmailProps) => (
  <Html>
    <Head />
    <Preview>Verify your Applitrack account</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src="https://utfs.io/f/428a61d4-b6eb-4518-93a1-0c6852d4cf3a-smzzpw.png"
          width="32"
          height="32"
          alt="AppliTracker"
        />

        <Text style={title}>Verify your account</Text>

        <Section style={section}>
          <Text style={text}>
            Hey <strong>{name}</strong>!
          </Text>
          <Text style={text}>
            Thank you for signing up for AppliTrack. Please click{" "}
            <a href={url} target="_blank">
              here
            </a>{" "}
            to verify your account.
          </Text>
          <Text style={italicText}>
            The verification link will expire in 1 hour.
          </Text>
          <Text style={text}>
            Please ignore this email if you did not sign up for AppliTrack.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default VerificationEmail;

// https://utfs.io/f/428a61d4-b6eb-4518-93a1-0c6852d4cf3a-smzzpw.png

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

const italicText = {
  fontStyle: "italic",
  margin: "0 0 10px 0",
  textAlign: "left" as const,
};
