import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { getAllPosts, type BlogMDXModule } from '@/lib/blog';
import { createMetadata } from '@/lib/metadata';

type Props = Readonly<{
  params: Promise<{ slug: string }>;
}>;

// 存在しないパス（slug）を使った動的ページ生成を禁止
// https://nextjsjp.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams
export const dynamicParams = false;

// https://nextjsjp.org/docs/app/api-reference/functions/generate-static-params
export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const { frontmatter } = (await import(`@/content/blog/${slug}.mdx`)) as BlogMDXModule;

  return createMetadata(`/blog/${slug}`, {
    title: `${frontmatter.title} | ブログ`,
    description: frontmatter.description,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const { default: Post, frontmatter } = (await import(`@/content/blog/${slug}.mdx`)) as BlogMDXModule;

  return (
    <main className="p-20">
      <article className="max-w-240 mx-auto">
        <Breadcrumb
          breadCrumbList={[
            //
            { name: 'ブログ', href: '/blog/' },
            { name: frontmatter.title },
          ]}
          classList="ml-auto"
        />
        <header className="mt-16">
          <time dateTime={frontmatter.date} className="text-gray-500 text-base font-ns block">
            {frontmatter.date}
          </time>
          <h1 className="text-4xl font-bold mt-4">{frontmatter.title}</h1>
        </header>
        <div className="mt-30">
          <Post />
        </div>
      </article>
    </main>
  );
}
