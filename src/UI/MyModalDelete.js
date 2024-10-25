'use client'
import {useState} from 'react'
import Modal from 'react-modal'
import ButtonDelete from './ButtonDelete'
import styles from './components.module.css'

const MyModalDelete = ({type, resourceId, resourceType}) => {
    const [modalIsOpen, setIsOpen] = useState(false) 

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <div>
            <button className={styles.deleteOutside} onClick={openModal}>Delete</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Confirm delete resource"
                ariaHideApp={false}
                overlayClassName={styles.overlay}
                className={styles.content}                                          
            >
                <h2 className={styles.modalText}>Are you sure you want to delete this information?</h2>
                <div className={styles.modalButtons}>
                    <ButtonDelete type={type} resourceId={resourceId} resourceType={resourceType} handleClose={()=> closeModal()}/>
                    <button className={styles.cancelModalButton} onClick={closeModal}>Cancel</button>
                </div>
            </Modal>
        </div>
    )
}

export default MyModalDelete