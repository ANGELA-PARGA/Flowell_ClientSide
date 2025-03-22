import styles from './components.module.css'

const LoadingCheckout = () => {
    return (
        <div className={styles.skeletonCheckoutContainer}>
            <div className={styles.loadingCartInfo}>
                <div className={styles.loadingProductCheckout}>
                    <div></div>
                    <div></div>
                </div>
                <div className={styles.loadingProductCheckout}>
                    <div></div>
                    <div></div>
                </div>
                <div></div>
            </div>
            <div className={styles.loadingPersonalInfo}>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
        
    )
}

export default LoadingCheckout