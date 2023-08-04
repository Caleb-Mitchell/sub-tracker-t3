import { useRouter } from "next/router";
import { type Instrument } from "@prisma/client";

interface BackToInstrumentButtonProps {
  instrument: Instrument;
}

export function BackToInstrumentButton({
  instrument,
}: BackToInstrumentButtonProps) {
  const router = useRouter();

  return (
    <button
      className="my-1.5 rounded-md bg-slate-500 px-2 py-1"
      onClick={() => {
        void router.push(`/instruments/${instrument.id}`);
      }}
    >
      Back To {instrument.name}
    </button>
  );
}
