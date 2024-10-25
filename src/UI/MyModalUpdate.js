'use client'
import {useState} from 'react'
import Modal from 'react-modal'
import styles from './components.module.css'
import UpdateAddressInfo from '@/components/forms/UpdateAddressInfo'
import UpdatePhoneInfo from '@/components/forms/UpdatePhoneInfo'
import UpdateProfileInfo from '@/components/forms/UpdateProfileInfo'


const MyModalEdit = ({resourceId, resourceType, resource}) => {
    const [modalIsOpen, setIsOpen] = useState(false)   

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <div>
            <button className={styles.deleteOutside} onClick={openModal}>Edit</button>
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
                    resourceType === 'address_inf' && 
                    <UpdateAddressInfo resourceId={resourceId} resourceType={resourceType} address={resource} handleClose={()=> closeModal()}/>
                }
                {
                    resourceType === 'contact_inf' && 
                    <UpdatePhoneInfo resourceId={resourceId} resourceType={resourceType} phone={resource} handleClose={()=> closeModal()}/>
                }
                {
                    resourceType === 'personal_inf' &&
                    <UpdateProfileInfo resourceId={resourceId} resourceType={resourceType} name={resource} handleClose={()=> closeModal()}/>
                }
            </Modal>
        </div>
    )
}

export default MyModalEdit