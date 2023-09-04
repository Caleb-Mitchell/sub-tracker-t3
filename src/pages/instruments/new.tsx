import { PageHeader } from "~/components/PageHeader";
import { SignInOutButton } from "~/components/SignInOutButton";
import { PageSubHeader } from "~/components/PageSubHeader";
import { NewInstrumentForm } from "~/components/NewInstrumentForm";

export default function NewInstrument() {
  return (
    <main className="mx-5 my-8 flex flex-col items-center">
      <PageHeader />
      <PageSubHeader headerText="add a new instrument" instrument="" />
      <NewInstrumentForm />
      <SignInOutButton />
    </main>
  );
}
