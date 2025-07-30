'use client'
import {useState} from 'react'
import dynamic from 'next/dynamic'
import ButtonDelete from './ButtonDelete'
import styles from './components.module.css'

const Modal = dynamic(() => import('react-modal'), {ssr:false})

const MyModalDelete = ({type, resourceId, resourceType}) => {
    const [modalIsOpen, setIsOpen] = useState(false) 

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <div>
            <button className='btn_primary_standard btn_sizeS btn-destructive' onClick={openModal}>Delete</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Confirm delete resource"
                ariaHideApp={false}
                overlayClassName={styles.overlay}
                className={styles.content}                                          
            >
                <h2>Are you sure you want to delete this information?</h2>
                <div className='flex-row-gap'>
                    <ButtonDelete type={type} resourceId={resourceId} resourceType={resourceType} handleClose={()=> closeModal()}/>
                    <button className='btn_primary_standard btn_sizeS' onClick={closeModal}>Cancel</button>
                </div>
            </Modal>            
        </div>
    )
}

export default MyModalDelete