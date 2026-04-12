import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import Image from "next/image";
import { Code } from "bright";

Code.theme = "dark-plus";

const components: MDXComponents = {
  pre: Code,
  h2: ({ children }) => <h2 className="text-2xl font-bold mb-7 mt-12 first:mt-0">{children}</h2>,
  h3: ({ children }) => <h3 className="text-xl font-bold mb-5 mt-10 first:mt-0">{children}</h3>,
  p: ({ children }) => <p className="text-base">{children}</p>,
  a: ({ href, children, ...props }) => (
    <Link href={href ?? ""} {...props}>
      {children}
    </Link>
  ),
  hr: () => <hr className="my-10 border-gray-400 first:mt-0" />,
  table: ({ children }) => (
    <table className="text-sm border border-gray-400 my-6 first:mt-0">{children}</table>
  ),
  th: ({ children }) => <th className="bg-gray-100 border border-gray-400 py-2">{children}</th>,
  tr: ({ children }) => <tr className="border border-gray-400">{children}</tr>,
  td: ({ children }) => <td className="p-2 border-r border-gray-400">{children}</td>,
  code: ({ children }) => <code className="font-mono bg-gray-100 p-1">{children}</code>,
  blockquote: ({ children }) => (
    <blockquote className="bg-gray-100 p-4 my-6 block first:mt-0">{children}</blockquote>
  ),
  img: ({ src, alt }) => (
    <figure style={{ position: "relative", width: "100%", aspectRatio: "16/9" }}>
      <Image src={src ?? ""} alt={alt ?? ""} fill style={{ objectFit: "contain" }} />
    </figure>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
