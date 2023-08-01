import { BackButton } from "./BackButton";
import { CreateMusicianButton } from "./CreateMusicianButton";
import { useState } from "react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";

interface NewMusicianFormProps {
  instrumentId: string;
}

export function NewMusicianForm({ instrumentId }: NewMusicianFormProps) {
  const originalInstrumentName = api.instrument.getName.useQuery({
    id: instrumentId,
  }).data;
  const instrumentList = api.instrument.getAll.useQuery().data;

  const [newInstrumentId, setInstrumentId] = useState(instrumentId);
  const [musicianName, setMusicianName] = useState("");
  const [musicianPhone, setMusicianPhone] = useState("");
  const [musicianEmail, setMusicianEmail] = useState("");

  const router = useRouter();

  const createMusician = api.musician.create.useMutation({
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
          pathname: `/instruments/${newInstrumentId}`,
          query: {
            musicianCreated: true,
            message: `Musician ${musicianName} created`,
          },
        },
        `/instruments/${newInstrumentId}`
      );
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return (
    <>
      <fieldset className="mb-12 flex w-16">
        <form
          className="h-56"
          onSubmit={(e) => {
            e.preventDefault();
            createMusician.mutate({
              name: musicianName,
              phone: musicianPhone,
              email: musicianEmail,
              instrumentId: newInstrumentId,
            });
          }}
        >
          <div className="my-auto flex flex-col gap-2">
            <label className="text-slate-300">
              Name:
              <input
                className="mt-2 rounded-md bg-slate-300 pl-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-600"
                type="text"
                onChange={(e) => setMusicianName(e.target.value)}
              />
            </label>
            <label className="text-slate-300">
              Phone:
              <input
                className="mt-2 rounded-md bg-slate-300 pl-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-600"
                type="text"
                onChange={(e) => setMusicianPhone(e.target.value)}
              />
            </label>
            <label className="text-slate-300">
              Email:
              <input
                className="mt-2 rounded-md bg-slate-300 pl-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-600"
                type="text"
                onChange={(e) => setMusicianEmail(e.target.value)}
              />
            </label>
            <label>
              Instrument:
              <select
                className="mt-2 rounded-md bg-slate-300 py-1 pl-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-600"
                onChange={(e) => setInstrumentId(e.target.value)}
              // I want to rerender pageSubHeader when this value changes
              >
                <option selected>{originalInstrumentName}</option>
                {instrumentList?.map((instrument) => {
                  if (instrument.id !== instrumentId) {
                    return (
                      <option value={instrument.id} key={instrument.id}>
                        {instrument.name}
                      </option>
                    );
                  }
                })}
              </select>
            </label>
            <CreateMusicianButton />
          </div>
        </form>
      </fieldset>

      <hr className="mb-2.5 mt-12 w-full max-w-xs" />
      <BackButton />
    </>
  );
}
