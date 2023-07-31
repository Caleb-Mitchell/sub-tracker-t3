import { api } from "~/utils/api";
import toast, { Toaster } from "react-hot-toast";

interface DeleteButtonProps {
  musicianId: string;
}

export function DeleteButton({ musicianId }: DeleteButtonProps) {
  const ctx = api.useContext();

  const deleteMusician = api.musician.delete.useMutation({
    onMutate: async () => {
      toast.loading("Deleting musician...");
      await ctx.musician.getPage.cancel();
    },
    onSettled: async () => {
      await ctx.musician.getPage.invalidate();
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("Musician deleted");
    },
    onError: (err) => {
      toast.dismiss();
      toast.error(`Error deleting musician: ${err.message}}`);
      console.log(err);
    },
  });

  return (
    <>
      <button
        className="py-.5 rounded-md bg-slate-500 px-2"
        onClick={() => deleteMusician.mutate({ id: musicianId })}
      >
        Delete
      </button>
      <Toaster position={"top-right"} />
    </>
  );
}
