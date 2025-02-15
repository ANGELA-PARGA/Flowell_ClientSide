'use client'

import { useCallback, useState, useRef, useEffect } from "react";
import Link from 'next/link';
import Image from "next/image";
import styles from './components.module.css';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { debounce } from "lodash";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { fetchProductsBySearch } from '@/lib/fetchingRequests'


export const SearchForm = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace, push, prefetch } = useRouter();
    const [updateError, setUpdateError] = useState();
    const [results, setResults] = useState([]);
    const [notFound, setNotFound] = useState(null);
    const inputRef = useRef(null); // Add a ref to the input field
    const dropdownRef = useRef(null); // Add a ref to the dropdown menu
    
    const schema = yup.object({
        search: yup.string().required('The search term is required').max(25, "max 25 characters allowed")
    });

    const { register, trigger } = useForm({
        resolver: yupResolver(schema)
    });

    const handleSearch = useCallback(
        debounce(async (searchTerm) => {
            if(searchTerm){
                const result = await fetchProductsBySearch(searchTerm);
                const itemsList = result.product_found;
                if(itemsList.length === 0){
                    setNotFound('No results');
                    setResults([])                    
                } else {
                    setResults(itemsList);
                    setNotFound(null)
                    prefetch(`/products/search?t=${searchTerm}`);
                }                
            } else {
                setResults([]);
                setNotFound(null);
            }         
        }, 300),
        [] 
    );

    const handleChange = async (event) => {
        event.preventDefault();
        const searchTerm = event.target.value;
        const params = new URLSearchParams(searchParams);
        if (searchTerm) {
            params.set('q', searchTerm);
        } else {
            params.delete('q');
            replace(`${pathname}`);
            setResults([])
            setNotFound(null)
        }
        replace(`${pathname}?${params.toString()}`);
        try {
            await trigger('search');
            handleSearch(searchTerm);
        } catch (error) {
            console.log(error);
            setUpdateError(error.message);        
        }
    };

    const handleOnKeyDown = async (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const searchTerm = event.target.value.trim();
            setResults([]);
            setNotFound(null);
            if (searchTerm) {                
                push(`/products/search?t=${searchTerm}`);
                inputRef.current.value = ''; // Clear the input field
            }  
        }
    };

    const handleOnClick = async (event) => {
        event.preventDefault();
        const searchTerm = inputRef.current.value.trim(); // Get the value from the input field using the ref
        setResults([]);
        setNotFound(null);
        if (searchTerm) {                
            push(`/products/search?t=${searchTerm}`);
            inputRef.current.value = ''; // Clear the input field
        }
    };

    // Add a click event listener to detect clicks outside the dropdown menu
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setResults([]);
                setNotFound(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    return (
        <>
            <form className={styles.search_container} onKeyDown={handleOnKeyDown}>
                <input
                    type="text"
                    placeholder="Search..."
                    {...register("search", { onChange: handleChange })}
                    defaultValue={searchParams.get('q')?.toString()}
                    ref={inputRef} // Add the ref to the input field
                />
                
            {notFound !== null && (
                <div className={styles.search_dropdown_menu} ref={dropdownRef}>
                    <p>No results</p>
                </div>
            )}
            {results?.length > 0 && 
                <div className={styles.search_dropdown_menu} ref={dropdownRef}>
                    <h4>Best results</h4>
                    <ul className={styles.search}>                
                    {results.slice(0, 6).map((item) => (
                        <li key={item.id} className={styles.searchResults} onClick={() => setResults([])}>
                            <Image
                                src={item.images_urls[0]}
                                width={50}
                                height={50}
                                style={{ borderRadius: '5%' }}
                                alt={item.name}
                            /> 
                            <Link href={`/products/${item.id}`}>                           
                                {item.name}                           
                            </Link>
                        </li>                    
                    ))}
                    </ul>
                    <button type="submit" onClick={handleOnClick} className={styles.see_results_link}>See all results</button> 
                    {updateError && (
                        <p>{updateError}</p>
                    )}
                </div>
            }          
        </form>
        </>
    );
};
