"use client";

import * as React from "react";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Link from "next/link";
import Logo from "@/components/logo";

export default function SignIn() {
  return (
    <>
      <div className="h-screen flex flex-row gap-20 justify-center items-center">
        <div className="mx-auto lg:w-1/4 w-sm mb-10 md:mb-0">
          <div className="mx-auto mt-5">
            <Logo />
          </div>
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-6xl">404</CardTitle>
              <CardDescription className="text-lg">
                Sorry we couldn&apos;t find this page
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <div className="text-sm text-muted-foreground">
                Already have an account?{" "}
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
