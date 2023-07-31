import { PageHeader } from "~/components/PageHeader";
import { SignInOutButton } from "~/components/SignInOutButton";
import { MusicianTable } from "~/components/MusicianTable";
import { PageSubHeader } from "~/components/PageSubHeader";
import { api } from "~/utils/api";
import { useRouter } from "next/router";

export default function MusicianList() {
  const router = useRouter();
  const instrumentId = router.query.instrumentId as string;
  const { data: instrumentData } = api.instrument.getName.useQuery({
    id: instrumentId,
  });

  if (!instrumentData) {
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
      <PageHeader />
      <PageSubHeader
        headerText="Musicans who play: "
        instrument={instrumentData}
      />
      <MusicianTable />
      <SignInOutButton />
    </main>
  );
}
