'use client'
import {useState} from 'react'
import Modal from 'react-modal'
import UpdatePassword from '@/components/forms/UpdatePasswordForm'
import styles from './components.module.css'

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
            <button onClick={openModal}>Change password</button>
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