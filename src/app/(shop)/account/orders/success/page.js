'use client' 

import { StoreContext } from '@/context'
import { useContext, useEffect } from 'react'
import { useSearchParams } from 'next/navigation';
import SuccessfullUI from '@/components/orders/SuccessfullUI';


export default function Success() {
  const { populateCartData } = useContext(StoreContext);
  const searchParams = useSearchParams();
  const session_id = searchParams.get('session_id');

  useEffect(()=>{
    const fetchUpdatedCartData = async () => {
      if (session_id) {
        await populateCartData();
      }
    };
    fetchUpdatedCartData();
  }, [session_id, populateCartData])

  if(!session_id){
    return null
  }

  return (
    <SuccessfullUI/>    
  )
}