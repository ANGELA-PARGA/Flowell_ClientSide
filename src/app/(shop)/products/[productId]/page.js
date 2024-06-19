import styles from './page.module.css'
import ProductInfo from '@/_components/_layout_components/ProductInfo';
import { fetchProductsById } from '@/_utilities/productRequests';
import { LeafIcon } from '../../../../../public/svgIcons';


export default async function Product({params}) {
  const data = await fetchProductsById(params.productId);  

  return (
    <section className={styles.main_container}>
      {
        data.product_found.length === 0 ? 
          <div className={styles.category_empty_container}>
              <p className={styles.category_empty_message}>404 PRODUCT NOT FOUND</p>
              <LeafIcon width={150} height={150} weight={2}/>
              <p className={styles.category_empty_message}>Flowell</p>
          </div>
        : <ProductInfo data={data}></ProductInfo>
      }
    </section>
  );
}
