'use client'
import {useState} from 'react'
import ButtonCancelOrder from './ButtonCancelOrder'
import dynamic from 'next/dynamic'
import styles from './components.module.css'

const Modal = dynamic(() => import('react-modal'), {ssr:false})

const MyModalCancelOrder = ({id}) => {
    const [modalIsOpen, setIsOpen] = useState(false) 
    

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <div>
            <button className={styles.modalDeleteButton} onClick={openModal}>Cancel Order</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Confirm delete resource"
                ariaHideApp={false}
                overlayClassName={styles.overlay}
                className={styles.content}                                          
            >
                <h2 className={styles.modalText}>Are you sure you want to cancel this order? This cannot be undone</h2>
                <div className={styles.modalButtons}>
                    <ButtonCancelOrder id={id} handleClose={()=> closeModal()}/>
                    <button className={styles.cancelModalButton} onClick={closeModal}>Keep order</button>
                </div>                
            </Modal>
        </div>
    )
}

export default MyModalCancelOrder