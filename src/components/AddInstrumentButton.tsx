import { useRouter } from "next/router";

export function AddInstrumentButton() {
  const router = useRouter();

  if (!router) {
    return "Loading...";
  }

  return (
    <button
      className="my-1.5 rounded-md bg-slate-500 px-2 py-1"
      onClick={() => void router.push(`/instruments/new`)}
    >
      Add Instrument
    </button>
  );
}
