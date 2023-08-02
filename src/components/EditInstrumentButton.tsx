import { useRouter } from "next/router";

interface EditInstrumentButtonProps {
  instrumentId: string;
}

export function EditInstrumentButton({
  instrumentId,
}: EditInstrumentButtonProps) {
  const router = useRouter();

  if (!router) {
    return "Loading...";
  }

  return (
    <button
      className="py-.5 mr-1 rounded-md bg-slate-500 px-2"
      onClick={() => void router.push(`/instruments/${instrumentId}/edit`)}
    >
      Edit
    </button>
  );
}
