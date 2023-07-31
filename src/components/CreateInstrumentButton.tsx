import { api } from "~/utils/api";
import { useRouter } from "next/navigation";

interface CreateInstrumentButtonProps {
  instrumentName: string;
}

export function CreateInstrumentButton({
  instrumentName,
}: CreateInstrumentButtonProps) {
  // const ctx = api.useContext();
  const router = useRouter();
  const createInstrument = api.instrument.create.useMutation({
    //   onMutate: async () => {
    //     console.log("Creating instrument...");
    //     await ctx.instrument.getAll.cancel();
    //   },
    //   onSettled: async () => {
    //     await ctx.instrument.getAll.invalidate();
    //   },
    onSuccess: () => {
      console.log("Instrument created");
      router.refresh();
      router.push("/instruments");
    },
    //   onError: (err) => {
    //     console.log(err);
    //   },
  });

  return (
    <>
      <button
        className="my-1.5 w-max self-center rounded-md bg-slate-500 px-2 py-1"
        type="submit"
        onClick={() => {
          createInstrument.mutate({ name: instrumentName });
        }}
      >
        Add Instrument
      </button>
    </>
  );
}
// export function DeleteInstrumentButton({
//   instrumentId,
// }: DeleteInstrumentButtonProps) {
//   const ctx = api.useContext();
//   const name = api.instrument.getName.useQuery({ id: instrumentId }).data;
//
//   const deleteInstrument = api.instrument.delete.useMutation({
//     onMutate: async () => {
//       toast.loading("Deleting instrument...");
//       await ctx.instrument.getPage.cancel();
//     },
//     onSettled: async () => {
//       await ctx.instrument.getPage.invalidate();
//     },
//     onSuccess: () => {
//       toast.dismiss();
//       toast.success(`Instrument ${name} deleted`);
//     },
//     onError: (err) => {
//       toast.dismiss();
//       toast.error(`Error deleting instrument: ${err.message}}`);
//       console.log(err);
//     },
//   });
//
//   return (
//     <>
//       <button
//         className="py-.5 rounded-md bg-slate-500 px-2"
//         onClick={() => deleteInstrument.mutate({ id: instrumentId })}
//       >
//         Delete
//       </button>
//       <Toaster position={"top-right"} />
//     </>
//   );
// }
