import { BackButton } from "./BackButton";
import { useState } from "react";
import { CreateInstrumentButton } from "./CreateInstrumentButton";

export function NewInstrumentForm() {
  const [instrumentName, setInstrumentName] = useState("");
  // how to add what is returned by form to the state?

  return (
    <>
      <fieldset className="flex w-16">
        <form method="post" action="/instruments" className="h-56">
          <div className="my-auto flex flex-col gap-2">
            {/* TODO: Add CSRF protection, example from phoenix */}
            {/* <input type="hidden" name="_csrf_token" value={"#{Plug.CSRFProtection.get_csrf_token()}"} /> */}
            <label className="text-slate-300">
              Name:{" "}
              <input
                className="mt-2 rounded-md bg-slate-300 pl-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-600"
                type="text"
                name="instrument_name"
                onChange={(e) => setInstrumentName(e.target.value)}
              />
            </label>
            <CreateInstrumentButton instrumentName={instrumentName} />
          </div>
        </form>
      </fieldset>

      <hr className="mb-2.5 mt-12 w-full max-w-xs" />
      <BackButton />
    </>
  );
}
