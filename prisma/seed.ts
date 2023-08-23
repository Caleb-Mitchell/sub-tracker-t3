import { type Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const musicians: Prisma.MusicianCreateInput[] = [
  // { name: "caleb", phoneNumber: "5555555555", emailAddress: "caleb@gmail.com" },
  // { name: "stef", phoneNumber: "5555555556", emailAddress: "stef@gmail.com" },
  // { name: "steve", phoneNumber: "5555555557", emailAddress: "steve@gmail.com" },
  // { name: "joe", phoneNumber: "5555555558", emailAddress: "joe@gmail.com" },
  // { name: "joon", phoneNumber: "5555555559", emailAddress: "joon@gmail.com" },
  // { name: "alice", phoneNumber: "5555555560", emailAddress: "alice@gmail.com" },
  // {
  //   name: "bethany",
  //   phoneNumber: "5555555561",
  //   emailAddress: "bethany@gmail.com",
  // },
  // { name: "alex", phoneNumber: "5555555562", emailAddress: "alex@gmail.com" },
  // { name: "jim", phoneNumber: "5555555563", emailAddress: "jim@gmail.com" },
  // { name: "tony", phoneNumber: "5555555564", emailAddress: "tony@gmail.com" },
  // {
  //   name: "johnny",
  //   phoneNumber: "5555555565",
  //   emailAddress: "johnny@gmail.com",
  // },
  // { name: "josh", phoneNumber: "5555555566", emailAddress: "josh@gmail.com" },
  // { name: "jess", phoneNumber: "5555555567", emailAddress: "jess@gmail.com" },
  // { name: "ryan", phoneNumber: "5555555568", emailAddress: "ryan@gmail.com" },
  // { name: "angie", phoneNumber: "5555555569", emailAddress: "angie@gmail.com" },
  // { name: "bud", phoneNumber: "5555555570", emailAddress: "bud@gmail.com" },
  // {
  //   name: "declan",
  //   phoneNumber: "5555555571",
  //   emailAddress: "declan@gmail.com",
  // },
  // { name: "molly", phoneNumber: "5555555572", emailAddress: "molly@gmail.com" },
  // {
  //   name: "autumn",
  //   phoneNumber: "5555555573",
  //   emailAddress: "autumn@gmail.com",
  // },
  // {
  //   name: "esther",
  //   phoneNumber: "5555555574",
  //   emailAddress: "esther@gmail.com",
  // },
  // { name: "renee", phoneNumber: "5555555575", emailAddress: "renee@gmail.com" },
  // { name: "jeff", phoneNumber: "5555555576", emailAddress: "jeff@gmail.com" },
  // { name: "jimmy", phoneNumber: "5555555577", emailAddress: "jimmy@gmail.com" },
  // { name: "myla", phoneNumber: "5555555578", emailAddress: "myla@gmail.com" },
  // {
  //   name: "elouise",
  //   phoneNumber: "5555555579",
  //   emailAddress: "elouise@gmail.com",
  // },
  // { name: "remi", phoneNumber: "5555555580", emailAddress: "remi@gmail.com" },
  // { name: "euan", phoneNumber: "5555555581", emailAddress: "euan@gmail.com" },
  // {
  //   name: "bertha",
  //   phoneNumber: "5555555582",
  //   emailAddress: "bertha@gmail.com",
  // },
  // { name: "shawn", phoneNumber: "5555555583", emailAddress: "shawn@gmail.com" },
  // { name: "tanya", phoneNumber: "5555555584", emailAddress: "tanya@gmail.com" },
  // {
  //   name: "kirsty",
  //   phoneNumber: "5555555585",
  //   emailAddress: "kirsty@gmail.com",
  // },
  // {
  //   name: "howard",
  //   phoneNumber: "5555555586",
  //   emailAddress: "howard@gmail.com",
  // },
  // { name: "peter", phoneNumber: "5555555587", emailAddress: "peter@gmail.com" },
  // {
  //   name: "gabriel",
  //   phoneNumber: "5555555588",
  //   emailAddress: "gabriel@gmail.com",
  // },
  // {
  //   name: "dillon",
  //   phoneNumber: "5555555589",
  //   emailAddress: "dillon@gmail.com",
  // },
  // { name: "dylan", phoneNumber: "5555555590", emailAddress: "dylan@gmail.com" },
  // {
  //   name: "shirley",
  //   phoneNumber: "5555555591",
  //   emailAddress: "shirley@gmail.com",
  // },
  // { name: "ash", phoneNumber: "5555555592", emailAddress: "ash@gmail.com" },
  // { name: "sam", phoneNumber: "5555555593", emailAddress: "sam@gmail.com" },
  // { name: "leyla", phoneNumber: "5555555594", emailAddress: "leyla@gmail.com" },
  // { name: "aaron", phoneNumber: "5555555595", emailAddress: "aaron@gmail.com" },
  // { name: "megan", phoneNumber: "5555555596", emailAddress: "megan@gmail.com" },
  // { name: "david", phoneNumber: "5555555597", emailAddress: "david@gmail.com" },
  // { name: "edgar", phoneNumber: "5555555598", emailAddress: "edgar@gmail.com" },
];

const instruments: Prisma.InstrumentCreateInput[] = [
  // { name: "banjo" },
  // { name: "guitar" },
  // { name: "violin" },
  // { name: "viola" },
  // { name: "cello" },
  // { name: "bass" },
  // { name: "drums" },
  // { name: "vocals" },
  // { name: "trombone" },
  // { name: "clarinet" },
  // { name: "trumpet" },
  // { name: "oboe" },
  // { name: "bassoon" },
  // { name: "triangle" },
  // { name: "bass drum" },
  // { name: "theremin" },
  // { name: "piano" },
  // { name: "steel pan" },
  // { name: "ewi" },
  // { name: "baritone saxophone" },
  // { name: "tenor saxophone" },
  // { name: "alto saxophone" },
  // { name: "soprano saxophone" },
  // { name: "bugle" },
  // { name: "flugelhorn" },
  // { name: "bass trombone" },
  // { name: "lute" },
  // { name: "baroque trumpet" },
  // { name: "mandolin" },
  // { name: "flute" },
  // { name: "english horn" },
  // { name: "musical saw" },
];

async function connectMusicianToInstrument(
  musicianPhoneNumber: string,
  instrumentName: string
) {
  await prisma.musician.update({
    where: { phoneNumber: musicianPhoneNumber },
    data: {
      instruments: {
        connect: {
          name: instrumentName,
        },
      },
    },
  });
  return null;
}

async function main() {
  // console.log(`Seeding musicians...`);
  // for (const m of musicians) {
  //   await prisma.musician.create({ data: m });
  //   console.log(`Created musician ${m.name}`);
  // }
  // console.log(`Seeding instruments`);
  // for (const i of instruments) {
  //   await prisma.instrument.create({ data: i });
  //   console.log(`Created instrument ${i.name}`);
  // }
  // console.log(`Connecting musicians with their instruments...`);
  // for (let i = 0; i < musicians.length; i++) {
  //   try {
  //     console.log(
  //       `Connecting ${musicians[i]?.name} with ${instruments[i]?.name}`
  //     );
  //     await connectMusicianToInstrument(
  //       musicians[i]?.phoneNumber ?? "",
  //       instruments[i]?.name ?? ""
  //     );
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
