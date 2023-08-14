import { signIn } from "next-auth/react";
// import { useRouter } from "next/router";

export function DemoSignInButton() {
  // const router = useRouter();

  // const handleSignIn = async () => {
  //   console.log("handleSignIn");
  //   try {
  //     await signIn("demo-oauth", {
  //       callbackUrl: "/",
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <button onClick={() => void signIn("demo-oauth", { callbackUrl: "/" })}>
      Sign In with Demo OAuth
    </button>
  );
}
