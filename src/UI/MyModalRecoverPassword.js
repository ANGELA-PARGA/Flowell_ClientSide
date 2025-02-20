'use client'
import {useState} from 'react'
import Modal from 'react-modal'
import RecoverPasswordForm from '@/components/forms/RecoverPasswordForm'
import styles from './components.module.css'

const MyModalRecoverPassword = () => {
    const [modalIsOpen, setIsOpen] = useState(false); 
    const [message, setMessage] = useState('');     

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false); 

    const handleClose = () => {
        setTimeout(() => {
            setIsOpen(false);
            setMessage('')
        }, 5000);
    }

    return (                   
        <div>
            <button className={styles.recover_password_link} onClick={openModal}>Forgot credentials</button>
            <Modal
                isOpen={modalIsOpen}            
                onRequestClose={closeModal}
                contentLabel="Send Email for recovering password"
                ariaHideApp={false}
                overlayClassName={styles.overlay}
                className={styles.content}
                shouldCloseOnOverlayClick={true}
            >
                <h2 className={styles.recover_modalText}>Write the email you used to open your account</h2>
                <RecoverPasswordForm handleClose={handleClose} setMessage={setMessage} closeModal={closeModal}/>
                {message && <p className={styles.sent_email_confirmation}>{`${message} Please Check your email. This modal will close in 5 seconds.`}</p> }        
            </Modal>
        </div>
    )
}

export default MyModalRecoverPassword;

