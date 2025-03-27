import styles from './page.module.css'
import { fetchAllProducts} from '@/lib/fetchingRequests';
import LoadingProduct from '@/UI/LoadingProduct';
import ProductInfo from '@/components/product/ProductInfo';
import { Suspense } from 'react';

export const dynamicParams = true
export const revalidate = 3600

export async function generateStaticParams() {
  const allProducts = await fetchAllProducts();
  const productIds = allProducts.products_and_categories.map(product => product.id);
  return productIds.map((id) => ({
    productId: id.toString(),
  }));
}

export default async function Product(props) {
  
  const params = await props.params;

  return (
      <section className={styles.main_container}>
      <Suspense fallback={<LoadingProduct/>}>
        <ProductInfo id={params.productId}/>
      </Suspense>
      </section>
  );
}
