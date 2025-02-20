import { useContext } from "react";
import { useSession } from "next-auth/react";
import { StoreContext } from "@/context";
import { CartIconNavBar } from '../../../public/svgIcons';
import styles from './components.module.css';

const CartItems = () => {
    const { data: session, status } = useSession();
    const { cartData } = useContext(StoreContext);

    return (
        <div className={styles.auth_button}>
            {status === 'loading' ? (
                <>
                <CartIconNavBar width={28} height={28} weight={2} />
                <span className={styles.number_items_cart}><span className={styles.itemNumber}>0</span></span>
                </>
            ) : (
                <>
                    <CartIconNavBar width={28} height={28} weight={2} />                    
                    {session?.user?.email ? (
                        <span className={styles.number_items_cart}>
                        <span className={styles.itemNumber}>{cartData.total_items}</span>
                        </span>
                    ) : (
                        <span className={styles.number_items_cart}>
                        <span className={styles.itemNumber}>0</span>
                        </span>
                    )}

                </>
            )}
        </div>
    );
};

export default CartItems;
