import { Button } from "./ui/button";
import Link from "next/link";

export default function SettingsHeader() {
  return (
    <header className="flex flex-col px-4 mt-12 sm:container">
      <Link href="/">
        <Button className="w-fit" variant="ghost">
          &larr; Back
        </Button>
      </Link>
      <h1 className="text-xl font-bold tracking-tight mt-8">Settings</h1>
      <p className="text-muted-foreground">Manage your account settings</p>
    </header>
  );
}
