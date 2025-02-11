import styles from './page.module.css'
import ProductCard from '@/components/product/ProductCard';
import { fetchProductsByCategory, fetchCategories } from '@/lib/fetchingRequests';
import { AddColorFilter } from '@/components/product/AddFilters';
import PaginationButton from '@/UI/PaginationButton';

export const dynamicParams = true
export const revalidate = 3600

export async function generateStaticParams() {
  const allCategories = await fetchCategories();
  const categoriesId = allCategories.products_and_categories.map(category => category.id);
  return categoriesId.map((id) => ({
    categoryId: id.toString(),
  }));
}

export default async function CategoryProducts(props) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  
  const page = Number(searchParams?.p) || 1;
  const colorFilter = searchParams?.color || [];
  const data = await fetchProductsByCategory(params.categoryId, page, { color: colorFilter});
  const pages = data.pagination.totalPages
  const totalProducts = data.pagination.totalProducts

  return (
    <>
    { data.products_by_category.length === 0 ?
        <section className={styles.main_container}>
          <h2>Found: <span>0 Results</span></h2>
          <AddColorFilter/>
          <h3>Products not found, clear some filters and try again</h3>
        </section> 
        : 
        <section className={styles.main_container}>
          <h2>All {data.products_by_category[0].category_name} <span>{totalProducts} Results</span></h2>
          <AddColorFilter/>
          <section className={styles.products_main_container}>         
            {data.products_by_category.map(product => (              
              <ProductCard key={product.id} data={product} />              
            ))}         
          </section>
          <div className={styles.paginationContainer}>
              {Array.from({ length: pages }, (_, index) => (
                  <PaginationButton key={index + 1} number={index + 1} />
              ))}                    
          </div>
        </section>        
        }
    </>
  );
}
