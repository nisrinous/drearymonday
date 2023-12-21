import * as React from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Link from "next/link";
import Logo from "@/components/logo";
import SignUpForm from "@/components/form/signup-form";

export default function SignUp() {
  return (
    <>
      <div className="h-full md:h-screen flex flex-col md:flex-row gap-5 justify-center md:gap-0 md:items-center">
        <div className="mx-auto mt-5">
          <Logo />
        </div>
        <div className="mx-auto lg:w-1/4 w-sm mb-10 md:mb-0">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-4xl text-center">Sign Up</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <SignUpForm />
            </CardContent>
            <CardFooter className="flex flex-wrap items-center justify-between gap-2">
              <div className="text-sm text-muted-foreground">
                <span className="mr-1 sm:inline-block">
                  Already have an account?
                </span>
                <Link
                  aria-label="Sign in"
                  href="/auth/signin"
                  className="text-primary underline-offset-4 transition-colors hover:underline"
                >
                  Sign in
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}
