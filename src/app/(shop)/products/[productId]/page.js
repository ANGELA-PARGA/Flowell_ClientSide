import styles from './page.module.css'
import { fetchProductsById, fetchAllProducts} from '@/lib/fetchingRequests';
import { notFound } from 'next/navigation';
import ScrollWrapper from '@/UI/ScrollWrapper';

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
  const data = await fetchProductsById(params.productId);

  return (
      <section className={styles.main_container}>
      {
        data.product_found.length === 0 ? 
          notFound()
        :        
          <ScrollWrapper data={data} id={params.productId}/>
      }
      </section>
  );
}
