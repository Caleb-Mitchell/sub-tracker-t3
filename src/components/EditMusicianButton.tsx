import { useRouter } from "next/navigation";

interface EditMusicianButtonProps {
  instrumentId: string;
  musicianId: string;
}

export function EditMusicianButton({
  instrumentId,
  musicianId,
}: EditMusicianButtonProps) {
  const router = useRouter();

  if (!router) {
    return "Loading...";
  }

  return (
    <button
      className="py-.5 rounded-md bg-slate-500 px-2"
      onClick={() =>
        void router.push(
          `/instruments/${instrumentId}/musicians/${musicianId}/edit`
        )
      }
    >
      Edit
    </button>
  );
}
