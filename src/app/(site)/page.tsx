import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="px-20">
      <h1 className="text-center">Are you a</h1>
      <div className="flex">
        <Card>
          <CardHeader>
            <CardTitle>Student</CardTitle>
          </CardHeader>
          <CardFooter>
            <Link href={"/login/student"}>Let's Go</Link>
          </CardFooter>
        </Card>
        <Card>Student</Card>
      </div>
    </main>
  );
}
