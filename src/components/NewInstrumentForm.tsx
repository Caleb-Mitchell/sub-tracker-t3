import { BackButton } from "./BackButton";
import { useState } from "react";
import { CreateInstrumentButton } from "./CreateInstrumentButton";
import { api } from "~/utils/api";
import { useRouter } from "next/router";

export function NewInstrumentForm() {
  const [instrumentName, setInstrumentName] = useState("");

  // const ctx = api.useContext();
  const router = useRouter();

  const createInstrument = api.instrument.create.useMutation({
    // onMutate: async () => {
    //   console.log("Creating instrument...");
    //   await ctx.instrument.getAll.cancel();
    // },
    // onSettled: async () => {
    //   await ctx.instrument.getAll.invalidate();
    // },
    onSuccess: () => {
      console.log("Instrument created");
      void router.push("/instruments");
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
            console.log("submitted");
            createInstrument.mutate({ name: instrumentName });
          }}
        >
          <div className="my-auto flex flex-col gap-2">
            <label className="text-slate-300">
              Name:{" "}
              <input
                className="mt-2 rounded-md bg-slate-300 pl-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-600"
                type="text"
                name="instrument_name"
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
