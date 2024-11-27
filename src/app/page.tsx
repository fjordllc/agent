import Link from "next/link";

export default async function Index() {
  return (
    <>
      <h1>Fjord Agent</h1>
      <ul>
        <li><Link href="/sign-up" >サインアップ</Link></li>
        <li><Link href="/sign-in" >サインイン</Link></li>
      </ul>
    </>
  );
}
