import s from './QualityParam.module.scss'
import { createPortal } from 'react-dom'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAlcoholAttitude, setChildrenAttitude, setHeight, setMaritalStatus, setPhysicalActivity, setSmokingAttitude } from '../../../../model/summarySlice'
import { getAlcoholAttitude, getChildrenAttitude, getHeight, getMaritalStatus, getPhysicalActivity, getSmokingAttitude } from '../../../../model/summarySelectors'
import { DefaultButton, WarningMessage } from '../../../../../../../../shared'

export const QualityParam = ({ defaultParam = '', options = [], name = '' }) => {
    const [currentParam, setCurrentParam] = useState({ id: 0, value: defaultParam })
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0, width: 0 })
    const [warning, setWarning] = useState('')

    const currentParams = {
        M: useSelector(getMaritalStatus),
        H: useSelector(getHeight),
        S: useSelector(getSmokingAttitude),
        A: useSelector(getAlcoholAttitude),
        P: useSelector(getPhysicalActivity),
        C: useSelector(getChildrenAttitude),
    }

    const getValueFromStore = () => {
        const storeId = currentParams[name] || 0
        const storeTitle = options.find(opt => opt.id === storeId)?.title || defaultParam
        return { id: storeId, value: storeTitle }
    }

    const filterAndClampHeight = (value) => {
        let digits = value.replace(/\D/g, '')
        digits = digits.replace(/^0+/, '')
        if (digits === '') return ''

        let num = parseInt(digits, 10)

        if (num < 100 || num > 250) { setWarning('Веди свой реальный рост') } else setWarning('')

        return num.toString();
    }

    useEffect(() => {
        setCurrentParam(getValueFromStore())
    }, [currentParams[name]])

    const wrapperRef = useRef(null)
    const dispatch = useDispatch()

    const openMenu = () => {
        const rect = wrapperRef.current.getBoundingClientRect()
        setMenuPosition({
            top: rect.bottom + window.scrollY,
            left: rect.left + window.scrollX,
            width: rect.width,
        })
        setIsMenuOpen(true)
    }

    const closeMenu = () => {
        setIsMenuOpen(false)
        if (!isMenuOpen) return
        setCurrentParam(getValueFromStore())
    }

    const onChoose = (option) => {
        const { id, title } = option

        switch (name) {
            case 'M': dispatch(setMaritalStatus(id)); break
            case 'S': dispatch(setSmokingAttitude(id)); break
            case 'A': dispatch(setAlcoholAttitude(id)); break
            case 'P': dispatch(setPhysicalActivity(id)); break
            case 'C': dispatch(setChildrenAttitude(id)); break
        }

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
                {options.length > 0
                    ? options.find(opt => opt.id === currentParams[name])?.title || defaultParam
                    : (currentParams.H != null
                        ? `${currentParams.H} см`
                        : defaultParam)}
            </div>

            {isMenuOpen &&
                createPortal(
                    <div
                        className={s.menu}
                        style={{
                            position: 'absolute',
                            top: `${menuPosition.top}px`,
                            left: `${menuPosition.left}px`,
                            width: `fit-content`,
                            zIndex: 1500,
                        }}
                        onClick={(e) => {
                            e.stopPropagation()
                        }}
                    >
                        {options.length > 0
                            ?
                            <>
                                {options.map((option) => (
                                    <div
                                        key={option.id}
                                        className={s.option}
                                        onClick={() => {
                                            onChoose(option)
                                        }}
                                    >
                                        {option.title}
                                    </div>
                                ))}
                                <div
                                    className={`${s.option} ${s.default}`}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        onChoose({ id: null, title: defaultParam })
                                    }}
                                >
                                    Сбросить
                                </div>
                            </>
                            :
                            <>
                                <input className={s.input}
                                    placeholder='Рост в см'
                                    onChange={(e) => dispatch(setHeight(filterAndClampHeight(e.target.value)))} />
                                <div
                                    className={`${s.option} ${s.default}`}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        dispatch(setHeight(null))
                                        setIsMenuOpen(false)
                                    }}
                                >
                                    Сбросить
                                </div>

                                {createPortal(<div style={{
                                    position: 'absolute',
                                    top: `${menuPosition.top + 72}px`,
                                    left: `${menuPosition.left - 54}px`,
                                    width: `fit-content`,
                                    zIndex: 1600,
                                }} className={s.warning}>
                                    <WarningMessage type='error' message={warning} />
                                </div>, document.body)}
                            </>
                        }
                    </div>,
                    document.body
                )}
        </>
    )
}

