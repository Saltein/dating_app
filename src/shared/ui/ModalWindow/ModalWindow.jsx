import styles from './ModalWindow.module.scss'
import { createPortal } from 'react-dom'

export const ModalWindow = ({ children, onClose }) => {
    const handleClick = (e) => {
        if (e.target === e.currentTarget) {
            e.stopPropagation()
            onClose()
        }
    }

    return createPortal(
        <div className={styles.background} onClick={handleClick}>
            {children}
        </div>,
        document.body
    )
}