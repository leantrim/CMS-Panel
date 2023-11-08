import { PAGE_ROUTES } from '@/PageRoutes';
import ImagesBrowser from '@/components/ImagesBrowser';
import NextBreadcrumb from '@/components/common/Breadcrumbs';
import { getData } from '@/lib/queryApi';
import { faStore } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { API_ROUTES } from '@mediapartners/shared-types/types/Routes';
import Link from 'next/link';

const tabMap = [
  {
    name: 'Butiker',
    icon: faStore,
    href: PAGE_ROUTES.ecommerceStores,
  },
  {
    name: 'Produkter',
    icon: faStore,
    href: PAGE_ROUTES.products,
  },
  {
    name: 'Butiker',
    icon: faStore,
    href: PAGE_ROUTES.ecommerceStores,
  },
];

export default async function Layout({ children }: { children: React.ReactNode }) {
  const images = await getData(API_ROUTES.UPLOAD);

  return (
    <div className="flex flex-col bg-white shadow-md rounded-lg p-6 font-thin">
      <div className="flex w-full justify-between px-12 items-center text-center bg-gray-200 rounded-lg p-2 shadow-md">
        {tabMap.map((item, index) => (
          <Link href={item.href} key={index}>
            <div>
              <FontAwesomeIcon icon={item.icon} />
              <div>{item.name}</div>
            </div>
          </Link>
        ))}
      </div>
      <ImagesBrowser images={images} />
      <NextBreadcrumb
        homeElement={'Hem'}
        separator={<span> | </span>}
        activeClasses="text-gray-500"
        containerClasses="flex py-5 text-gray-400 font-thin text-sm"
        listClasses="hover:underline mx-2 font-bold"
        capitalizeLinks
      />
      {children}
    </div>
  );
}
