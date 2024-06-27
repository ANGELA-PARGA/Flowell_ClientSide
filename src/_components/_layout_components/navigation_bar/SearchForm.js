'use client'

import React, { useCallback, useState, useEffect } from "react";
import Link from 'next/link';
import Image from "next/image";
import styles from './components.module.css';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { debounce } from "lodash";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { fetchProductsBySearch } from "@/actions/productRequests";
import mini_image11 from '../../../../public/mini_image11.jpeg'

export const SearchForm = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const [updateError, setUpdateError] = useState();
    const [results, setResults] = useState([]);
    
    const schema = yup.object({
        search: yup.string().required('The search term is required').max(50, "max 50 characters allowed")
    });

    const { register, reset, trigger } = useForm({
        resolver: yupResolver(schema)
    });

    const handleSearch = useCallback(
        debounce(async (searchTerm) => {
            const result = await fetchProductsBySearch(searchTerm);
            const itemsList = result.product_found;
            console.log('Items list:', itemsList); 
            setResults(itemsList);
        }, 300),
        [] 
    );

    const handleChange = async (event) => {
        event.preventDefault();
        const searchTerm = event.target.value;
        const params = new URLSearchParams(searchParams);
        if (searchTerm) {
            params.set('term', searchTerm);
        } else {
            params.delete('term');
        }
        replace(`${pathname}?${params.toString()}`);
        try {
            /*await trigger('search');*/
            handleSearch(searchTerm);
        } catch (error) {
            console.log(error);
            setUpdateError(error.message);
            toast.error(updateError);           
        }
    };

    useEffect(() => {
        console.log('Results updated:', results);
    }, [results]);

    return (
        <>
            <form className={styles.search_container}>
                <input
                    type="text"
                    placeholder="Search..."
                    {...register("search", { onChange: handleChange })}
                    onBlur={() => {
                        trigger('search'); 
                    }} 
                    defaultValue={searchParams.get('term')?.toString()}
                />
            </form>
            {results?.length > 0 && 
            <div className={styles.search_dropdown_menu}>
                <h4>Best results</h4>
                <ul className={styles.search}>                
                {results.map((item) => (
                    <li key={item.id} className={styles.searchResults}>
                        <Image
                                src={mini_image11}
                                width={50}
                                height={50}
                                style={{ borderRadius: '50%' }}
                                alt={item.name}
                        /> 
                        <Link href={`/products/${item.id}`}>                           
                            {item.name}                           
                        </Link>
                    </li>                    
                ))}
                </ul>
            </div>
            }
        </>
    );
};
