"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Megaphone } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserType, UserWithUnitType } from "@/types";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { CreateUnit } from "@/actions/unit";
import { CreateNewQuiz } from "@/actions/quiz";

export const NewQuizSchema = z.object({
  week: z.string(),
  unitId: z.string(),
  topic: z
    .string()
    .min(2, "More than 2 characters")
    .max(64, "Less than 64 characters"),
  maxAttempts: z.string().default("1"),
  authorId: z.string(),
});

export type NewQuizType = z.infer<typeof NewQuizSchema>;

const NewQuizButton = ({ user }: { user: UserWithUnitType }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [weekState, setWeekState] = useState("1");
  const [maxAttemptState, setMaxAttemptState] = useState("1");

  const form = useForm<NewQuizType>({
    resolver: zodResolver(NewQuizSchema),
    defaultValues: {
      week: "",
      topic: "",
      maxAttempts: "",
      authorId: "",
      unitId: "",
    },
  });

  const maxAttempts = form.watch("maxAttempts");
  const week = form.watch("week");

  async function onSubmit(data: NewQuizType) {
    data.authorId = user.id;
    data.unitId = user.passUnit.id;
    data.maxAttempts = maxAttemptState;
    data.week = weekState;

    const res = await CreateNewQuiz(data)
      .then((res) => {
        toast.success("Product Created Successfully");
        setOpen(false);
        form.reset();
      })
      .catch((error) => {
        toast("Something went wrong", { description: "Contact site admin" });
        console.log("PRODUCT NEW - NewTagButton.tsx", error);
      });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-full">Create New</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Quiz</DialogTitle>
          <DialogDescription>Create New Quiz</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-11/12"
          >
            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem className="grow">
                  <FormLabel>Name your quiz</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      placeholder="enter quiz name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-6">
              <FormField
                control={form.control}
                name="week"
                render={({ field }) => (
                  <FormItem className="grow">
                    <FormLabel>Parent Category</FormLabel>
                    <Select
                      onValueChange={(e) => {
                        field.onChange;
                        setWeekState(e);
                      }}
                      defaultValue={"1"}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a week" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Array.from(Array(14).keys()).map((i) => (
                          <SelectItem key={`${i + 1}`} value={`${i + 1}`}>
                            week {i + 1}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="maxAttempts"
                render={({ field }) => (
                  <FormItem className="grow">
                    <FormLabel>Max Attempts</FormLabel>
                    <Select
                      onValueChange={(e) => {
                        field.onChange;
                        setMaxAttemptState(e);
                      }}
                      defaultValue={"1"}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select number of attempts" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Array.from(Array(3).keys()).map((i) => (
                          <SelectItem key={i + 1} value={`${i + 1}`}>
                            {i + 1}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* hidden fields */}
            <>
              <FormField
                control={form.control}
                name="authorId"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="hidden" {...field} value={user.id} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="unitId"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="hidden" {...field} value={user.id} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NewQuizButton;
