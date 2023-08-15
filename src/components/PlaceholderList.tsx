interface PlaceholderListProps {
  loading?: boolean;
}

export function PlaceholderList({ loading }: PlaceholderListProps) {
  const rows = [];
  for (let i = 0; i < 5; i++) {
    rows.push(
      <li className="mb-2 flex w-full px-3 text-lg">&#8226;&#8226;&#8226;</li>
    );
  }

  if (loading) {
    return <div className="animate-pulse">{rows}</div>;
  }

  return <div>{rows}</div>;
}
