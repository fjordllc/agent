import { ReactElement } from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

type LayoutProps = Required<{
  readonly children: ReactElement;
}>;

export default function Multi({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <div className="flex overflow-hidden pt-16">
        <Sidebar />
        <main className="h-full w-full relative overflow-y-auto lg:ml-64">
          {children}
        </main>
      </div>
    </>
  );
}
