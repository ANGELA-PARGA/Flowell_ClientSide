'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import styles from './components.module.css';


/*It takes a number, this number is placed on the URL (p) to make the fetch of a specific page */
const PaginationButton = ({ number }) => {
    const searchParams = useSearchParams(); 
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('p', number); 

    return (
        <Link href={`?${newParams.toString()}`}>
            <button className={styles.paginationButton}>{number}</button>
        </Link>
    );
};

export default PaginationButton;

