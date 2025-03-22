import styles from './components.module.css'

const LoadingAllProducts = () => {
    return (
        <div className={styles.skeletonProductsListContainer}>
            <div className={styles.loadingProduct}></div>
            <div className={styles.loadingProduct} ></div>
            <div className={styles.loadingProduct}></div>
        </div>
        
    )
}

export default LoadingAllProducts