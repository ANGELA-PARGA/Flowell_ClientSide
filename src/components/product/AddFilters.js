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
          <button className='btn-sort-filter' onClick={() => handleOpenFilters('color')}>color</button>
          <button className='btn-sort-filter' onClick={() => handleOpenFilters('category')}>category</button>
        </div>
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
          <button className='btn-sort-filter' onClick={() => handleOpenFilters('color')}>color</button>
        </div>
      </div>
      { openFilters && 
        <Suspense fallback={<div>Loading...</div>}>
          <FilterForm type={filterType} handleClose={handleCloseFilters} />
        </Suspense>
      }
    </>
  )
}