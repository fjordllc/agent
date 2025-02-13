import DocList from "./DocList";

export default function Docs() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Docs</h1>
       {/* BootCamp のドキュメント一覧は毎ページ 20 アイテム*/}
      <DocList itemsPerPage={20} />
    </div>
  );
}
