import { EditMusicianForm } from "~/components/EditMusicianForm";
import { PageHeader } from "~/components/PageHeader";
import { SignInOutButton } from "~/components/SignInOutButton";
import { PageSubHeader } from "~/components/PageSubHeader";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

export default function EditMusician() {
  const instrumentQuery = useRouter().query.instrumentId;
  const instrumentId = (instrumentQuery: string[] | string | undefined) => {
    if (!instrumentQuery) {
      console.warn(`Expected url search params`);
      return "";
    }
    if (typeof instrumentQuery === "string") return instrumentQuery;
    // TODO: will the instrumentId be the only query? will it always be the first?
    return instrumentQuery[0] ?? "";
  };
  const {
    data: originalInstrument,
    isLoading: instrumentIsLoading,
    isError: isInstrumentError,
  } = api.instrument.getById.useQuery({ id: instrumentId(instrumentQuery) });

  const musicianQuery = useRouter().query.musicianId;
  const musicianId = (musicianQuery: string[] | string | undefined) => {
    if (!musicianQuery) {
      console.warn(`Expected url search params`);
      return "";
    }
    if (typeof musicianQuery === "string") return musicianQuery;
    // TODO: will the instrumentId be the only query? will it always be the first?
    return musicianQuery[0] ?? "";
  };
  const {
    data: originalMusician,
    isLoading: musicianIsLoading,
    isError: isMuscianError,
  } = api.musician.getById.useQuery({ id: musicianId(musicianQuery) });

  // I like having a <LoadingSpinner /> component to fall back to
  if (instrumentIsLoading || musicianIsLoading) {
    return (
      <main className="mx-5 my-8 flex flex-col items-center">
        <PageHeader />
        <PageSubHeader
          headerText="Edit Musician: "
          instrument="Loading Musician"
        />
        {/* <LoadingSpinner /> */}
        <SignInOutButton />
      </main>
    );
  }

  if (isInstrumentError || isMuscianError) {
    return <p>oops!</p>;
  }

  return (
    <main className="mx-5 my-8 flex flex-col items-center">
      <PageHeader />
      <PageSubHeader
        headerText="Edit Musician: "
        //TODO: change instrument to something more general in subheader
        instrument={originalMusician.name}
      />
      <EditMusicianForm
        originalInstrument={originalInstrument}
        originalMusician={originalMusician}
      />
      <SignInOutButton />
    </main>
  );
}
