import { PAGE_ROUTES } from '@/PageRoutes';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StoreType, TypeofStore } from '@mediapartners/shared-types/types/ecommerce/StoreType';
import Link from 'next/link';
import React from 'react';

type Props = {
  stores: StoreType[];
};

const StoreList = (props: Props) => {
  const { stores } = props;
  return (
    <table className="table-auto w-full text-center text-sm font-semibold">
      <thead>
        <tr>
          <th className="px-4 py-2">Butiks typ</th>
          <th className="px-4 py-2">Url</th>
          <th className="px-4 py-2">Name</th>
          <th className="px-4 py-2">Produkt(er)</th>
          <th className="px-4 py-2">Ordrar</th>
          <th className="px-4 py-2"></th>
        </tr>
      </thead>
      <tbody>
        {stores.length > 0 ? (
          stores.map((item: StoreType) => (
            <tr key={item._id} className="text-grey-200">
              <td className="border-t px-4 py-4 text-black text-xs">{item.type}</td>
              <td className="border-t px-4 py-4 text-black">{item.url}</td>
              <td className="border-t px-4 py-4">{item.name}</td>
              <td className="border-t px-4 py-4">
                {item.type === TypeofStore.SingleProduct ? (
                  <div>
                    <span>
                      <Badge className="bg-primary text-primary" color="bg-primary" variant={'default'}>
                        Hundkoppel 5m ficklampa
                      </Badge>
                    </span>
                  </div>
                ) : (
                  item.products?.length
                )}
              </td>
              <td className="border-t px-4 py-4">{item.orders?.length}</td>
              <td className="border-t px-4 py-4 text-primary">
                <Link href={`${PAGE_ROUTES.ecommerceStores}/${item._id}`}>
                  <Button variant={'outline'}>Edit</Button>
                </Link>
              </td>
            </tr>
          ))
        ) : (
          <div>No stores have been created</div>
        )}
      </tbody>
    </table>
  );
};

export default StoreList;
