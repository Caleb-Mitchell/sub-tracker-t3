import { type Musician } from "@prisma/client";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { Pagination } from "./Pagination";
import { BackButton } from "./BackButton";
import { EditButton } from "./EditButton";
import { DeleteButton } from "./DeleteButton";
import { useState } from "react";
import { useRouter } from "next/router";

// This is typing the props for the component SingleInstrument
// Here is where we define the props that the component will receive
interface SingleMusicianProps {
  musician: Musician;
}

// We want to type the object, and cannot type the individual props here
function SingleMusician({ musician }: SingleMusicianProps) {
  return (
    <li className="ml-8 flex w-full flex-row gap-4 text-lg">
      <div className="flex flex-col">
        <p>{musician.name}</p>
        <p>{musician.phoneNumber}</p>
        <p>{musician.emailAddress}</p>
      </div>
      <div className="mr-16 flex w-full flex-row justify-end gap-2 self-center">
        {/* <EditButton musician={musician} /> */}
        <DeleteButton musicianId={musician.id} />
        <EditButton />
      </div>
    </li>
  );
}

export function MusicianTable() {
  const [currentPage, setCurrentPage] = useState(1);

  const router = useRouter();
  const instrumentId = router.query.instrumentId as string;

  const { data: musicianData, isLoading } = api.musician.getPage.useQuery({
    pageNumber: currentPage,
    instrumentId: instrumentId,
  });
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="mx-auto mb-16 flex h-36 min-h-full w-full flex-col items-center border-x md:max-w-2xl">
        <h1 className="my-auto">Please sign in to view musicians</h1>
      </div>
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
      <div className="mx-auto mb-16 flex h-36 min-h-full w-full flex-col items-center border-x md:max-w-2xl">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (!musicianData) {
    return (
      <div className="mx-auto mb-16 flex h-36 min-h-full w-full flex-col items-start border-x md:max-w-2xl">
        <h1>Error loading musicians</h1>
      </div>
    );
  }

  return (
    <>
      <ul className="mx-auto flex max-h-96 min-h-min w-full flex-col items-start overflow-x-hidden border-x md:max-w-2xl">
        {musicianData.map((musician, idx) => (
          <>
            <SingleMusician musician={musician} key={musician.id} />
            {idx !== musicianData.length - 1 && (
              <hr className="my-5 ml-4 w-full max-w-xs" />
            )}
          </>
        ))}
      </ul>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        paginationItem={"musician"}
      />
      <hr className="mb-2.5 mt-12 w-full max-w-xs" />
      <BackButton />
    </>
  );
}
