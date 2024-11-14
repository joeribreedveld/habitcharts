"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  username: z.string().min(2).max(50),
});

export default function Page() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <main className="px-4 sm:container py-24 flex gap-16 flex-col">
      <div className="mx-auto gap-3 flex flex-col w-full">
        <h1 className="mt-1 text-center text-3xl font-semibold leading-tight md:block md:text-4xl lg:leading-[1.1]">
          Join the waitlist!
        </h1>
        <p className="text-center text-lg font-light text-foreground">
          Be the first to know when we launch.
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 sm:max-w-md mx-auto w-full mt-6"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex gap-4 flex-col sm:flex-row">
                      <Input {...field} />
                      <Button type="submit">Join waitlist</Button>
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>

      <div className="max-w-4xl mx-auto flex flex-col sm:gap-12 gap-8">
        <div className="w-full p-3 border rounded-lg bg-muted">
          <Image
            src="/images/demo1.png"
            alt="Demo image"
            width={1440}
            height={1024}
            className="w-full rounded-lg border"
          />
        </div>
        <div className="w-full p-3 border rounded-lg bg-muted">
          <Image
            src="/images/demo3.png"
            alt="Demo image"
            width={1440}
            height={1024}
            className="w-full rounded-lg border"
          />
        </div>
      </div>

      <Link
        href="https://x.com/joeribreedveld"
        target="_blank"
        rel="noopener noreferrer"
        className="mx-auto mt-4 flex gap-4 items-center group"
      >
        <Button size="icon" variant="secondary">
          <Twitter className="w-4 h-4" />
        </Button>

        <p className="group-hover:underline underline-offset-2 text-sm">
          @joeribreedveld
        </p>
      </Link>
    </main>
  );
}
