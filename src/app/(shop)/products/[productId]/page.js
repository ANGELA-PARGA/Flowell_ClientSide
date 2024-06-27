import styles from './page.module.css'
import ProductInfo from '@/_components/_layout_components/ProductInfo';
import { fetchProductsById } from '@/actions/productRequests';
import { notFound } from 'next/navigation';


export default async function Product({params}) {
  const data = await fetchProductsById(params.productId);  

  return (
    <section className={styles.main_container}>
      {
        data.product_found.length === 0 ? 
          notFound()
        : <ProductInfo data={data} id={params.productId}></ProductInfo>
      }
    </section>
  );
}
