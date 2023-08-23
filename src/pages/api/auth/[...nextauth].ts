import NextAuth from "next-auth";
import { authOptions } from "~/server/auth";

export default NextAuth(authOptions);

// This fixes bug logged to console but raises type errors.
// const authHandler = NextAuth(authOptions);
// export default async function handler(...params: any[]) {
//   await authHandler(...params);
// }
