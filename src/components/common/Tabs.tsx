'use client';
import { classNames } from '@/lib/utils';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface TabProps {
  tabMap: { name: string; href: string }[];
}

export default function Tabs({ tabMap }: React.PropsWithChildren<TabProps>) {
  const searchParams = useSearchParams();
  const search: string = searchParams.get('tab') || 'tab';

  return (
    <div className="ml-10 flex items-baseline space-x-4 justify-around mb-4">
      {tabMap.map((item) => (
        <Link
          key={item.name}
          href={`?tab=${item.href}`}
          className={classNames(
            item.href === search
              ? 'bg-gray-900 text-white'
              : 'text-slate-500 font-semibold hover:bg-gray-700 hover:text-white',
            'rounded-md px-3 py-2 text-sm font-medium',
          )}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}
