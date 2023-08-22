import { type Instrument } from "@prisma/client";
import { type Musician } from "@prisma/client";
import { BackToInstrumentButton } from "./BackToInstrumentButton";
import { ConfirmButton } from "./ConfirmButton";
import { useState } from "react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

interface EditMusicianFormProps {
  originalInstrument: Instrument;
  originalMusician: Musician;
}

export function EditMusicianForm({
  originalInstrument,
  originalMusician,
}: EditMusicianFormProps) {
  const router = useRouter();
  const { data: session } = useSession();

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
  const [selectedInstrument, setSelectedInstrument] =
    useState<Instrument | null>(null);

  const findInstrumentByName = (name: string) => {
    return instrumentList?.find((i) => i.name === name);
  };

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
  const originalInstrumentIfNotSelected = () => {
    return selectedInstrument ? selectedInstrument : originalInstrument;
  };

  const updateMusician = api.musician.update.useMutation({
    onSuccess: () => {
      void router.push(
        {
          // TODO: make sure toast works on successful edit
          pathname: `/instruments/${originalInstrumentIfNotSelected().id}`,
          query: {
            musicianUpdated: true,
            message: `Musician ${updatedMusicianName ?? originalMusician.name
              } updated`,
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
            updateMusician.mutate({
              id: originalMusician.id,
              name: originalMusicianNameIfNotUpdated(),
              phone: originalMusicianPhoneIfNotUpdated() ?? "",
              email: originalMusicianEmailIfNotUpdated() ?? "",
              instrumentId: originalInstrumentIfNotSelected().id,
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
            <label>
              Instrument:
              <select
                className="mt-2 w-full rounded-md bg-slate-300 py-1 pl-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-600"
                onChange={(e) =>
                  setSelectedInstrument(
                    findInstrumentByName(e.target.value) ?? originalInstrument
                  )
                }
              >
                <option>{originalInstrumentIfNotSelected().name}</option>
                {instrumentList?.map((instrument) => {
                  if (
                    instrument.name !== originalInstrumentIfNotSelected().name
                  )
                    return (
                      <option value={instrument.name} key={instrument.id}>
                        {instrument.name}
                      </option>
                    );
                })}
              </select>
            </label>
            <ConfirmButton text="Update Musician" />
          </div>
        </form>
      </fieldset>

      <hr className="mb-2.5 mt-12 w-full max-w-xs" />
      <BackToInstrumentButton instrument={originalInstrument} />
    </>
  );
}
