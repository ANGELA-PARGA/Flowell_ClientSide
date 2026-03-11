'use client'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import { useDispatch } from 'react-redux';
import { addUserInfo } from '@/store/user/thunks';
import { ADD_FORM } from '@/components/forms/const'
import styles from './components.module.css'

const Modal = dynamic(() => import('react-modal'), {ssr:false})
const UpdateUserInfoForm = dynamic(() => import('@/components/forms/UpdateUserInfoForm'))


const ModalAdd = ({resourceType}) => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch() 

    const openModal = () => {
        !modalIsOpen && setIsOpen(true);
    }
    const closeModal = () => {
        modalIsOpen && setIsOpen(false);
    }

    const asyncOperation = async (data) => {
        return await dispatch(addUserInfo({
                data,
                resourceType,
            })).unwrap();
    }

    return (
        <div>
            <button className='btn_primary_standard btn_sizeS' onClick={openModal}>Add</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Confirm add resource information"
                ariaHideApp={false}
                overlayClassName={styles.overlay}
                className={styles.content} 
                shouldCloseOnOverlayClick={false}                                         
            >
                <UpdateUserInfoForm
                    formType={ADD_FORM}
                    resourceType={resourceType}
                    handleClose={closeModal}
                    action={asyncOperation}
                />                   
            </Modal>
        </div>
    )
}

export default ModalAdd