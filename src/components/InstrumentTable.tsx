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
  return <li className="mx-5 text-lg">{instrument.name}</li>;
}

export function InstrumentTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: instrumentData, isLoading } = api.instrument.getPage.useQuery({
    pageNumber: currentPage,
  });
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="mx-auto mb-16 flex h-36 min-h-full w-full flex-col items-center border-x md:max-w-2xl">
        <h1 className="my-auto">Please sign in to view instruments</h1>
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

  if (!instrumentData) {
    return (
      <div className="mx-auto mb-16 flex h-36 min-h-full w-full flex-col items-start border-x md:max-w-2xl">
        <h1>Error loading instruments</h1>
      </div>
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
    </>
  );
}
