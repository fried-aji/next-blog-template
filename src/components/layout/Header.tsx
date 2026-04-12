import Image from 'next/image';

import { NextLink } from '@/components/helper/NextLink';

type NavLink = {
  href: string;
  label: string;
};

const navLink: NavLink[] = [
  {
    href: '/about/',
    label: 'サイトについて',
  },
  {
    href: '/blog/',
    label: 'ブログ',
  },
];

export function Header() {
  return (
    <header className="w-full sticky top-0 bg-white z-10 px-10 py-5 border-b border-gray-200">
      <div className="grid grid-cols-[auto_1fr] items-center">
        <NextLink href="/">
          <Image src="/next.svg" alt="Next.js logo" width={100} height={20} priority />
        </NextLink>
        <nav aria-label="グローバルナビゲーション">
          <ul className="flex justify-end gap-6">
            {navLink.map((link: NavLink) => (
              <li key={link.href}>
                <NextLink
                  href={link.href}
                  className="aria-current-page:text-blue-500 aria-current-true:text-blue-500 font-ns-jp tracking-wide"
                >
                  {link.label}
                </NextLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
