import { type Dispatch, type SetStateAction } from "react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";

interface PaginationProps {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  paginationItem: string;
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

interface PageListProps {
  currentPage: number;
  firstVisiblePage: number;
  lastVisiblePage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

function PreviousPageButton({
  currentPage,
  setCurrentPage,
}: PreviousPageButtonProps) {
  if (currentPage === 1) {
    return (
      <button
        disabled
        className="mx-2 text-slate-600"
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        Previous
      </button>
    );
  } else {
    return (
      <button className="mx-2" onClick={() => setCurrentPage(currentPage - 1)}>
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
        className="mx-2 text-slate-600"
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        Next
      </button>
    );
  } else {
    return (
      <button className="mx-2" onClick={() => setCurrentPage(currentPage + 1)}>
        Next
      </button>
    );
  }
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
              className="mx-2 text-slate-600"
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
              className="mx-2"
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

export function Pagination({
  currentPage,
  setCurrentPage,
  paginationItem,
}: PaginationProps) {
  const router = useRouter();
  const instrumentId = router.query.instrumentId as string;
  let lastPage;
  if (paginationItem === "instrument") {
    lastPage = api.instrument.getLastPageNum.useQuery().data;
  } else if (paginationItem === "musician") {
    lastPage = api.musician.getLastPageNum.useQuery({
      instrumentId: instrumentId,
    }).data;
  }
  // TODO: set up first and last visible page numbers based on a slice of the total number of pages?

  if (!lastPage) {
    return <h1 className="pt-10">Loading Page Numbers...</h1>;
  }

  const firstVisiblePage = 1;
  const lastVisiblePage = lastPage;

  if (lastPage === 1) {
    return <div></div>;
  }

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
