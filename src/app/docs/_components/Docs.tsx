import DocList from "./DocList";

export default function Docs() {
  return (
    <div className="p-20px">
      <h1>Docs</h1>
      <DocList itemsPerPage={20} />
    </div>
  );
}
