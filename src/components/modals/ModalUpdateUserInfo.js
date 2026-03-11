'use client'
import {useState} from 'react'
import dynamic from 'next/dynamic'
import { updateUserInfo } from '@/store/user/thunks';
import { useDispatch } from 'react-redux';
import { UPDATE_FORM } from '@/components/forms/const';
import styles from './components.module.css'

const Modal = dynamic(() => import('react-modal'), {ssr:false})
const UpdateUserInfoForm = dynamic(() => import('@/components/forms/UpdateUserInfoForm'))

const ModalUpdateUserInfo = ({resourceId, resourceType, resource}) => {
    const [modalIsOpen, setIsOpen] = useState(false)  
    const dispatch = useDispatch() 

    const openModal = () => {
        !modalIsOpen && setIsOpen(true);
    }
    const closeModal = () => {
        modalIsOpen && setIsOpen(false);
    }

    const asyncOperation = async (data) => {
        return await dispatch(updateUserInfo({
                data,
                resourceType,
                resourceId
            })).unwrap();
    }

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
                <UpdateUserInfoForm
                    formType={UPDATE_FORM}
                    resourceType={resourceType}
                    handleClose={closeModal}
                    action={asyncOperation}
                    resource={resource}
                />
            </Modal>
        </div>
    )
}

export default ModalUpdateUserInfo