'use client'
import {useState} from 'react'
import Modal from 'react-modal'
import styles from './components.module.css'
import ChangeOrderDateForm from '@/components/forms/ChangeOrderDateForm'
import ChangeOrderShippingForm from '@/components/forms/ChangeOrderShippingForm'


const MyModalUpdateOrder = ({data, id, resourceType}) => {
    const [modalIsOpen, setIsOpen] = useState(false)    

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <div>
            <button className={styles.deleteOutside} onClick={openModal}>Edit</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Confirm update order information"
                ariaHideApp={false}
                overlayClassName={styles.overlay}
                className={styles.content} 
                shouldCloseOnOverlayClick={false}                                         
            >
                {
                    resourceType === 'date' && 
                    <ChangeOrderDateForm id={id} handleClose={()=> closeModal()}/>
                }
                {
                    resourceType === 'address' && 
                    <ChangeOrderShippingForm  data={data} handleClose={()=> closeModal()}/>
                }
            </Modal>
        </div>
    )
}

export default MyModalUpdateOrder