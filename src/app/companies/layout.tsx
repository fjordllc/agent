import MultiLayout from "@components/layouts/MulitLayout";

export default function CompaniesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MultiLayout>{ children }</MultiLayout>;
}
