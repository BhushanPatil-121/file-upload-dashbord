import DashboardLayout from "@/components/DashboardLayout";
import Provider from "@/components/Provider";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider>
      <DashboardLayout />
    </Provider>
  );
}
