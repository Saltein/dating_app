import { createPortal } from 'react-dom'
import s from './QualityParam.module.scss'
import { useEffect, useRef, useState } from 'react'

export const QualityParam = ({ defaultParam = '', options }) => {
    const [currentParam, setCurrentParam] = useState({ id: 0, value: defaultParam })
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isHeightMenuOpen, setIsHeightMenuOpen] = useState(false)
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0, width: 0 })
    const wrapperRef = useRef(null)

    const openMenu = () => {
        const rect = wrapperRef.current.getBoundingClientRect()
        setMenuPosition({
            top: rect.bottom + window.scrollY,
            left: rect.left + window.scrollX,
            width: rect.width,
        })
        options ? setIsMenuOpen(true) : setIsHeightMenuOpen(true)
    }

    const closeMenu = () => setIsMenuOpen(false)

    const onChoose = (option) => {
        setCurrentParam({ id: option.id, value: option.title })
        closeMenu()
    }

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                closeMenu()
            }
        }
        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    }, [])

    return (
        <>
            <div
                ref={wrapperRef}
                className={`${s.wrapper} ${currentParam.id === 0 ? s.required : ''}`}
                onClick={openMenu}
            >
                <span className={s.currentParam}>{currentParam.value}</span>
            </div>

            {isMenuOpen &&
                createPortal(
                    <div
                        className={s.menu}
                        style={{
                            position: 'absolute',
                            top: `${menuPosition.top}px`,
                            left: `${menuPosition.left}px`,
                            width: `${menuPosition.width}px`,
                            zIndex: 1500,
                        }}
                    >
                        {options.map((option) => (
                            <div
                                key={option.id}
                                className={s.option}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    onChoose(option)
                                }}
                            >
                                {option.title}
                            </div>
                        ))}
                    </div>,
                    document.body
                )}
        </>
    )
}

