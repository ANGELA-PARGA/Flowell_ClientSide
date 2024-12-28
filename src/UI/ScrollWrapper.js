'use client'

import { useEffect } from "react"
import ProductInfo from "@/components/product/ProductInfo"

const ScrollWrapper = ({data, id}) => {
    useEffect(() => { 
        window.scrollTo(0, 0); 
    }, [id]);

    return (
        <ProductInfo data={data} id={id}/>
    )
}

export default ScrollWrapper