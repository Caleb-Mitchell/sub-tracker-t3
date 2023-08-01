import { useRouter } from "next/router";

export function BackButton() {
  const router = useRouter();

  return (
    <button
      className="my-1.5 rounded-md bg-slate-500 px-2 py-1"
      onClick={() => {
        void router.push("/instruments");
      }}
    >
      Back To Instruments
    </button>
  );
}
