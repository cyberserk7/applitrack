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
  code: string;
  name: string;
}

export const OTPEmail = ({ code, name }: OTPEmailProps) => (
  <Html>
    <Head />
    <Preview>Reset Password</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src="https://utfs.io/f/428a61d4-b6eb-4518-93a1-0c6852d4cf3a-smzzpw.png"
          width="32"
          height="32"
          alt="AppliTracker"
        />

        <Text style={title}>Reset your password</Text>

        <Section style={section}>
          <Text style={text}>
            Hey <strong>{name}</strong>!
          </Text>
          <Text style={text}>
            Please enter this code in the verification field on the reset
            password page.
          </Text>
          <Text style={otp}>
            <strong>{code}</strong>
          </Text>
          <Text style={italicText}>The OTP will expire in 10 minutes.</Text>
          <Text style={text}>
            Please ignore this email if you did not request a password reset.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default OTPEmail;

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
