
import DashboardLayout from "@/components/DashboardLayout";
import Provider from "@/components/Provider";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <Provider>
      <DashboardLayout/>
      <main className="bg-[#f2edf3] col-[2/3] row-[2/3] p-3 overflow-auto ">
          {children}
        </main>
    </Provider>
  );
}
