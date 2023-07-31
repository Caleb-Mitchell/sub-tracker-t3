import { signIn, signOut, useSession } from "next-auth/react";

export function SignInOutButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <button disabled>Loading...</button>;
  }

  if (session) {
    return (
      <>
        <p>Signed in as {session.user.email}</p>
        <button
          className="my-2 rounded-md bg-slate-500 px-2 py-1"
          onClick={() => void signOut()}
        >
          Sign out
        </button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button
        className="my-2 rounded-md bg-slate-500 px-2 py-1"
        onClick={() => void signIn()}
      >
        Sign in
      </button>
    </>
  );
}
