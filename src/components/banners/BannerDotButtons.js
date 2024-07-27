import styles from './components.module.css'
import React, { useCallback, useEffect, useState } from 'react'

export const useDotButton = (emblaApi) => {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [scrollSnaps, setScrollSnaps] = useState([])

    const onDotButtonClick = useCallback(
        (index) => {
        if (!emblaApi) return
        emblaApi.scrollTo(index)
        },
        [emblaApi]
    )

    const onInit = useCallback((emblaApi) => {
        setScrollSnaps(emblaApi.scrollSnapList())
    }, [])

    const onSelect = useCallback((emblaApi) => {
        setSelectedIndex(emblaApi.selectedScrollSnap())
    }, [])

    useEffect(() => {
        if (!emblaApi) return

        onInit(emblaApi)
        onSelect(emblaApi)
        emblaApi.on('reInit', onInit).on('reInit', onSelect).on('select', onSelect)
    }, [emblaApi, onInit, onSelect])

    return {
        selectedIndex,
        scrollSnaps,
        onDotButtonClick
    }
}

export const DotButton = (props) => {
    const { children, index, selectedIndex, onClick } = props

    return (
        <button type="button" 
        className={`${styles.emblaDot} ${index === selectedIndex ? styles.emblaDotSelected : ''}`}
        onClick={onClick}
        >
        {children}
        </button>
    )
}
