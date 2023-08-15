import { type Musician } from "@prisma/client";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { AddMusicianButton } from "./AddMusicianButton";
import { BackButton } from "./BackButton";
import { DeleteMusicianButton } from "./DeleteMusicianButton";
import { EditMusicianButton } from "./EditMusicianButton";
import { PlaceholderList } from "./PlaceholderList";

interface SingleMusicianProps {
  instrumentId: string;
  musician: Musician;
}

function SingleMusician({ instrumentId, musician }: SingleMusicianProps) {
  return (
    <li className="ml-6 flex w-full flex-row gap-4">
      <div className="flex flex-col">
        <p>{musician.name}</p>
        <p>{musician.phoneNumber}</p>
        <p>{musician.emailAddress}</p>
      </div>
      <div className="mr-16 flex w-full flex-row justify-end gap-2 self-center">
        <EditMusicianButton
          instrumentId={instrumentId}
          musicianId={musician.id}
        />
        <DeleteMusicianButton musicianId={musician.id} />
      </div>
    </li>
  );
}

export function MusicianTable() {
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

  const { data: musicianData, isLoading } = api.musician.getAll.useQuery({
    instrumentId: instrumentId(query),
  });
  const { data: session } = useSession();

  if (!session) {
    return (
      <>
        <h6 className="mb-8 text-center text-sm">Please sign in</h6>
        <hr className="mb-2.5 mt-12 w-full max-w-xs" />
      </>
    );
  }

  if (!instrumentId) {
    return (
      <div className="mx-auto mb-16 flex h-36 min-h-full w-full flex-col items-center border-x md:max-w-2xl">
        <h1 className="my-auto">Please select an instrument</h1>
      </div>
    );
  }

  if (isLoading) {
    return (
      <>
        <ul className="mx-auto flex h-44 w-full flex-col items-start border-x md:max-w-2xl">
          <PlaceholderList />
        </ul>
        <hr className="mb-2.5 mt-12 w-full max-w-xs" />
      </>
    );
  }

  if (musicianData && musicianData.length === 0) {
    return (
      <>
        <h6 className="mb-8 text-center text-sm">No Musicians Found</h6>
        <hr className="mb-2.5 mt-12 w-full max-w-xs" />
        <div className="flex space-x-6">
          <BackButton />
          <AddMusicianButton instrumentId={instrumentId(query)} />
        </div>
      </>
    );
  }

  if (!musicianData) {
    return (
      <>
        <div className="mx-auto mb-16 flex h-36 min-h-full w-full flex-col items-start border-x md:max-w-2xl">
          <h1>Error loading musicians</h1>
        </div>

        <hr className="mb-2.5 mt-12 w-full max-w-xs" />
      </>
    );
  }

  return (
    <>
      <ul className="mx-auto flex max-h-96 min-h-min w-full flex-col items-start overflow-x-hidden border-x md:max-w-2xl">
        {musicianData.map((musician, idx) => (
          <>
            <SingleMusician
              instrumentId={instrumentId(query)}
              musician={musician}
              key={musician.id}
            />
            {idx !== musicianData.length - 1 && (
              <hr
                key={musician.id + "hr"}
                className="my-5 ml-4 w-full max-w-xs"
              />
            )}
          </>
        ))}
      </ul>
      <hr className="mb-2.5 mt-12 w-full max-w-xs" />
      <div className="flex space-x-6">
        <BackButton />
        <AddMusicianButton instrumentId={instrumentId(query)} />
      </div>
    </>
  );
}
