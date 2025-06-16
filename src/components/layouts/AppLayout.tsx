import AppHeader from "@components/AppHeader";
import AppFooter from "@/components/AppFooter";
import AppSidebar from "../AppSidebar";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div id="AppLayout" className="pl-52 flex flex-col min-h-screen bg-gray-100">
      <div className="flex-1">
        <AppHeader />
        <AppSidebar />
        <div id="app-page" className="">
          {children}
        </div>
      </div>
      <AppFooter />
    </div>
  );
}
