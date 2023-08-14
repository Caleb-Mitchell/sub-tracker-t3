import Link from "next/link";

export function PageHeader() {
  return (
    <header className="flex flex-col items-center text-center">
      <Link href="/instruments">
        <h1 className="text-4xl text-slate-200">Sub Tracker</h1>
      </Link>
    </header>
  );
}
