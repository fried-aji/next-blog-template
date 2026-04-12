import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <h2>404 Not Found</h2>
      <p>ページが見つかりませんでした。</p>
      <Link href="/">ホームに戻る</Link>
    </main>
  );
}
