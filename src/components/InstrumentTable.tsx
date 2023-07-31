import { type Instrument } from "@prisma/client";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { Pagination } from "./Pagination";
import { useState } from "react";
import { DeleteInstrumentButton } from "./DeleteInstrumentButton";
import { PlaceholderInstrumentList } from "./PlaceholderInstrumentList";

// This is typing the props for the component SingleInstrument
// Here is where we define the props that the component will receive
interface SingleInstrumentProps {
  instrument: Instrument;
}

// We want to type the object, and cannot type the individual props here
function SingleInstrument({ instrument }: SingleInstrumentProps) {
  return (
    <li className="mb-1 ml-8 flex w-full text-lg">
      <div className="w-full">
        <a href={`/instruments/${instrument.id}`}>{instrument.name}</a>
      </div>
      <div className="mr-16 flex w-full flex-row justify-end self-center">
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
        <div className="mx-auto mb-16 flex h-36 min-h-full w-full flex-col items-center border-x md:max-w-2xl"></div>
        <hr className="mx-5 mb-2.5 mt-12 w-full max-w-xs" />
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
        <hr className="mx-5 mb-2.5 mt-12 w-full max-w-xs" />
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
      <ul className="mx-auto flex h-40 w-full flex-col items-start border-x md:max-w-2xl">
        {instrumentData.map((instrument) => (
          <SingleInstrument instrument={instrument} key={instrument.id} />
        ))}
      </ul>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        paginationItem={"instrument"}
      />
      <hr className="mx-5 mb-2.5 mt-12 w-full max-w-xs" />
    </>
  );
}
