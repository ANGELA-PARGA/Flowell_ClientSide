'use client'
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { cancelOrderThunk } from '@/store/orders/thunks';
import ButtonCancelOrder from '../../UI/ButtonCancelOrder'
import dynamic from 'next/dynamic'
import styles from './components.module.css'

const Modal = dynamic(() => import('react-modal'), {ssr:false})

const ModalCancelOrder = ({id, resourceType}) => {
    const [modalIsOpen, setIsOpen] = useState(false) 
    const dispatch = useDispatch() 
    
    const openModal = () => {
        !modalIsOpen && setIsOpen(true);
    }
    const closeModal = () => {
        modalIsOpen && setIsOpen(false);
    }

    const asyncOperation = async () => {
        return await dispatch(cancelOrderThunk({
                orderId: id
            })).unwrap();
    }

    return (
        <div>
            <button className='btn_primary_standard btn_sizeM btn-destructive' onClick={openModal}>Cancel Order</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Confirm delete resource"
                ariaHideApp={false}
                overlayClassName={styles.overlay}
                className={styles.content}                                          
            >
                <h2 className={styles.modalText}>Are you sure you want to cancel this order? This cannot be undone</h2>
                <div className='flex-row-gap'>
                    <ButtonCancelOrder 
                        action={asyncOperation}
                        resourceType={resourceType}
                        handleClose={closeModal}
                    />
                    <button className='btn_primary_standard btn_sizeS' onClick={closeModal}>Keep order</button>
                </div>                
            </Modal>
        </div>
    )
}

export default ModalCancelOrder;