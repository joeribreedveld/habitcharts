"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <main className="container flex min-h-full flex-col items-center justify-center gap-4">
      <Badge variant="secondary">404</Badge>
      <h1 className="mt-1 text-center text-3xl font-semibold leading-tight md:block md:text-4xl lg:leading-[1.1]">
        Page not found
      </h1>
      <p className="text-center sm:text-lg font-light text-foreground">
        Sorry, we couldn&apos;t find the page you&apos;re looking for.
      </p>
      <div className="mt-4 flex items-center gap-4">
        <Link href="/">
          <Button>Go back home</Button>
        </Link>
        <Link href="/support">
          <Button variant="outline">Contact support</Button>
        </Link>
      </div>
    </main>
  );
}
