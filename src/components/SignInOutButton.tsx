import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { BackButton } from "./BackButton";

interface SignInOutButtonProps {
  demo?: boolean;
}

export function SignInOutButton({ demo }: SignInOutButtonProps) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <button disabled>Loading...</button>;
  }

  if (session) {
    return (
      <>
        <hr className="my-5 w-full max-w-xs border-slate-200" />
        <p className="italic">Signed in as {session.user.email}</p>
        <button
          className="my-2 rounded-md bg-slate-500 px-2 py-1"
          onClick={() => void signOut()}
        >
          Sign out
        </button>
      </>
    );
  }

  if (demo === true && !session) {
    return (
      <>
        <hr className="my-5 w-full max-w-xs border-slate-700" />
        <button
          className="my-2 rounded-md bg-slate-500 px-2 py-1"
          onClick={() =>
            void signIn(undefined, { callbackUrl: "/instruments" })
          }
        >
          Sign In
        </button>
        <div className="italic">Sign in to try it out!</div>
        <hr className="my-5 w-full max-w-xs border-slate-700" />
        <BackButton />
      </>
    );
  }
  return (
    <>
      <h6 className="mb-1 mt-8 italic">Not signed in</h6>
      <div className="flex space-x-6">
        <button
          className="my-2 rounded-md bg-slate-500 px-2 py-1"
          onClick={() => void signIn()}
        >
          Sign in
        </button>
        <div className="my-2 rounded-md border-2 border-dashed border-x-transparent border-y-slate-500">
          <Link
            href="/instruments/demo"
            className="self-center px-2 py-1 text-center text-sm text-slate-500"
          >
            View Demo!
          </Link>
        </div>
      </div>
    </>
  );
}
