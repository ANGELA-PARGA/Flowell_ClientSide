'use client'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import { useDispatch } from 'react-redux';
import { updateOrderShipping } from '@/store/orders/thunks';
import { DATE_RESOURCE, ORDER_SHIPPING_INFO_RESOURCE } from '@/components/forms/const'
import styles from './components.module.css'

const Modal = dynamic(() => import('react-modal'), {ssr:false})
const UpdateUserInfoForm = dynamic(() => import('@/components/forms/UpdateUserInfoForm'))
const ChangeOrderDateForm = dynamic(() => import('@/components/forms/ChangeOrderDateForm'))

const ModalUpdateOrder = ({data, id, resourceType}) => {
    const [modalIsOpen, setIsOpen] = useState(false)    
    const dispatch = useDispatch();

    const openModal = () => {
        !modalIsOpen && setIsOpen(true);
    }
    const closeModal = () => {
        modalIsOpen && setIsOpen(false);
    }

    const asyncOperation = async (formData) => {
        return await dispatch(updateOrderShipping({
                orderId: id,
                data: formData,
            })).unwrap();
    }

    return (
        <div>
            <button className='btn_primary_standard btn_sizeS' onClick={openModal}>Edit</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Confirm update order information"
                ariaHideApp={false}
                overlayClassName={styles.overlay}
                className={styles.content} 
                shouldCloseOnOverlayClick={false}                                         
            >
                {
                    resourceType === DATE_RESOURCE && 
                    <ChangeOrderDateForm id={id} handleClose={closeModal}/>
                }
                {
                    resourceType === ORDER_SHIPPING_INFO_RESOURCE && 
                    <UpdateUserInfoForm  
                        formType={UPDATE_FORM} 
                        resourceType={resourceType} 
                        handleClose={closeModal} 
                        action={asyncOperation} 
                        resource={data}
                    />
                }
            </Modal>
        </div>
    )
}

export default ModalUpdateOrder