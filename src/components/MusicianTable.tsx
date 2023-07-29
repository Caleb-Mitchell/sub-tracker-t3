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
    <li className="mx-8 flex w-full flex-row gap-4 text-lg">
      <div className="flex flex-row gap-4">
        <p>{musician.name}</p> |<p>{musician.phoneNumber}</p> |
        <p>{musician.emailAddress}</p>
      </div>
      <div className="mr-16 flex w-full flex-row justify-end gap-2">
        <EditButton musician={musician} />
        <DeleteButton musician={musician} />
      </div>
    </li>
  );
}

export function MusicianTable() {
  const [currentPage, setCurrentPage] = useState(1);

  const router = useRouter();
  const instrumentId = router.query.instrumentId as string;

  console.log(typeof instrumentId);
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
      <ul className="mx-auto flex h-36 min-h-full w-full flex-col items-start border-x md:max-w-2xl">
        {musicianData.map((musician) => (
          <SingleMusician musician={musician} key={musician.id} />
        ))}
      </ul>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        paginationItem={"musician"}
      />
      <hr className="mx-5 mb-2.5 mt-12 w-full max-w-xs" />
      <BackButton />
    </>
  );
}
