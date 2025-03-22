'use client'
import {useState} from 'react'
import dynamic from 'next/dynamic'
import styles from './components.module.css'

const Modal = dynamic(() => import('react-modal'), {ssr:false})
const ChangeOrderDateForm = dynamic(() => import('@/components/forms/ChangeOrderDateForm'))
const ChangeOrderShippingForm = dynamic(() => import('@/components/forms/ChangeOrderShippingForm'))

const MyModalUpdateOrder = ({data, id, resourceType}) => {
    const [modalIsOpen, setIsOpen] = useState(false)    

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <div>
            <button className={styles.modalEditButton} onClick={openModal}>Edit</button>
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
                    resourceType === 'date' && 
                    <ChangeOrderDateForm id={id} handleClose={()=> closeModal()}/>
                }
                {
                    resourceType === 'address' && 
                    <ChangeOrderShippingForm  data={data} handleClose={()=> closeModal()}/>
                }
            </Modal>
        </div>
    )
}

export default MyModalUpdateOrder