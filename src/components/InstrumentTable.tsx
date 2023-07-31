import { type Instrument } from "@prisma/client";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { Pagination } from "./Pagination";
import { useState } from "react";

// This is typing the props for the component SingleInstrument
// Here is where we define the props that the component will receive
interface SingleInstrumentProps {
  instrument: Instrument;
}

// We want to type the object, and cannot type the individual props here
function SingleInstrument({ instrument }: SingleInstrumentProps) {
  return (
    <a href={`/instruments/${instrument.id}`}>
      <li className="mx-5 text-lg">{instrument.name}</li>
    </a>
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
        <div className="mx-auto mb-16 flex h-20 min-h-full w-full flex-col items-center border-x md:max-w-2xl"></div>
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
      <ul className="mx-auto flex h-36 min-h-full w-full flex-col items-start border-x md:max-w-2xl">
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
