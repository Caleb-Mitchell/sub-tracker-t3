import { type Instrument } from "@prisma/client";
import { type Musician } from "@prisma/client";
import { BackToInstrumentButton } from "./BackToInstrumentButton";
import { ConfirmButton } from "./ConfirmButton";
import { useState } from "react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { BackButton } from "./BackButton";
import { Listbox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { toast } from "react-hot-toast";

interface EditMusicianFormProps {
  originalInstruments: Instrument[];
  originalMusician: Musician;
}

export function EditMusicianForm({
  originalInstruments,
  originalMusician,
}: EditMusicianFormProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const ctx = api.useContext();

  const { data: instrumentList } = api.instrument.getAll.useQuery({
    userId: session?.user?.id ? session.user.id : "",
  });

  const [updatedMusicianName, setUpdatedMusicianName] = useState<string | null>(
    null
  );
  const [updatedMusicianPhone, setUpdatedMusicianPhone] = useState<
    string | null
  >(null);
  const [updatedMusicianEmail, setUpdatedMusicianEmail] = useState<
    string | null
  >(null);

  const [selectedInstruments, setSelectedInstruments] =
    useState(originalInstruments);

  const originalMusicianNameIfNotUpdated = () => {
    return updatedMusicianName ? updatedMusicianName : originalMusician.name;
  };
  const originalMusicianPhoneIfNotUpdated = () => {
    return updatedMusicianPhone
      ? updatedMusicianPhone
      : originalMusician.phoneNumber;
  };
  const originalMusicianEmailIfNotUpdated = () => {
    return updatedMusicianEmail
      ? updatedMusicianEmail
      : originalMusician.emailAddress;
  };

  const updateMusician = api.musician.update.useMutation({
    onMutate: async () => {
      toast.loading("Updating musician...");
      await ctx.instrument.getAllPlayedByMusician.cancel();
    },
    onSettled: async () => {
      await ctx.instrument.getAllPlayedByMusician.invalidate();
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success(
        `Musician name ${
          originalMusician.name
        } updated to ${originalMusicianNameIfNotUpdated()}`
      );
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
            updateMusician.mutate({
              id: originalMusician.id,
              name: originalMusicianNameIfNotUpdated(),
              phone: originalMusicianPhoneIfNotUpdated() ?? "",
              email: originalMusicianEmailIfNotUpdated() ?? "",
              instrumentIds: selectedInstruments.map((i) => i.id),
            });
          }}
        >
          <div className="my-auto flex flex-col gap-2">
            <label className="text-slate-300">
              Name:
              <input
                value={updatedMusicianName ?? originalMusician.name}
                className="mt-2 rounded-md bg-slate-300 pl-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-600"
                type="text"
                onChange={(e) => setUpdatedMusicianName(e.target.value)}
              />
            </label>
            <label className="text-slate-300">
              Phone:
              <input
                value={
                  updatedMusicianPhone ?? originalMusician.phoneNumber ?? ""
                }
                className="mt-2 rounded-md bg-slate-300 pl-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-600"
                type="text"
                onChange={(e) => setUpdatedMusicianPhone(e.target.value)}
              />
            </label>
            <label className="text-slate-300">
              Email:
              <input
                value={
                  updatedMusicianEmail ?? originalMusician.emailAddress ?? ""
                }
                className="mt-2 rounded-md bg-slate-300 pl-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-600"
                type="text"
                onChange={(e) => setUpdatedMusicianEmail(e.target.value)}
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
            <ConfirmButton text="Update Musician" />
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
