"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  ShoppingBag,
  Upload,
} from "lucide-react";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { z } from "zod";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const UserRegisterFormSchema = z
  .object({
    email: z.string().email({ message: "Enter a Valid Email" }),
    name: z
      .string()
      .min(2, { message: "Should have more than 2 characters" })
      .max(50, { message: "Should have less than 50 characters" }),
    password: z
      .string()
      .min(6, { message: "Password must contain more than 2 characters" })
      .max(32, { message: "Password must have less than 2 characters" }),
    confirmPassword: z.string(),
    role: z.string(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

export type UserRegisterFormType = z.infer<typeof UserRegisterFormSchema>;

const UserRegisterForm = () => {
  const session = useSession();
  const params = useParams();
  const isEmailSent: boolean = params.sent as unknown as boolean;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
  const [redirectToSetup, setredirectToSetup] = useState(false);

  const checkAuth = () => {
    if (redirectToSetup && session.data?.user.id != undefined) {
      router.push(`/seller/auth/${session.data?.user.id}`);
    }
  };

  const form = useForm<UserRegisterFormType>({
    resolver: zodResolver(UserRegisterFormSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
      role: "USER",
    },
  });

  function onSubmit(data: UserRegisterFormType) {
    setIsLoading(true);
    console.log(data);
    axios
      .post("/api/register", data)
      .then((res) => {
        signIn("credentials", { ...data, redirect: false });
        router.push(`/`);
      })
      .catch(() => {
        toast("Something went wrong", { description: "Contact site Admin" });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div className="container gap-10 h-[90vh] max-w-2xl  relative flex py-10 items-center justify-center lg:px-0">
      <div className="grow px-20 flex flex-col justify-center space-y-6 ">
        <div className="flex flex-col items-center space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create an Account
          </h1>

          <Link
            className={buttonVariants({
              variant: "link",
              className: "gap-1.5",
            })}
            href="/login"
          >
            Already have an account? Sign-in
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 ">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="hidden" {...field} value="USER" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="grow">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="off"
                        placeholder="enter name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="off"
                        placeholder="enter email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={isPasswordVisible ? "text" : "password"}
                          autoComplete="off"
                          placeholder="enter password"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (isPasswordVisible) setIsPasswordVisible(false);
                            else setIsPasswordVisible(true);
                          }}
                          className=" h-full aspect-square absolute top-0 right-0 grid place-items-center "
                        >
                          {isPasswordVisible ? (
                            <EyeOff className="stroke-muted-foreground w-5 h-5" />
                          ) : (
                            <Eye className="stroke-muted-foreground w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={isPasswordVisible ? "text" : "password"}
                          autoComplete="off"
                          placeholder="enter password"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (isPasswordVisible) setIsPasswordVisible(false);
                            else setIsPasswordVisible(true);
                          }}
                          className=" h-full aspect-square absolute top-0 right-0 grid place-items-center "
                        >
                          {isPasswordVisible ? (
                            <EyeOff className="stroke-muted-foreground w-5 h-5" />
                          ) : (
                            <Eye className="stroke-muted-foreground w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="USER">user</SelectItem>
                        <SelectItem value="LEADER">leader</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="w-full" type="submit">
                {isLoading && <Loader2 className={"animate-spin mr-3"} />}
                Register
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default UserRegisterForm;
