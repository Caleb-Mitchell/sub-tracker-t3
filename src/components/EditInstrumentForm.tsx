import { type Instrument } from "@prisma/client";
import { BackButton } from "./BackButton";
import { ConfirmButton } from "./ConfirmButton";
import { useState } from "react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";

interface EditInstrumentFormProps {
  originalInstrument: Instrument;
}

export function EditInstrumentForm({
  originalInstrument,
}: EditInstrumentFormProps) {
  const router = useRouter();

  const [updatedInstrument, setUpdatedInstrument] = useState<Instrument | null>(
    null
  );

  const updateInstrument = api.instrument.update.useMutation({
    onSuccess: () => {
      void router.push(
        {
          pathname: "/instruments",
          query: {
            instrumentUpdated: true,
            message: `Instrument ${updatedInstrument?.name} updated`,
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
            updateInstrument.mutate({
              id: originalInstrument.id,
              name: updatedInstrument?.name ?? originalInstrument.name,
            });
          }}
        >
          <div className="my-auto flex flex-col gap-2">
            <label className="text-slate-300">
              Name:{" "}
              <input
                value={updatedInstrument?.name ?? originalInstrument.name}
                className="mt-2 rounded-md bg-slate-300 pl-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-600"
                type="text"
                onChange={(e) =>
                  setUpdatedInstrument({
                    id: originalInstrument.id ?? updatedInstrument?.id,
                    name: e.target.value,
                  })
                }
              />
            </label>
            <ConfirmButton text="Confirm New Name" />
          </div>
        </form>
      </fieldset>

      <hr className="mb-2.5 mt-12 w-full max-w-xs" />
      <BackButton />
    </>
  );
}
