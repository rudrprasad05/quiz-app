import { Card } from "@/components/ui/card";
import Image from "next/image";

export default function Home() {
  return (
    <main className="px-20">
      <h1>Select One</h1>
      <div className="flex">
        <Card>Pass Leader</Card>
        <Card>Student</Card>
      </div>
    </main>
  );
}
