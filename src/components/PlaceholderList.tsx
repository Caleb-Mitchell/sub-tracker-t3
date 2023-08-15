interface PlaceholderListProps {
  loading?: boolean;
}

export function PlaceholderList({ loading }: PlaceholderListProps) {
  const rows = [];
  for (let i = 0; i < 5; i++) {
    rows.push(
      <li className="flex w-full animate-pulse px-3 text-lg">
        &#8226;&#8226;&#8226;
      </li>
    );
  }

  if (loading) {
    return (
      <ul className="mx-auto flex h-60 w-full flex-col space-y-6 border-x md:max-w-2xl">
        {rows}
      </ul>
    );
  }

  return <div>{rows}</div>;
}
