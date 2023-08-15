interface PageSubHeaderProps {
  demo?: boolean;
  headerText: string;
  instrument: string;
}

export function PageSubHeader({
  demo,
  headerText,
  instrument,
}: PageSubHeaderProps) {
  if (!headerText) {
    headerText = "";
  }

  if (demo) {
    return (
      <>
        <p className="text-center text-xl text-slate-200">
          {headerText}
          {instrument}
        </p>
        <hr className="my-5 w-full max-w-xs border-slate-700" />
      </>
    );
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
