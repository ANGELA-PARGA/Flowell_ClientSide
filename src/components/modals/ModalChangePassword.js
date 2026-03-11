'use client'
import { useState } from 'react'
import { updatePassword } from '@/actions/userRequests';
import dynamic from 'next/dynamic'
import { UPDATE_FORM } from '@/components/forms/const'
import styles from './components.module.css'

const Modal = dynamic(() => import('react-modal'), {ssr:false})
const UpdateUserInfoForm = dynamic(() => import('@/components/forms/UpdateUserInfoForm'))

const ModalChangePassword = ({resourceType}) => {
    const [modalIsOpen, setIsOpen] = useState(false);    

    const openModal = () => {
        !modalIsOpen && setIsOpen(true);
    }
    const closeModal = () => {
        modalIsOpen && setIsOpen(false);
    }

    const asyncOperation = async (data) => {
        return await updatePassword(data.password);
    }

    return (                   
        <div>
            <button className={`${styles.change_password_button} btn_primary_standard btn_sizeS`} onClick={openModal}>Change password</button>
            <Modal
                isOpen={modalIsOpen}            
                onRequestClose={closeModal}
                contentLabel="Update Password"
                ariaHideApp={false}
                overlayClassName={styles.overlay}
                className={styles.content}
                shouldCloseOnOverlayClick={true}
            >
                <h2 className={styles.recover_modalText}>Write and confirm your new password...remember to make it secure</h2>
                <UpdateUserInfoForm  
                    formType={UPDATE_FORM} 
                    resourceType={resourceType} 
                    handleClose={closeModal} 
                    action={asyncOperation} 
                />
            </Modal>
        </div>
    )
}

export default ModalChangePassword;