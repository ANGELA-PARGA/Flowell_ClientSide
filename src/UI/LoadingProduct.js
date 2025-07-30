import styles from './components.module.css'

const LoadingProduct = () => {
  return (
    <div className={`${styles.skeletonProductContainer} flex-row-gap`}>
        <div className={styles.loadingProductImage}></div>
        <div className={styles.loadingProductInformation}></div>
    </div>
    
  )
}

export default LoadingProduct