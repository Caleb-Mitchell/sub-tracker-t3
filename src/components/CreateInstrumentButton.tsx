import { useRouter } from "next/router";
import { api } from "~/utils/api";

interface CreateInstrumentButtonProps {
  instrumentName: string;
}

export function CreateInstrumentButton({
  instrumentName,
}: CreateInstrumentButtonProps) {
  const router = useRouter();
  const createInstrument = api.instrument.create.useMutation({
    onSuccess: () => {
      console.log("Instrument created");
      void router.push("/instruments");
    },
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
