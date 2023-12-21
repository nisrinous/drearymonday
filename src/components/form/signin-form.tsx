"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/input/password-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import useSWR from "swr";
import axios from "axios";
import toast from "react-hot-toast";
import router from "next/router";
import Cookies from "js-cookie";

const Inputs = z.object({
  email: z
    .string()
    .min(3, {
      message: "Email must be at least 3 characters",
    })
    .refine((email) => email.includes("@"), {
      message: "Email must contain @ symbol",
    }),
  password: z.string(),
});

const SignInForm = () => {
  const form = useForm<z.infer<typeof Inputs>>({
    resolver: zodResolver(Inputs),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { data, error } = useSWR(
    `http://localhost:9000/users?email=${form.getValues(
      "email"
    )}&password=${form.getValues("password")}`,
    async (url) => {
      const response = await axios.get(url);
      return response.data;
    }
  );

  function onSubmit() {
    if (error) {
      toast.error("" + error);
      return;
    }

    if (data && data.length > 0) {
      toast.success("User successfully signed in!");

      Cookies.set("authToken", "generatedToken", { path: "/" });
      Cookies.set("user-role", data[0].role, { path: "/" });
      Cookies.set("user-id", data[0].id, { path: "/" });
      Cookies.set("user-membership", data[0].membership, { path: "/" });

      router.push("/news");
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          className="grid gap-4"
          onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Your email here..."
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
                  <PasswordInput
                    placeholder="Your password here..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">
            Sign in
            <span className="sr-only">Sign in</span>
          </Button>
        </form>
      </Form>
    </>
  );
};

export default SignInForm;
