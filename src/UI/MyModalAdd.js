'use client'
import {useState} from 'react'
import Modal from 'react-modal'
import styles from './components.module.css'
import AddAddressForm from '@/components/forms/AddAddressForm'
import AddPhoneForm from '@/components/forms/AddPhoneForm'

const MyModalAdd = ({resourceType}) => {
    const [modalIsOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <div>
            <button className={styles.deleteOutside} onClick={openModal}>Add</button>
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