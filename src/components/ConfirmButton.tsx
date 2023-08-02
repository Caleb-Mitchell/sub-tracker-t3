interface ConfirmButtonProps {
  text: string;
}

export function ConfirmButton({ text }: ConfirmButtonProps) {
  return (
    <>
      <button
        className="my-1.5 w-max self-center rounded-md bg-slate-500 px-2 py-1"
        type="submit"
      >
        {text}
      </button>
    </>
  );
}
