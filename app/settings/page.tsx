import { SettingsSidebar } from "@/components/settings-sidebar";
import { Skeleton } from "@/components/ui/skeleton";

const items = [
  { href: "/settings", title: "Profile" },
  { href: "/settings/account", title: "Account" },
];

export default function Page() {
  return (
    <main className="px-4 sm:container py-12 flex gap-16">
      <SettingsSidebar items={items} />

      <div className="w-full max-w-2xl">
        <h2 className="text-lg font-semibold">Profile</h2>
        <p className="text-muted-foreground text-sm">
          Manage your account settings
        </p>

        <Skeleton className="h-10 w-full mt-8" />
        <Skeleton className="h-10 w-full mt-4" />
        <Skeleton className="h-10 w-full mt-4" />
        <Skeleton className="h-10 w-full mt-4" />
        <Skeleton className="h-10 w-full mt-4" />
      </div>
    </main>
  );
}
