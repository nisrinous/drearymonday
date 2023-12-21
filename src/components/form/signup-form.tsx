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
import axios from "axios";

import useSWR from "swr";
import toast from "react-hot-toast";
import router from "next/router";

const Inputs = z
  .object({
    name: z.string().min(3, {
      message: "Name must be at least 3 characters",
    }),
    username: z.string().min(5, {
      message: "Name must be at least 5 characters",
    }),
    email: z
      .string()
      .min(3, {
        message: "Email must be at least 3 characters",
      })
      .refine((email) => email.includes("@"), {
        message: "Email must contain @ symbol",
      }),
    password: z.string(),
    confirmpassword: z.string(),
    address: z.string(),
    phonenumber: z
      .string()
      .min(7, {
        message: "Phone number must be at least 7 characters",
      })
      .startsWith("0", {
        message: "Phone number must start with 0",
      }),
    referral: z.string(),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Passwords do not match",
    path: ["confirmpassword"],
  });

const SignUpForm = () => {
  const form = useForm<z.infer<typeof Inputs>>({
    resolver: zodResolver(Inputs),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmpassword: "",
      address: "",
      phonenumber: "",
      referral: "",
    },
  });

  const { data: existingUserData, error: existingUserError } = useSWR(
    `http://localhost:9000/users?email=${form.getValues("email")}`,
    async (url) => {
      const response = await axios.get(url);
      return response.data;
    }
  );

  function onSubmit(formData: z.infer<typeof Inputs>) {
    if (existingUserError) {
      toast.error("Error fetching existing user data");
      return;
    }
    if (existingUserData && existingUserData.length > 0) {
      toast.error("Email already exists");
      return;
    }

    try {
      const poster = async (url: string) => {
        const response = await axios.post(url, {
          role: "user",
          membership: "basic",
          name: formData.name,
          username: formData.username,
          email: formData.email,
          password: formData.password,
          address: formData.address,
          phonenumber: formData.phonenumber,
          referral: formData.referral,
          liked: [],
          history: [],
          expired_subs: "",
        });
        if (response.data) {
          toast.success("User successfully signed up!");
          router.push("/auth/signin");
        }
      };
      poster("http://localhost:9000/users");
    } catch (error) {
      toast.error("" + error);
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Username" {...field} />
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
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="E-mail" {...field} />
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
                  <PasswordInput placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmpassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="Confirm password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phonenumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="08..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="referral"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Referral Code</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Referral e-mail" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">
            Sign up
            <span className="sr-only">Sign up</span>
          </Button>
        </form>
      </Form>
    </>
  );
};
export default SignUpForm;
