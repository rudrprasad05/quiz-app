"use client";

import { formatDistance } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

import { Form } from "react-hook-form";
import { Quiz } from "@prisma/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Delete, Edit, MoveRight, View } from "lucide-react";
import { Button } from "@/components/ui/button";

export async function FormCard({ form }: { form: Quiz }) {
  const router = useRouter();
  const handleDelete = async (id: string) => {
    // await DeleteForm(id).then(() => {
    //   toast.success("Post Deleted");
    //   router.refresh();
    // });
  };
  return (
    <Card className="bg-muted flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 justify-between">
          <span className="truncate font">{form.topic}</span>
          {form.isPublished && (
            <Badge className="bg-green-400 hover:bg-green-400/80 text-muted">
              Published
            </Badge>
          )}
          {!form.isPublished && (
            <Badge className="" variant={"destructive"}>
              Draft
            </Badge>
          )}
        </CardTitle>
        <CardDescription className="flex items-center justify-between text-muted-foreground text-sm">
          {/* {formatDistance(form.createdAt, new Date(), {
            addSuffix: true,
          })} */}
          {form.isPublished && (
            <span className="flex items-center gap-2">
              <View className="text-muted-foreground" />
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[20px] truncate text-sm text-muted-foreground">
        {form.topic || "No description"}
      </CardContent>
      <CardFooter className="mt-auto pt-6">
        <div className="flex items-center gap-3 w-full mt-auto">
          {form.isPublished && (
            <Button
              asChild
              className={`grow text-muted bg-muted-foreground hover:bg-muted-foreground/80 w-full text-xs gap-4 `}
            >
              <Link href={`/quiz/${form.id}`}>
                View <MoveRight className="w-4 h-4" />
              </Link>
            </Button>
          )}
          {!form.isPublished && (
            <Button
              asChild
              className={`grow text-muted px-2 bg-muted-foreground hover:bg-muted-foreground/80 w-full text-xs gap-4 `}
            >
              <Link href={`/admin/${form.authorId}/quiz/${form.id}/edit`}>
                Edit form <Edit className="w-4 h-4" />
              </Link>
            </Button>
          )}
          <Button
            onClick={() => handleDelete(form.id)}
            className="p-3"
            variant={"destructive"}
          >
            <Delete />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
