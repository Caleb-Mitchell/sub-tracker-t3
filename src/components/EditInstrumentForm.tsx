import { type Instrument } from "@prisma/client";
import { BackButton } from "./BackButton";
import { ConfirmButton } from "./ConfirmButton";
import { useState } from "react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

interface EditInstrumentFormProps {
  originalInstrument: Instrument;
}

export function EditInstrumentForm({
  originalInstrument,
}: EditInstrumentFormProps) {
  const router = useRouter();
  const ctx = api.useContext();

  const [updatedInstrument, setUpdatedInstrument] = useState<Instrument | null>(
    null
  );

  function originalInstrumentIfNotUpdated() {
    return updatedInstrument ? updatedInstrument : originalInstrument;
  }

  const updateInstrument = api.instrument.update.useMutation({
    onMutate: async () => {
      toast.loading("Updating instrument...");
      await ctx.instrument.getById.cancel();
    },
    onSettled: async () => {
      await ctx.instrument.getById.invalidate();
    },

    onSuccess: () => {
      toast.dismiss();
      toast.success(
        `Instrument name "${originalInstrument.name}" updated to "${
          originalInstrumentIfNotUpdated().name
        }"`
      );
      void router.push("/instruments");
    },
    onError: (err) => {
      toast.dismiss();
      toast.error(`Error editing instrument: ${err.message}}`);
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
                value={originalInstrumentIfNotUpdated().name}
                className="mt-2 rounded-md bg-slate-300 pl-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-600"
                type="text"
                onChange={(e) =>
                  setUpdatedInstrument({
                    id: originalInstrument.id,
                    userId: originalInstrument.userId,
                    name: e.target.value,
                  })
                }
              />
            </label>
            <ConfirmButton text="Confirm New Name" />
          </div>
        </form>
      </fieldset>

      <hr className="mb-5 mt-12 w-full max-w-xs" />
      <BackButton />
    </>
  );
}
