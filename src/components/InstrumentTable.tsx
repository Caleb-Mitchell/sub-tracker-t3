import { type Instrument } from "@prisma/client";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { Pagination } from "./Pagination";
import { useState } from "react";
import { DeleteInstrumentButton } from "./DeleteInstrumentButton";
import { PlaceholderInstrumentList } from "./PlaceholderInstrumentList";
import { AddInstrumentButton } from "./AddInstrumentButton";

interface SingleInstrumentProps {
  instrument: Instrument;
}

function SingleInstrument({ instrument }: SingleInstrumentProps) {
  return (
    <li className="mb-2 flex w-full px-3 text-lg">
      <div className="w-full">
        <a href={`/instruments/${instrument.id}`}>{instrument.name}</a>
      </div>
      <div className="flex w-full flex-row justify-end self-center">
        <DeleteInstrumentButton instrumentId={instrument.id} />
      </div>
    </li>
  );
}

export function InstrumentTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: instrumentData, isLoading } = api.instrument.getPage.useQuery({
    pageNumber: currentPage,
  });
  const { data: session } = useSession();

  if (!session) {
    return (
      <>
        <h1 className="my-auto">Please sign in to view instruments</h1>
        <div className="mx-auto mb-8 flex h-10 min-h-full w-full flex-col items-center border-x md:max-w-2xl"></div>
        <hr className="mx-5 mb-2.5 mt-6 w-full max-w-xs" />
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <ul className="mx-auto flex h-40 w-full flex-col items-start border-x md:max-w-2xl">
          <PlaceholderInstrumentList />
        </ul>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          paginationItem={"instrument"}
        />
        <hr className="mx-5 mb-2.5 mt-6 w-full max-w-xs" />
        <AddInstrumentButton />
      </>
    );
  }

  if (!instrumentData) {
    return (
      <>
        <h1>Error loading instruments</h1>
        <div className="mx-auto mb-16 flex h-36 min-h-full w-full flex-col items-center border-x md:max-w-2xl"></div>
        <hr className="mx-5 mb-2.5 mt-12 w-full max-w-xs" />
      </>
    );
  }

  return (
    <>
      <ul className="mx-auto flex h-44 w-full flex-col items-start border-x md:max-w-2xl">
        {instrumentData.map((instrument) => (
          <SingleInstrument instrument={instrument} key={instrument.id} />
        ))}
      </ul>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        paginationItem={"instrument"}
      />
      <hr className="mx-5 mb-2.5 mt-6 w-full max-w-xs" />
      <AddInstrumentButton />
    </>
  );
}
