import { useContext } from "react";
import { useSession } from "next-auth/react";
import { StoreContext } from "@/context";
import { CartIconNavBar } from '../../../public/svgIcons';
import Spinner from "@/UI/Spinner";
import styles from './components.module.css';

const CartItems = () => {
    const { data: session, status } = useSession();
    const { cartData } = useContext(StoreContext);

    return (
        <div className={styles.auth_button}>
            {status === 'loading' ? (
                <Spinner />
            ) : (
                <>
                    <CartIconNavBar width={22} height={22} weight={2} />
                    {session?.user?.email ? (
                        <span><span className={styles.itemNumber}>({cartData.total_items})</span></span>
                    ) : (
                        <span>Cart</span>
                    )}
                </>
            )}
        </div>
    );
};

export default CartItems;
