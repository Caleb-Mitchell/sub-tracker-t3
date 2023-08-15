import Image from "next/image";

export function DemoTable() {
  return (
    // <Image src="/images/demo.png" alt="Demo table" width={1000} height={500} />
    <Image
      className="mb-2 w-4/5 max-w-md"
      // this one is pretty low res
      src="/images/subtracker_gif.gif"
      alt="Demo table"
      width={1000}
      height={500}
    />
  );
}
