import { BackButton } from "./BackButton";
import { CreateMusicianButton } from "./CreateMusicianButton";
import { useState } from "react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { type Instrument } from "@prisma/client";
import { Listbox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { toast } from "react-hot-toast";

export function NewMusicianFormNoInstrument() {
  const { data: session } = useSession();
  const router = useRouter();
  const ctx = api.useContext();

  const { data: instrumentList } = api.instrument.getAll.useQuery({
    userId: session?.user?.id ? session.user.id : "",
  });

  const [selectedInstruments, setSelectedInstruments] = useState(
    [] as Instrument[]
  );

  const [musicianName, setMusicianName] = useState("");
  const [musicianPhone, setMusicianPhone] = useState("");
  const [musicianEmail, setMusicianEmail] = useState("");

  const createMusician = api.musician.create.useMutation({
    onMutate: async () => {
      toast.loading("Creating musician...");
      await ctx.instrument.getAll.cancel();
    },
    onSettled: async () => {
      await ctx.instrument.getAll.invalidate();
    },

    onSuccess: () => {
      toast.dismiss();
      toast.success(`Musician ${musicianName} created`);
      void router.push(
        {
          pathname: `/instruments/`,
        },
        `/instruments/`
      );
    },
    onError: (err) => {
      toast.dismiss();
      toast.error(`Error deleting musician: ${err.message}}`);
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
              userId: session?.user?.id ? session.user.id : "",
              phone: musicianPhone,
              email: musicianEmail,
              instrumentIds: selectedInstruments.map((i) => i.id),
            });
          }}
        >
          <div className="my-auto flex flex-col gap-2">
            <label className="text-slate-300">
              Name:
              <input
                required
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
            <Listbox
              value={selectedInstruments}
              onChange={setSelectedInstruments}
              by="name"
              multiple
            >
              <Listbox.Label className="-mb-2">Instrument:</Listbox.Label>
              <div className="relative mt-2">
                <Listbox.Button className="relative mb-1 w-full rounded-md bg-slate-300 pl-2 pr-10 text-left text-slate-800 shadow-md focus:outline-none focus:ring-2 focus:ring-slate-600">
                  {selectedInstruments.length === 0
                    ? "Select Instrument(s)"
                    : selectedInstruments.length > 1
                    ? `${
                        selectedInstruments.map(
                          (instrument) => instrument.name
                        )[0]
                      } + ${selectedInstruments.length - 1}`
                    : `${
                        selectedInstruments.map(
                          (instrument) => instrument.name
                        )[0]
                      }`}

                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Listbox.Options className="absolute z-10 mt-2 max-h-60 w-full overflow-x-hidden rounded-md bg-slate-300 pl-2 pr-10 text-left text-slate-800 shadow-md focus:outline-none focus:ring-2 focus:ring-slate-600">
                  {instrumentList?.map((instrument) => (
                    <Listbox.Option
                      key={instrument.id}
                      className={({ active }) =>
                        `relative flex w-40 select-none ${
                          active ? "text-slate-400" : "text-slate-900"
                        }`
                      }
                      value={instrument}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {instrument.name}
                          </span>
                          {selectedInstruments
                            .map((instrument) => instrument.name)
                            .includes(instrument.name) ? (
                            <span className="ml-auto flex pl-3 text-amber-600">
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </Listbox>
            <CreateMusicianButton />
          </div>
          <select
            className="absolute top-80 opacity-0"
            aria-hidden="true"
            required
            multiple
            value={selectedInstruments.map((i) => i.id)}
          >
            {selectedInstruments.map((instrument) => (
              <option key={instrument.id} value={instrument.id}></option>
            ))}
          </select>
        </form>
      </fieldset>

      <hr className="mb-5 mt-12 w-full max-w-xs" />
      <BackButton />
    </>
  );
}
