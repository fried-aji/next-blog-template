import Form from 'next/form';
import Link from 'next/link';

import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { getAllPosts } from '@/lib/blog';
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata(`/blog`, {
  title: 'ブログ',
});

// https://nextjsjp.org/docs/app/api-reference/file-conventions/page#searchparams%E3%82%AA%E3%83%97%E3%82%B7%E3%83%A7%E3%83%B3
type Props = Readonly<{
  searchParams: Promise<{ q?: string }>;
}>;

export default async function BlogPage({ searchParams }: Props) {
  const { q } = await searchParams;
  // q の前後の空白を除去し、未指定の場合は空文字にする
  const query = q?.trim() ?? '';
  const allPosts = getAllPosts();
  const posts = query
    ? allPosts.filter((post) =>
        // 大文字小文字無視でフィルタリング
        post.title.toLowerCase().includes(query.toLowerCase()),
      )
    : allPosts;

  return (
    <main className="p-20">
      <Breadcrumb
        breadCrumbList={[
          //
          { name: 'ブログ' },
        ]}
        classList="ml-auto"
      />
      <h1 className="font-bold text-4xl mt-16">ブログ</h1>
      {/* ブラウザの GET 送信で /blog?q=** に遷移 */}
      <Form action="/blog" className="mt-8 grid grid-cols-[1fr_max-content] items-center gap-x-5">
        <input
          type="search"
          name="q"
          defaultValue={query}
          placeholder="記事を検索"
          className="border rounded w-full px-3 py-2"
        />
        <button type="submit" className="cursor-pointer px-5 py-2 bg-black text-white rounded">
          検索
        </button>
      </Form>
      {posts.length === 0 ? (
        <div className="mt-12">
          <p className="text-gray-500">該当する記事がありません</p>
          <Link
            href="/blog"
            className="block mt-6 text-white bg-black w-fit font-medium px-5 pt-1.5 pb-2 rounded-full text-base"
          >
            検索をクリア
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-3 auto-rows-fr md:gap-12 md:mt-20">
          {posts.map((post) => (
            <article key={post.slug} className="grid">
              <Link href={`/blog/${post.slug}`} className="grid md:px-8 md:pt-10 md:pb-16 bg-gray-100 rounded-sm">
                <h2 className="font-medium text-xl">{post.title}</h2>
                <time dateTime={post.date} className="self-end text-sm font-ns block md:mt-2">
                  {post.date}
                </time>
              </Link>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
