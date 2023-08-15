import { toast, Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { PageHeader } from "~/components/PageHeader";
import { InstrumentTable } from "~/components/InstrumentTable";
import { SignInOutButton } from "~/components/SignInOutButton";
import { PageSubHeader } from "~/components/PageSubHeader";

export default function InstrumentList() {
  const router = useRouter();

  useEffect(() => {
    if (router.query.instrumentCreated) {
      toast.success(router.query.message as string);
      router.query.instrumentCreated = undefined;
      void router.replace("/instruments", undefined, { shallow: true });
    }
  });

  useEffect(() => {
    if (router.query.instrumentUpdated) {
      toast.success(router.query.message as string);
      router.query.instrumentUpdated = undefined;
      void router.replace("/instruments", undefined, { shallow: true });
    }
  });

  return (
    <main className="mx-5 my-8 flex flex-col items-center">
      <Toaster position={"top-right"} />
      <PageHeader />
      <PageSubHeader
        headerText="A simple app to manage substitute musician information"
        instrument=""
      />
      <InstrumentTable />
      <SignInOutButton demo={false} />
    </main>
  );
}
