'use client'
import {useState} from 'react'
import dynamic from 'next/dynamic'
import styles from './components.module.css'
import { addUserInfo } from '@/store/user/thunks';
import { ADD_FORM } from '@/const'

const Modal = dynamic(() => import('react-modal'), {ssr:false})
const Form = dynamic(() => import('@/components/forms/Form'))


const MyModalAdd = ({resourceType}) => {
    const [modalIsOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <div>
            <button className='btn_primary_standard btn_sizeS' onClick={openModal}>Add</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Confirm update resource information"
                ariaHideApp={false}
                overlayClassName={styles.overlay}
                className={styles.content} 
                shouldCloseOnOverlayClick={false}                                         
            >
                <Form
                    formType={ADD_FORM}
                    resourceType={resourceType}
                    handleClose={closeModal}
                    action={addUserInfo}
                />                   
            </Modal>
        </div>
    )
}

export default MyModalAdd