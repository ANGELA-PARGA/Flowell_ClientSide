import styles from './components.module.css'

const LoadingOrders = () => {
    return (
        <div className={styles.skeletonOrderContainer}>
            <div className={styles.loadingOrderNumber}></div>
            <div className={styles.loadingOrderNumber}></div>
            <div className={styles.loadingOrderNumber}></div>
        </div>
        
    )
}

export default LoadingOrders