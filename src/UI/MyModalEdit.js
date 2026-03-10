'use client'
import {useState} from 'react'
import dynamic from 'next/dynamic'
import styles from './components.module.css'
import { UPDATE_FORM } from '@/const'
import { updateUserInfo } from '@/store/user/thunks';

const Modal = dynamic(() => import('react-modal'), {ssr:false})
const Form = dynamic(() => import('@/components/forms/Form'))

const MyModalEdit = ({resourceId, resourceType, resource}) => {
    const [modalIsOpen, setIsOpen] = useState(false)   

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <div>
            <button className='btn_primary_standard btn_sizeS' onClick={openModal}>Edit</button>
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
                    formType={UPDATE_FORM}
                    resourceType={resourceType}
                    handleClose={closeModal}
                    action={updateUserInfo}
                    resourceId={resourceId}
                    resource={resource}
                />
            </Modal>
        </div>
    )
}

export default MyModalEdit