import { PageHeader } from "~/components/PageHeader";
import { SignInOutButton } from "~/components/SignInOutButton";
import { PageSubHeader } from "~/components/PageSubHeader";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { NewMusicianForm } from "~/components/NewMusicianForm";

export default function CreateMusician() {
  const instrumentId = useRouter().query.instrumentId as string;
  const name = api.instrument.getName.useQuery({ id: instrumentId }).data;

  return (
    <main className="mx-5 my-8 flex flex-col items-center">
      <PageHeader />
      <PageSubHeader
        headerText="Add a new musician who plays: "
        instrument={name ?? "Loading..."}
      />
      <NewMusicianForm instrumentId={instrumentId} />
      <SignInOutButton />
    </main>
  );
}
