import styles from './page.module.css'
import ProductInfo from '@/components/product/ProductInfo';
import { fetchProductsById } from '@/lib/fetchingRequests';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import LoadMore from '@/UI/LoadMore';

export default async function Product({params}) {
  const data = await fetchProductsById(params.productId); 

  return (
      <section className={styles.main_container}>
      {
        data.product_found.length === 0 ? 
          notFound()
        : 
        <Suspense key={params.productId} fallback={<LoadMore/>}>
          <ProductInfo data={data} id={params.productId}></ProductInfo>
        </Suspense>
      }
      </section>
  );
}
