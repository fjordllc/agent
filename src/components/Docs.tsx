import DocList from "./DocList";

export default function DocsPage() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Docs</h1>
      <DocList itemsPerPage={2} />
    </div>
  );
}
