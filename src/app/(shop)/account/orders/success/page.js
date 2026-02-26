'use client' 

import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { cartApi } from '@/store/cart/cartApi';
import { useSearchParams } from 'next/navigation';
import SuccessfullUI from '@/components/orders/SuccessfullUI';


export default function Success() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const session_id = searchParams.get('session_id');

  useEffect(()=>{
    if (session_id) {
      dispatch(cartApi.util.invalidateTags(['Cart']));
    }
  }, [session_id, dispatch])

  if(!session_id){
    return null
  }

  return (
    <SuccessfullUI/>    
  )
}