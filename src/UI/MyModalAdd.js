'use client'
import {useState} from 'react'
import dynamic from 'next/dynamic'
import styles from './components.module.css'

const Modal = dynamic(() => import('react-modal'), {ssr:false})
const AddAddressForm = dynamic(() => import('@/components/forms/AddAddressForm'))
const AddPhoneForm = dynamic(() => import('@/components/forms/AddPhoneForm'))


const MyModalAdd = ({resourceType}) => {
    const [modalIsOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <div>
            <button className={styles.modalEditButton} onClick={openModal}>Add</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Confirm update resource information"
                ariaHideApp={false}
                overlayClassName={styles.overlay}
                className={styles.content} 
                shouldCloseOnOverlayClick={false}                                         
            >
                {
                    resourceType === 'address_inf' && <AddAddressForm resourceType={resourceType} handleClose={()=> closeModal()}/>
                }
                {
                    resourceType === 'contact_inf' && <AddPhoneForm resourceType={resourceType} handleClose={()=> closeModal()}/>
                }                    
            </Modal>
        </div>
    )
}

export default MyModalAdd