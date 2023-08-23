import { BackButton } from "./BackButton";
import { CreateInstrumentButton } from "./CreateInstrumentButton";
import { useState } from "react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export function NewInstrumentForm() {
  const [instrumentName, setInstrumentName] = useState("");

  const router = useRouter();
  const { data: session } = useSession();

  const createInstrument = api.instrument.create.useMutation({
    // onMutate: async () => {
    //   console.log("Creating instrument...");
    //   await ctx.instrument.getAll.cancel();
    // },
    // onSettled: async () => {
    //   await ctx.instrument.getAll.invalidate();
    // },
    onSuccess: () => {
      void router.push(
        {
          pathname: "/instruments",
          query: {
            instrumentCreated: true,
            message: `Instrument ${instrumentName} created`,
          },
        },
        "/instruments"
      );
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return (
    <>
      <fieldset className="flex w-16">
        <form
          className="h-56"
          onSubmit={(e) => {
            e.preventDefault();
            createInstrument.mutate({
              name: instrumentName,
              userId: session?.user?.id ? session.user.id : "",
            });
          }}
        >
          <div className="my-auto flex flex-col gap-2">
            <label className="text-slate-300">
              Name:{" "}
              <input
                required
                className="mt-2 rounded-md bg-slate-300 pl-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-600"
                type="text"
                onChange={(e) => setInstrumentName(e.target.value)}
              />
            </label>
            <CreateInstrumentButton />
          </div>
        </form>
      </fieldset>

      <hr className="mb-2.5 mt-12 w-full max-w-xs" />
      <BackButton />
    </>
  );
}
