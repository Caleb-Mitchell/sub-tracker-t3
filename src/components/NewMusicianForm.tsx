import { BackButton } from "./BackButton";
import { CreateMusicianButton } from "./CreateMusicianButton";
import { useState } from "react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { type Instrument } from "@prisma/client";

interface NewMusicianFormProps {
  originalInstrument: Instrument;
}

export function NewMusicianForm({ originalInstrument }: NewMusicianFormProps) {
  const instrumentList = api.instrument.getAll.useQuery().data;

  const [selectedInstrument, setSelectedInstrument] =
    useState<Instrument | null>(null);
  const [musicianName, setMusicianName] = useState("");
  const [musicianPhone, setMusicianPhone] = useState("");
  const [musicianEmail, setMusicianEmail] = useState("");

  const originalInstrumentIfNotSelected = () => {
    return selectedInstrument ? selectedInstrument : originalInstrument;
  };

  // TODO: make sure this always returns an instrument
  const findInstrumentByName = (name: string) => {
    return instrumentList?.find((i) => i.name === name);
  };

  const router = useRouter();

  const createMusician = api.musician.create.useMutation({
    onSuccess: () => {
      void router.push(
        {
          pathname: `/instruments/${originalInstrumentIfNotSelected().id}`,
          query: {
            musicianCreated: true,
            message: `Musician ${musicianName} created`,
          },
        },
        `/instruments/${originalInstrumentIfNotSelected().id}`
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
              instrumentId: originalInstrumentIfNotSelected().id,
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
                defaultValue={originalInstrument.name}
                className="mt-2 w-full rounded-md bg-slate-300 py-1 pl-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-600"
                onChange={(e) =>
                  setSelectedInstrument(
                    findInstrumentByName(e.target.value) ?? originalInstrument
                  )
                }
              >
                <option>{originalInstrumentIfNotSelected().name}</option>
                {instrumentList?.map((instrument) => {
                  if (instrument !== selectedInstrument) {
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
