'use client'
import {useState} from 'react'
import dynamic from 'next/dynamic'
import styles from './components.module.css'
import { ADDRESS_RESOURCE, DATE_RESOURCE } from '@/const'

const Modal = dynamic(() => import('react-modal'), {ssr:false})
const ChangeOrderDateForm = dynamic(() => import('@/components/forms/ChangeOrderDateForm'))
const ChangeOrderShippingForm = dynamic(() => import('@/components/forms/ChangeOrderShippingForm'))

const MyModalUpdateOrder = ({data, id, resourceType}) => {
    const [modalIsOpen, setIsOpen] = useState(false)    

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

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
                    resourceType === ADDRESS_RESOURCE && 
                    <ChangeOrderShippingForm  data={data.shipping_info} id={data.id} handleClose={closeModal}/>
                }
            </Modal>
        </div>
    )
}

export default MyModalUpdateOrder