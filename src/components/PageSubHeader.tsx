interface PageSubHeaderProps {
  headerText: string;
  instrument: string;
}

export function PageSubHeader({ headerText, instrument }: PageSubHeaderProps) {
  if (!headerText) {
    headerText = "";
  }

  return (
    <>
      <p className="text-center text-xl text-slate-200">
        {headerText}
        {instrument}
      </p>
      <hr className="my-5 w-full max-w-xs" />
    </>
  );
}
