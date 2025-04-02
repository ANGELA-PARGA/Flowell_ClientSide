'use client'

import { useState } from 'react'
import styles from './components.module.css'
import { ChevronDown } from '../../../public/svgIcons'
import FilterForm from '../forms/FilterForm'
import { Suspense } from 'react'

export const AddAllFilters = () => {
  const [openFilters, setOpenFilters] = useState(false)
  const [filterType, setFilterType] = useState('')


  const handleOpenFilters = (type) => {
    setOpenFilters(true);
    setFilterType(type)
  }

  const handleCloseFilters = () => {
    setOpenFilters(false);
    setFilterType('')
  }

  return (
    <>
      <div className={styles.filter_sort_buttons_container}>
        <div className={styles.filter_sort_buttons_container}>
          <button className={styles.button_sort_and_filter} onClick={() => handleOpenFilters('color')}>color</button>
          <button className={styles.button_sort_and_filter} onClick={() => handleOpenFilters('category')}>category</button>
        </div>
        <button className={styles.button_sort_and_filter}>Sort by  
          <ChevronDown width={16} height={16} weight={3}/>
        </button>
      </div>
      { openFilters && 
        <Suspense fallback={<div></div>}>
          <FilterForm type={filterType} handleClose={handleCloseFilters} />
        </Suspense>
      }
    </>
  )
}

export const AddColorFilter = () => {
  const [openFilters, setOpenFilters] = useState(false)
  const [filterType, setFilterType] = useState('')


  const handleOpenFilters = (type) => {
    setOpenFilters(true);
    setFilterType(type)
  }

  const handleCloseFilters = () => {
    setOpenFilters(false);
    setFilterType('')
  }

  return (
    <>
      <div className={styles.filter_sort_buttons_container}>
        <div className={styles.filter_sort_buttons_container}>
          <button className={styles.button_sort_and_filter} onClick={() => handleOpenFilters('color')}>color</button>
        </div>
        <button className={styles.button_sort_and_filter}>Sort by  
          <ChevronDown width={16} height={16} weight={3}/>
        </button>
      </div>
      { openFilters && 
        <Suspense fallback={<div>Loading...</div>}>
          <FilterForm type={filterType} handleClose={handleCloseFilters} />
        </Suspense>
      }
    </>
  )
}