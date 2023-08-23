import NextAuth from "next-auth";
import { authOptions } from "~/server/auth";

// export default NextAuth(authOptions);

const authHandler = NextAuth(authOptions);
export default async function handler(...params: any[]) {
  await authHandler(...params);
}
