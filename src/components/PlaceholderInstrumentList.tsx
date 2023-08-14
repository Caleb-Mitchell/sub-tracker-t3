export function PlaceholderInstrumentList() {
  const rows = [];
  for (let i = 0; i < 5; i++) {
    rows.push(
      <li className="mb-2 flex w-full px-3 text-lg">&#8226;&#8226;&#8226;</li>
    );
  }
  return <div className="animate-pulse">{rows}</div>;
}
