import { EditInstrumentForm } from "~/components/EditInstrumentForm";
import { PageHeader } from "~/components/PageHeader";
import { SignInOutButton } from "~/components/SignInOutButton";
import { PageSubHeader } from "~/components/PageSubHeader";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

export default function EditInstrument() {
  const query = useRouter().query.instrumentId;
  const instrumentId = (query: string[] | string | undefined) => {
    if (!query) {
      console.warn(`Expected url search params`);
      return "";
    }
    if (typeof query === "string") return query;
    // TODO: will the instrumentId be the only query? will it always be the first?
    return query[0] ?? "";
  };
  const {
    data: originalInstrument,
    isLoading,
    isError,
  } = api.instrument.getById.useQuery({ id: instrumentId(query) });

  // I like having a <LoadingSpinner /> component to fall back to
  if (isLoading) {
    return (
      <main className="mx-5 my-8 flex flex-col items-center">
        <PageHeader />
        <PageSubHeader
          headerText="Add a new musician who plays: "
          instrument={"Loading instrument"}
        />
        {/* <LoadingSpinner /> */}
        {/* <EditInstrumentForm originalInstrument={originalInstrument} /> */}
        <SignInOutButton />
      </main>
    );
  }

  if (isError) {
    return <p>oops!</p>;
  }

  return (
    <main className="mx-5 my-8 flex flex-col items-center">
      <PageHeader />
      <PageSubHeader
        headerText="Edit Instrument: "
        instrument={originalInstrument.name}
      />
      <EditInstrumentForm originalInstrument={originalInstrument} />
      <SignInOutButton />
    </main>
  );
}
