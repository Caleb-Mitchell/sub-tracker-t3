import { PageHeader } from "~/components/PageHeader";
import { SignInOutButton } from "~/components/SignInOutButton";
import { MusicianTable } from "~/components/MusicianTable";
import { PageSubHeader } from "~/components/PageSubHeader";
import { toast, Toaster } from "react-hot-toast";
import { api } from "~/utils/api";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function MusicianList() {
  const router = useRouter();
  const instrumentId = router.query.instrumentId as string;
  const { data: instrumentName } = api.instrument.getName.useQuery({
    id: instrumentId,
  });

  useEffect(() => {
    if (router.query.musicianCreated) {
      toast.success(router.query.message as string);
      router.query.musicianCreated = undefined;
      void router.replace(`/instruments/${instrumentId}`, undefined, {
        shallow: true,
      });
    }
  });

  if (!instrumentName) {
    return (
      <main className="mx-5 my-8 flex flex-col items-center">
        <PageHeader />
        <PageSubHeader
          headerText="Musicans who play: "
          instrument={"Loading instrument name..."}
        />
        <MusicianTable />
        <SignInOutButton />
      </main>
    );
  }

  return (
    <main className="mx-5 my-8 flex flex-col items-center">
      <Toaster position={"top-right"} />
      <PageHeader />
      <PageSubHeader
        headerText="Musicans who play: "
        instrument={instrumentName}
      />
      <MusicianTable />
      <SignInOutButton />
    </main>
  );
}
