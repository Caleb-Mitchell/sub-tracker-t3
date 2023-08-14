// pages/api/auth/demo-oauth.js
import { signIn } from "next-auth/react";
import type { NextApiRequest, NextApiResponse } from "next";

export default function auth(req: NextApiRequest, res: NextApiResponse) {
  // return signIn("demo-oauth", {
  //   callbackUrl: "http://localhost:3000/",
  // });

  const userData = {
    // name: "Fake OAuth User",
    // email: "",
    // image: "",
    id: "fake-oauth-user-id",
    // client_id: "demo-oauth",
    // client_secret: "demo-oauth-client-secret",
  };

  res.json({ user: userData, expires: "1" });
  // res.json({ profile: userData, expires: "1" });
}

//   // const user = {
//   //   id: "fake-oauth-user-id",
//   //   name: "Fake OAuth User",
//   //   clientId: "demo-oauth",
//   //   clientSecret: "demo-oauth-client-secret",
//   // };
//
//   // res.status(200).json({ user });
//   res.json({ user });
// }
