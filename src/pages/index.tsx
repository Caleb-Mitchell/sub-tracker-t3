import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";
import { type Instrument } from "@prisma/client";

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
      <ExampleSignInButton />
    </main>
  );
}

function PageHeader() {
  return (
    <header className="flex flex-col items-center">
      <h1 className="text-4xl text-slate-200">Sub Tracker</h1>
      <p className="text-xl text-slate-200">
        A simple app to manage substitute musician information
      </p>
      <hr className="my-5 w-full max-w-xs" />
    </header>
  );
}

function ExampleSignInButton() {
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

// This is typing the props for the component SingleInstrument
// Here is where we define the props that the component will receive
interface SingleInstrumentProps {
  instrument: Instrument;
}

// We want to type the object, and cannot type the individual props here
function SingleInstrument({ instrument }: SingleInstrumentProps) {
  return <li className="mx-5">{instrument.name}</li>;
}

function InstrumentTable() {
  const { data: instrumentData, isLoading } = api.instrument.getAll.useQuery();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!instrumentData) {
    return <h1>Error loading instruments</h1>;
  }

  return (
    <ul className="mx-auto flex w-full flex-col items-start border-x md:max-w-2xl">
      {instrumentData.map((instrument) => (
        <SingleInstrument instrument={instrument} key={instrument.id} />
      ))}
    </ul>
  );
}
