import { signIn, signOut, useSession } from "next-auth/react";
// import Head from "next/head";
// import Link from "next/link";
import { PageHeader } from "~/components/PageHeader";
import { InstrumentTable } from "~/components/InstrumentTable";

export default function Home() {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <main className="my-8 flex flex-col items-center">
      <PageHeader />
      <InstrumentTable />
      <hr className="mx-5 my-12 w-full max-w-xs" />
      <div>
        {/* <div> */}
        {/*   <p className="text-2xl text-slate-200"> */}
        {/*     {hello.data ? hello.data.greeting : "Loading tRPC query..."} */}
        {/*   </p> */}
        {/* </div> */}
      </div>
      <SignInOrOutButton />
    </main>
  );
}

function SignInOrOutButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <button disabled>Loading...</button>;
  }

  if (session) {
    return (
      <>
        <p>Signed in as {session.user.email}</p>
        <button
          className="my-1.5 rounded-md bg-slate-500 p-2"
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
        className="my-1.5 rounded-md bg-slate-500 p-2"
        onClick={() => void signIn()}
      >
        Sign in
      </button>
    </>
  );
}
