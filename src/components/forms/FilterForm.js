'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import styles from './components.module.css';

/*This component sets the URL to apply the filter parameters (color - category) */
const FilterForm = ({ type, handleClose }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [appliedFilters, setAppliedFilters] = useState([]);
    const filterRef = useRef(null);

    useEffect(() => {
        // Update applied filters based on URL search params
        const params = new URLSearchParams(searchParams);
        const filters = [];
        if (type === 'color') {
            filters.push(...params.getAll('color'));
        }
        if (type === 'category') {
            filters.push(...params.getAll('category'));
        }
        setAppliedFilters(filters);
    }, [searchParams, type]);

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setSelectedOptions((prev) =>
            checked ? [...prev, value] : prev.filter((item) => item !== value) // Add or remove the value from the array
        );
    };

    const handleApply = (e) => {
        e.preventDefault();
        const params = new URLSearchParams(searchParams);

        if (type === 'color') {
            params.delete('color'); // Clear previous values
            selectedOptions.forEach((option) => params.append('color', option));
        }

        if (type === 'category') {
            params.delete('category'); // Clear previous values
            selectedOptions.forEach((option) => params.append('category', option));
        }

        router.push(`?${params.toString()}`);
        handleClose(); 
    };

    const handleRemoveFilter = (filter) => {
        /*Can't use delete, because I could have more than one key of the same type. So it will delete all entries*/
        const params = new URLSearchParams(searchParams);
        params.delete('p');
        /*Constructing new URL filtering the entry with the same value as the argument */
        const newParams = new URLSearchParams(); 
        for (const [key, value] of params.entries()) { 
            if (!(value === filter)) { 
                newParams.append(key, value); 
            }
        }
        router.replace(`?${newParams.toString()}`);
        handleClose(); 
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                handleClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [filterRef]);

    const colors = ['white', 'red', 'yellow', 'pink', 'light pink', 'green', 'lavender', 'orange']
    const categories = ['roses', 'greenery', 'spray roses', 'hydrangeas', 'gerberas', 'sunflowers', 'moms', 'poms']
    
    return (
        <div className={styles.filterMenu} ref={filterRef}>
            <h4>Choose a {type}</h4>
            <form onSubmit={handleApply} className={styles.filterForm}>
                {type === 'color' && (
                    <div className={styles.filterBoxes} >
                        { colors.map((color, index) =>{
                            return (
                                <label key={index+1}>
                                    <input type="checkbox" value={color} className={styles.filterBoxesInputs} onChange={handleCheckboxChange} />
                                    {color}
                                </label>
                            )
                        })}
                    </div>
                )}

                {type === 'category' && (
                    <div className={styles.filterBoxes}>
                        { categories.map((category, index) =>{
                            return (
                                <label key={index+1}>
                                    <input type="checkbox" value={category} className={styles.filterBoxesInputs} onChange={handleCheckboxChange} />
                                    {category}
                                </label>
                            )
                        })}
                    </div>
                )}
                <div className={styles.filterButtonsContainer}>
                    <button type="submit" className={styles.filterButtons}>Apply</button>
                    <button type="button" className={styles.filterButtons} onClick={handleClose}>Cancel</button>
                </div>
            </form>
            <div className={styles.appliedFilters}>
                {appliedFilters.map((filter, index) => (
                    <div key={index} className={styles.filterTag}>
                        {filter} <button className={styles.removeFilterButton} onClick={() => handleRemoveFilter(filter)}> x </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FilterForm;
