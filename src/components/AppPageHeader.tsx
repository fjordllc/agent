import { ReactNode } from "react";

type AppPageHeaderProps = {
  title: string;
  children?: ReactNode;
};

export default function AppPageHeader({ title, children }: AppPageHeaderProps) {
  return (
    <>
      <hr className="bg-border" />
      <header id="app-page-header" className="bg-white">
        <div className="container">
          <div className="h-20 flex justify-between items-center">
            <h1 className="text-2xl font-bold">{title}</h1>
            {children}
          </div>
        </div>
      </header>
      <hr className="border-t" />
    </>
  );
}
