'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Props = React.ComponentProps<typeof Link> & {
  target?: string;
  rel?: string;
};

export function NextLink({ href, target, ...props }: Props) {
  const pathname = usePathname();
  // 末尾スラッシュを除去して比較
  const normalizedPathname = pathname.replace(/\/$/, '');
  const normalizedHref = href.toString().replace(/\/$/, '');
  const isCurrent = normalizedPathname === normalizedHref;
  const isContain = !isCurrent && normalizedPathname.startsWith(`${normalizedHref}/`);
  let ariaCurrent: 'page' | 'true' | undefined;
  if (isCurrent) {
    ariaCurrent = 'page';
  } else if (isContain) {
    ariaCurrent = 'true';
  }

  return <Link href={href} target={target} aria-current={ariaCurrent} {...props} />;
}
