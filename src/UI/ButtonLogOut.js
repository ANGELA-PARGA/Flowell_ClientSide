'use client'

import styles from '../components/navigation/components.module.css'
import { useDispatch } from 'react-redux';
import { clearCart } from '@/store/cart/slice';
import { executeLogout } from '@/lib/clientLogout';


export default function ButtonLogOut(){
    const dispatch = useDispatch();

    const onClickLogOut = async () => {
        await executeLogout({
            callbackUrl: '/login',
            onBeforeSignOut: () => {
                dispatch(clearCart());
            },
        });
    }

    return (
        <button className={`${styles.btn_logout} btn_primary_standard btn_sizeS`} onClick={onClickLogOut}>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-logout" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
            <path d="M9 12h12l-3 -3" />
            <path d="M18 15l3 -3" />
            </svg>
            logout
        </button>
    )
}