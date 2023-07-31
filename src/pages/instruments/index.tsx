import { Toaster } from "react-hot-toast";

// import Head from "next/head";
// import Link from "next/link";
import { PageHeader } from "~/components/PageHeader";
import { InstrumentTable } from "~/components/InstrumentTable";
import { SignInOutButton } from "~/components/SignInOutButton";
import { PageSubHeader } from "~/components/PageSubHeader";

export default function InstrumentList() {
  return (
    <main className="mx-5 my-8 flex flex-col items-center">
      <PageHeader />
      <PageSubHeader
        headerText="A simple app to manage substitute musician information"
        instrument=""
      />
      <InstrumentTable />
      <SignInOutButton />
    </main>
  );
}
