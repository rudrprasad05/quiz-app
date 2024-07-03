import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full h-full">
      <Landing />
    </main>
  );
}
const Landing = () => {
  return (
    <section className="w-full flex flex-col items-center text-center py-24">
      <div className="flex flex-col gap-4 mb-4">
        <h1 className="text-4xl font-semibold">The Pass Quiz App</h1>
        <h3 className="text-xl text-accent-foreground">
          A Hub for your PASS Sessions
        </h3>
      </div>
      <div className="flex gap-4">
        <Button>Student</Button>
        <Button variant={"secondary"}>Leader</Button>
      </div>
      <div>
        <div className="">
          <Image
            src={"/header.jpg"}
            alt="header image"
            height={500}
            width={500}
          />
        </div>
      </div>
    </section>
  );
};
