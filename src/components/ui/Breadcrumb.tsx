'use client';

import { usePathname } from 'next/navigation';

import { NextLink } from '@/components/helper/NextLink';

type BreadCrumbItem = {
  name: string;
  href?: string;
};

type Props = {
  classList?: string;
  breadCrumbList?: (BreadCrumbItem | string)[];
};

const ITEM_HOME: BreadCrumbItem = { name: 'ホーム', href: '/' };

function generateBreadcrumbList(pathname: string): BreadCrumbItem[] {
  const segments = pathname.split('/').filter(Boolean);
  const items: BreadCrumbItem[] = [ITEM_HOME];

  for (const [index, segment] of segments.entries()) {
    const href = `/${segments.slice(0, index + 1).join('/')}`;
    const isLast = index === segments.length - 1;
    items.push({ name: segment, ...(isLast ? {} : { href }) });
  }

  return items;
}

function normalizeItem(item: BreadCrumbItem | string): BreadCrumbItem {
  return typeof item === 'string' ? { name: item } : item;
}

export function Breadcrumb({ breadCrumbList, classList, ...props }: Props) {
  const pathname = usePathname();
  const items = breadCrumbList
    ? [ITEM_HOME, ...breadCrumbList.map((item) => normalizeItem(item))]
    : generateBreadcrumbList(pathname);

  return (
    <nav aria-label="パンくずリスト" className={['w-fit', classList].filter(Boolean).join(' ')} {...props}>
      <ol itemScope itemType="https://schema.org/BreadcrumbList">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li
              key={item.name}
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
              className="inline not-first:pl-5 font-medium text-xs"
            >
              {item.href && !isLast ? (
                <NextLink href={item.href} itemProp="item" className="underline">
                  <span itemProp="name">{item.name}</span>
                </NextLink>
              ) : (
                <span itemProp="name" aria-current="page" className="text-gray-400">
                  {item.name}
                </span>
              )}
              <meta itemProp="position" content={String(index + 1)} />
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
