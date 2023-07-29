import { PageHeader } from "~/components/PageHeader";
import { SignInOutButton } from "~/components/SignInOutButton";
import { MusicianTable } from "~/components/MusicianTable";
import { PageSubHeader } from "~/components/PageSubHeader";

export default function MusicianList() {
  return (
    <main className="mx-5 my-8 flex flex-col items-center">
      <PageHeader />
      <PageSubHeader />
      <MusicianTable />
      <SignInOutButton />
    </main>
  );
}
