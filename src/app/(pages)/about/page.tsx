import Link from 'next/link';

import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata(`/about`, {
  title: 'サイトについて',
});

export default function About() {
  return (
    <main className="py-10 px-20">
      <Breadcrumb
        breadCrumbList={[
          //
          { name: 'サイトについて' },
        ]}
        classList="ml-auto"
      />
      <h1 className="text-4xl font-bold mt-16">サイトについて</h1>
      <p className="max-w-200 mt-10 leading-[1.75]">
        このサイトはNext.jsのハンズオン練習用に実装したブログテンプレートです。
        <br />
        React Server
        Componentsの静的レンダリング（SSG）をベースに、検索UIなどの動的レンダリングを組み合わせた標準的な機能を組み込んでいます。
      </p>
      <Link href="/" className="block mt-10 font-medium underline">
        ホームに戻る
      </Link>
    </main>
  );
}
