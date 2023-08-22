interface PlaceholderListProps {
  loading?: boolean;
}

export function PlaceholderList({ loading }: PlaceholderListProps) {
  if (loading) {
    const rows = [];
    for (let i = 0; i < 5; i++) {
      rows.push(
        <li key={i} className="flex w-full animate-pulse px-3 text-lg">
          &#8226;&#8226;&#8226;
        </li>
      );
    }
    return (
      <ul className="mx-auto flex h-60 w-full flex-col space-y-6 border-x md:max-w-xl">
        {rows}
      </ul>
    );
  }

  const rows = [];
  for (let i = 0; i < 5; i++) {
    rows.push(
      <li key={i} className="flex w-full px-3 text-lg">
        &#8226;&#8226;&#8226;
      </li>
    );
  }
  return (
    <ul className="mx-auto flex h-60 w-full flex-col space-y-6 border-x md:max-w-xl">
      {rows}
    </ul>
  );
}
