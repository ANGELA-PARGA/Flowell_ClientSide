'use client' 

import { useEffect } from 'react'
import Link from 'next/link'
import styles from '../page.module.css'
export default function Error({ error, reset }) {

    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className={styles.error_container}>
            <h2>Something went wrong!</h2>
            <p className={styles.error_updating_info}>{error.message}</p>
            <button
                onClick={
                () => reset()
                }
                className={styles.try_again_button}
            >
                Try again
            </button>
            <Link href={'/'}><button className={styles.return_main_page_button}>Main Page</button></Link>
        </div>
    )
}