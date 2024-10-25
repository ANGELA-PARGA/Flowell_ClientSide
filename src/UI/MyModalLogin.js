'use client'
import {useState} from 'react'
import Modal from 'react-modal'
import ButtonLogOutModal from './ButtonLogOutModal'
import styles from './components.module.css'

const MyModalLogin = () => {
    const [modalIsOpen, setIsOpen] = useState(true);        

    const closeModal = () => {
        setIsOpen(false);
    }; 

    return (
            <Modal
                isOpen={modalIsOpen}            
                onRequestClose={closeModal}
                contentLabel="Session Expired"
                ariaHideApp={false}
                overlayClassName={styles.overlay}
                className={styles.content}
                shouldCloseOnOverlayClick={false}
            >
                <h2 className={styles.modalText}>Your session expired. Please login again</h2>
                <ButtonLogOutModal handleClose={()=> closeModal()}  />            
            </Modal>
    )
}

export default MyModalLogin;

