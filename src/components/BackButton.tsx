export function BackButton() {
  return (
    <button
      className="my-1.5 rounded-md bg-slate-500 px-2 py-1"
      onClick={() => {
        window.history.back();
      }}
    >
      Back To Instruments
    </button>
  );
}
