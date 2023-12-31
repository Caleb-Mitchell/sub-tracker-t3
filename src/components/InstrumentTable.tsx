import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { AddInstrumentButton } from "./AddInstrumentButton";
import { EditInstrumentButton } from "./EditInstrumentButton";
import { AddMusicianButton } from "./AddMusicianButton";
import { DeleteInstrumentButton } from "./DeleteInstrumentButton";
import { Pagination } from "./Pagination";
import { PlaceholderList } from "./PlaceholderList";
import { type Instrument } from "@prisma/client";
import Link from "next/link";

interface SingleInstrumentProps {
  instrument: Instrument;
}

function SingleInstrument({ instrument }: SingleInstrumentProps) {
  return (
    <li className="flex w-full px-3 text-base">
      <div className="w-full">
        <Link className="font-semibold" href={`/instruments/${instrument.id}`}>
          {instrument.name}
        </Link>
      </div>
      <div className="flex w-full flex-row justify-end self-center text-lg">
        <EditInstrumentButton instrumentId={instrument.id} />
        <DeleteInstrumentButton instrumentId={instrument.id} />
      </div>
    </li>
  );
}

export function InstrumentTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: session } = useSession();

  const { data: instrumentData, isLoading } = api.instrument.getPage.useQuery({
    pageNumber: currentPage,
    userId: session?.user?.id ? session.user.id : "",
  });

  if (!session) {
    return (
      <>
        <h6 className="mb-8 text-center text-sm">
          Please sign in to view instruments you&apos;ve saved
        </h6>
        <PlaceholderList loading={false} />
        <hr className="mx-5 mb-5 mt-6 w-full max-w-xs" />
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <h6 className="mb-8 text-center text-sm">
          Click an instrument name to view any saved musicians
        </h6>
        <PlaceholderList loading={true} />
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          paginationItem={"instrument"}
        />
        <hr className="mx-5 mb-5 mt-6 w-full max-w-xs" />
        <AddInstrumentButton />
      </>
    );
  }

  if (!instrumentData) {
    return (
      <>
        <h1>Error loading instruments</h1>
        <div className="mx-auto mb-16 flex h-36 min-h-full w-full flex-col items-center border-x md:max-w-2xl"></div>
        <hr className="mx-5 mb-5 mt-12 w-full max-w-xs" />
      </>
    );
  }

  if (instrumentData && instrumentData.length === 0) {
    return (
      <>
        <h6 className="mb-8 text-center text-sm">No Instruments Found</h6>
        <ul className="mx-auto flex h-60 w-full flex-col space-y-6 border-x md:max-w-xl"></ul>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          paginationItem={"instrument"}
        />
        <hr className="mx-5 mb-5 mt-6 w-full max-w-xs" />
        <AddInstrumentButton />
      </>
    );
  }

  return (
    <>
      <h6 className="mb-8 text-center text-sm">
        Click an instrument name to view any saved musicians
      </h6>
      <ul className="mx-auto flex h-60 w-full flex-col space-y-6 border-x md:max-w-xl">
        {instrumentData.map((instrument) => (
          <SingleInstrument instrument={instrument} key={instrument.id} />
        ))}
      </ul>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        paginationItem={"instrument"}
      />
      <hr className="mx-5 mb-5 mt-6 w-full max-w-xs" />
      <div className="flex space-x-6">
        <AddInstrumentButton />
        <AddMusicianButton />
      </div>
    </>
  );
}
