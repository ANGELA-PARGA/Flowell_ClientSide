'use client' 

import { useEffect } from 'react'
import Link from 'next/link'
import styles from './page.module.css'
export default function Error({ error, reset }) {

    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className='error-container-standard'>
            <h2>Something went wrong!</h2>
            <p className={styles.error_updating_info}>{error.message}</p>
            <button
                onClick={
                () => reset()
                }
                className='btn_primary_standard btn_sizeM'
            >
                Try again
            </button>
            <Link href={'/'}><button className='btn_primary_standard btn_sizeM'>Main Page</button></Link>
        </div>
    )
}