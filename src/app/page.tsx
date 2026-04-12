import Link from "next/link";

type docItem = {
  href: string;
  title: string;
};

const docData: docItem[] = [
  {
    href: "https://nextjsjp.org/",
    title: "Next.js 公式ドキュメント（日本語）",
  },
  {
    href: "https://ja.react.dev/",
    title: "React 公式ドキュメント（日本語）",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <main className="w-full py-32 px-20">
        <h1 className="text-4xl font-bold tracking-wide">Next.js テンプレート</h1>
        <div className="mt-6 md:mt-16">
          <h2 className="text-2xl font-semibold leading-10 tracking-tight text-black">
            参考リンク
          </h2>
          <ul className="grid grid-cols-3 mt-10 gap-10">
            {docData.map((item: docItem) => (
              <li key={item.href} className="grid">
                <Link
                  href={item.href}
                  target="_blank"
                  className="bg-gray-100 font-medium rounded-sm pt-6 pb-8 px-6"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
