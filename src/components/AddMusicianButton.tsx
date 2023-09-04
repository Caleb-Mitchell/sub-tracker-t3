import { useRouter } from "next/router";

interface AddMusicianButtonProps {
  instrumentId?: string;
}

export function AddMusicianButton({ instrumentId }: AddMusicianButtonProps) {
  const router = useRouter();

  if (!router) {
    return "Loading...";
  }

  if (instrumentId === undefined) {
    return (
      <button
        className="my-1.5 rounded-md bg-slate-500 px-2 py-1"
        onClick={() => void router.push(`/instruments/0/musicians/new`)}
      >
        Add Musician
      </button>
    );
  }

  return (
    <button
      className="my-1.5 rounded-md bg-slate-500 px-2 py-1"
      onClick={() =>
        void router.push(`/instruments/${instrumentId}/musicians/new`)
      }
    >
      Add Musician
    </button>
  );
}
