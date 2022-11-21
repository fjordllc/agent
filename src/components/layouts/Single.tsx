import { ReactElement } from "react";

type LayoutProps = Required<{
  readonly children: ReactElement;
}>;

export default function Single({ children }: LayoutProps) {
  return <>{children}</>;
}
