import { api } from "~/utils/api";
import toast, { Toaster } from "react-hot-toast";

interface DeleteInstrumentButtonProps {
  instrumentId: string;
}

export function DeleteInstrumentButton({
  instrumentId,
}: DeleteInstrumentButtonProps) {
  const ctx = api.useContext();
  const name = api.instrument.getName.useQuery({ id: instrumentId }).data;

  const deleteInstrument = api.instrument.delete.useMutation({
    onMutate: async () => {
      toast.loading("Deleting instrument...");
      await ctx.instrument.getPage.cancel();
    },
    onSettled: async () => {
      await ctx.instrument.getPage.invalidate();
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success(`Instrument ${name} deleted`);
    },
    onError: (err) => {
      toast.dismiss();
      toast.error(`Error deleting instrument: ${err.message}}`);
      console.log(err);
    },
  });

  return (
    <>
      <button
        className="py-.5 rounded-md bg-slate-500 px-2"
        onClick={() => deleteInstrument.mutate({ id: instrumentId })}
      >
        Delete
      </button>
      <Toaster position={"top-right"} />
    </>
  );
}
