import styles from './page.module.css'
import ProductInfo from '@/_components/_layout_components/ProductInfo';
import { fetchProductsById } from '@/_utilities/productRequests';


export default async function Product({params}) {

  const data = await fetchProductsById(params.productId);  
  console.log(data)

  return (
    <main className={styles.main_container}>
      {
        data.product_found.length === 0 ? 
          <div className={styles.category_empty_container}>
              <p className={styles.category_empty_message}>404 PRODUCT NOT FOUND</p>
              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-leaf" width="150" height="150" viewBox="0 0 24 24" strokeWidth="2" stroke="#0067a0" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M5 21c.5 -4.5 2.5 -8 7 -10" />
              <path d="M9 18c6.218 0 10.5 -3.288 11 -12v-2h-4.014c-9 0 -11.986 4 -12 9c0 1 0 3 2 5h3z" />
              </svg>
              <p className={styles.category_empty_message}>Flowell</p>
          </div>
        : <ProductInfo data={data}></ProductInfo>
      }
    </main>
  );
}
