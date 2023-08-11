// pages/api/auth/demo-oauth.js
import { signIn } from "next-auth/react";

export default async function handler(req, res) {
  const user = {
    id: "fake-oauth-user-id",
    name: "Fake OAuth User",
    clientId: "demo-oauth",
    clientSecret: "demo-oauth-client-secret",
  };

  // Simulate obtaining an access token from the OAuth provider
  const accessToken = "fake-access-token";

  // Sign in the user
  await signIn("demo-oauth", {
    user,
    accessToken,
  });

  res.status(200).json({ success: true });
}
