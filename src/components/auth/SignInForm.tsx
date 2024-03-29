"use client";
import toast from "react-hot-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),

  password: z.string().min(8, {
    message: "Password required min-8 characters",
  }),
});

export function SignInForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const id = toast.loading("Validating User...");
    const signInData = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    // console.log(signInData);

    if (signInData?.ok) {
      toast.success("Login successfully", { id: id, position: "top-center" });
      router.refresh();
      router.push("/dashboard");
    } else if (signInData?.error) {
      toast.error("Wrong credentials ", { id: id, position: "top-center" });
    } else {
      toast.error("Server Error ", { id: id, position: "top-center" });
    }
  };

  return (
    <Card className="w-[450px] h-[420px] flex flex-col justify-center items-center p-8">
      <CardHeader>
        <CardTitle className="text-center">Login to Account</CardTitle>
        <CardDescription className="text-center">
          login with your credentials
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-[350px] ">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter Your Email"
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
              <FormItem className="w-[350px] ">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter Your Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormDescription>
            Dont have account ?{" "}
            <span className="underline  cursor-pointer">
              <Link href={"/sign-up"}>Create one !</Link>
            </span>
          </FormDescription>
          <div className="flex justify-start">
            <Button type="submit">Login</Button>
          </div>
        </form>
      </Form>
    </Card>
  );
}
