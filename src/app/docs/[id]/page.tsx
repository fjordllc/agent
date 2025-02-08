import { notFound } from "next/navigation";

type Params = {
  params: { id: string; title: string };
};

export default async function DocDetails({ params }: Params) {
  if (!params) {
    notFound();
  }

  return (
    <div>
      <h1>{params.id}</h1>
      <p>{params.title}</p>
    </div>
  );
}
