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
import { UserType } from "@/types";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { CreateUnit } from "@/actions/unit";

export const NewUnitSchema = z.object({
  code: z.string(),
  leaderId: z.string().optional(),
});

export type NewUnitType = z.infer<typeof NewUnitSchema>;

const NewUnitButton = ({ user }: { user: UserType }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File>();
  const [loadingImage, setloadingImage] = useState<boolean>(false);
  const [formReadyToUpload, setFormReadyToUpload] = useState<boolean>(false);

  const form = useForm<NewUnitType>({
    resolver: zodResolver(NewUnitSchema),
    defaultValues: {
      code: "",
      leaderId: user.id,
    },
  });

  const handleImageUpload = async () => {
    setloadingImage(true);
    if (!file) return;

    try {
      const data = new FormData();
      data.set("file", file);

      const res = await fetch("/api/s3-upload", {
        method: "POST",
        body: data,
      })
        .then(() => {
          setloadingImage(false);
          setFormReadyToUpload(true);
          toast.success("Image Uploaded to Cloud");
          router.refresh();
        })
        .catch((e) => {
          toast("Something went wrong", { description: "Contact site admin" });
        });
      // handle the error
    } catch (e: any) {
      // Handle errors here
      console.error(e);
    }
  };

  async function onSubmit(data: NewUnitType) {
    data.leaderId = user.id;
    const res = await CreateUnit(data)
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
        <div className="bg-border duration-100 group group-hover:border-primary border rounded-md shadow-sm h-48 relative p-5 border-primary/20 hover:border-primary hover:cursor-pointer">
          <div className="font-light text-2xl text-primary">Unit</div>
          <div className="absolute bottom-5 right-5">
            <Megaphone className="group-hover:h-28 group-hover:w-28 group-hover:fill-muted-foreground/20 duration-200  w-16 h-16 stroke fill-muted-foreground" />
          </div>
          <div className=" text-muted-foreground">New</div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Ad</DialogTitle>
          <DialogDescription>Create New Ad</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-11/12"
          >
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem className="grow">
                  <FormLabel>Unit code</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      placeholder="enter unit code"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="leaderId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="hidden" {...field} value={user.id} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NewUnitButton;
