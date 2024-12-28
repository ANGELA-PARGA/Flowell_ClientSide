import styles from './components.module.css'

const LoadingProduct = () => {
  return (
    <div className={styles.skeletonContainer}>
        <div className={styles.loadingProductImage}></div>
        <div className={styles.loadingProductInformation}></div>
    </div>
    
  )
}

export default LoadingProduct