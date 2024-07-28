import SettingsHeader from "@/components/settings-header";

type TLayout = Readonly<{
  children: React.ReactNode;
}>;

export default function Layout({ children }: TLayout) {
  return (
    <>
      <SettingsHeader />

      {children}
    </>
  );
}
