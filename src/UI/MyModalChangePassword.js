'use client'
import {useState} from 'react'
import styles from './components.module.css'
import dynamic from 'next/dynamic'

const Modal = dynamic(() => import('react-modal'), {ssr:false})
const UpdatePassword = dynamic(() => import('@/components/forms/UpdatePasswordForm'))

const MyModalChangePassword = () => {
    const [modalIsOpen, setIsOpen] = useState(false);    

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false); 

    const handleClose = () => {
        setTimeout(() => {
            setIsOpen(false);
        }, 2000);
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
                <UpdatePassword handleClose={handleClose} closeModal={closeModal}/>
            </Modal>
        </div>
    )
}

export default MyModalChangePassword;