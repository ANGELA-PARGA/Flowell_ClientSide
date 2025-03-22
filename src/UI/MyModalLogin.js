'use client'
import {useState} from 'react'
import dynamic from 'next/dynamic'
import styles from './components.module.css'
import ButtonLogOutModal from './ButtonLogOutModal'

const Modal = dynamic(() => import('react-modal'), {ssr:false})

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
                <p>Your session expired. Please login again</p>
                <ButtonLogOutModal handleClose={()=> closeModal()}  />            
            </Modal>
    )
}

export default MyModalLogin;

