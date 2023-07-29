import { useRouter } from "next/router";

// export function EditButton({ instrumentId, musicianId }) {
export function EditButton() {
  const router = useRouter();

  if (!router) {
    return "Loading...";
  }

  return (
    <button
      className="py-.5 rounded-md bg-slate-500 px-2"
      // const href = `/instruments/${instrumentId}/musicians/${musicianId}/edit`;
      onClick={() => void router.push(`google.com`)}
    >
      Edit
    </button>
  );
}
