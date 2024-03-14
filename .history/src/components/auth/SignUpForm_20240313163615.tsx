"use client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
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

const formSchema = z.object({
  name: z.string().min(2, { message: "Name required" }),
  email: z.string().email({ message: "Invalid email address" }),

  password: z.string().min(8, {
    message: "Password required min-8 characters",
  }),
});

export function SignUpForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const id  = toast.loading("Adding User...")
    const response = await fetch("/api/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
    });
    console.log(response);

    if (response.ok) {
      router.push("/sign-in");
    } else if (response.status === 409) {
      toast.error(id, {render: "User email already linked", type: "error", isLoading: false});
    } else {
      toast.update(id, {render: "Account created successfully", type: "success", isLoading: false});
      console.log("REGISTRATION FAIL ");
    }
    // toast("Here is your toast.");
    // console.log(values);
  };

  return (
    <Card className="w-[450px] h-[500px] flex flex-col justify-center items-center p-8">
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
            name="name"
            render={({ field }) => (
              <FormItem className="w-[350px] ">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="name" placeholder="Enter Your Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </Card>
  );
}
