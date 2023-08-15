import { SignInOutButton } from "~/components/SignInOutButton";
import { PageSubHeader } from "~/components/PageSubHeader";
import { DemoTable } from "~/components/DemoTable";

export default function demo() {
  return (
    <>
      <main className="mx-5 my-8 flex flex-col items-center">
        <PageSubHeader demo={true} headerText="Demo" instrument="" />
        <DemoTable />
        <SignInOutButton demo={true} />
      </main>
    </>
  );
}
