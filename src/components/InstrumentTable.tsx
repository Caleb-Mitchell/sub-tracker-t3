import { type Instrument } from "@prisma/client";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { useState, type Dispatch, type SetStateAction } from "react";

// This is typing the props for the component SingleInstrument
// Here is where we define the props that the component will receive
interface SingleInstrumentProps {
  instrument: Instrument;
}

interface PaginationProps {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  paginationItem: string;
}

// We want to type the object, and cannot type the individual props here
function SingleInstrument({ instrument }: SingleInstrumentProps) {
  return <li className="mx-5 text-lg">{instrument.name}</li>;
}

interface PreviousPageButtonProps {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

interface NextPageButtonProps {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  lastPage: number;
}

function PreviousPageButton({
  currentPage,
  setCurrentPage,
}: PreviousPageButtonProps) {
  if (currentPage === 1) {
    return (
      <button
        disabled
        className="mx-5 text-slate-600"
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        Previous
      </button>
    );
  } else {
    return (
      <button className="mx-5" onClick={() => setCurrentPage(currentPage - 1)}>
        Previous
      </button>
    );
  }
}

function NextPageButton({
  currentPage,
  setCurrentPage,
  lastPage,
}: NextPageButtonProps) {
  if (currentPage === lastPage) {
    return (
      <button
        disabled
        className="mx-5 text-slate-600"
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        Next
      </button>
    );
  } else {
    return (
      <button className="mx-5" onClick={() => setCurrentPage(currentPage + 1)}>
        Next
      </button>
    );
  }
}

interface PageListProps {
  currentPage: number;
  firstVisiblePage: number;
  lastVisiblePage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

function PageList({
  currentPage,
  firstVisiblePage,
  lastVisiblePage,
  setCurrentPage,
}: PageListProps) {
  return (
    <div className="flex flex-row justify-center">
      {Array.from(
        { length: lastVisiblePage - firstVisiblePage + 1 },
        (_, i) => i + firstVisiblePage
      ).map((page) => {
        if (page === currentPage) {
          return (
            <button
              className="mx-5 text-slate-600"
              disabled
              key={page}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          );
        } else {
          return (
            <button
              className="mx-5"
              key={page}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          );
        }
      })}
    </div>
  );
}

function Pagination({
  currentPage,
  setCurrentPage,
  paginationItem,
}: PaginationProps) {
  let lastPage;
  if (paginationItem === "instrument") {
    lastPage = api.instrument.getLastPageNum.useQuery().data;
  } else if (paginationItem === "musician") {
    lastPage = api.musician.getLastPageNum.useQuery().data;
  }
  // TODO: set up first and last visible page numbers based on a slice of the total number of pages

  if (!lastPage) {
    return <h1>Loading Page Numbers...</h1>;
  }

  const firstVisiblePage = 1;
  const lastVisiblePage = lastPage;

  return (
    <div className="mt-10 flex flex-row justify-center">
      <PreviousPageButton
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <PageList
        currentPage={currentPage}
        firstVisiblePage={firstVisiblePage}
        lastVisiblePage={lastVisiblePage}
        setCurrentPage={setCurrentPage}
      />
      <NextPageButton
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        lastPage={lastPage}
      />
    </div>
  );
}

export function InstrumentTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: instrumentData, isLoading } = api.instrument.getPage.useQuery({
    pageNumber: currentPage,
  });
  const { data: session } = useSession();

  if (!session) {
    return <h1>Please sign in to view instruments</h1>;
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!instrumentData) {
    return <h1>Error loading instruments</h1>;
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
