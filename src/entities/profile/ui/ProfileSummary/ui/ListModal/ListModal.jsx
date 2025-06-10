import { useDispatch } from 'react-redux'
import { Bubble, DefaultButton, DefaultDividerH } from '../../../../../../shared'
import s from './ListModal.module.scss'
import {
    setAlcoholAttitude,
    setChildrenAttitude,
    setGames, setHeight,
    setInterests,
    setMaritalStatus, setMusic,
    setPhysicalActivity, setSmokingAttitude
} from '../../model/summarySlice'
import { useState } from 'react'

export const ListModal = ({ optionList, currentOptions, onClose, paramKey, onDelete, title, maxElements }) => {
    // States (local) ---------------------------------------------------------------------
    const [search, setSearch] = useState('')

    // Consts -----------------------------------------------------------------------------
    const dispatch = useDispatch()
    const currentIds = new Set(currentOptions.map(option => option.id))
    const optionsLeft = optionList.filter(option => !currentIds.has(option.id))
    const filteredOptions = optionsLeft.filter(option =>
        option.title.toLowerCase().includes(search.toLowerCase())
    )

    const setters = {
        'interests': setInterests,
        'games': setGames,
        'marital_status': setMaritalStatus,
        'smoking_attitude': setSmokingAttitude,
        'alcohol_attitude': setAlcoholAttitude,
        'physical_activity': setPhysicalActivity,
        'children_attitude': setChildrenAttitude,
        'height': setHeight,
        'music': setMusic,
    }

    // Handlers ---------------------------------------------------------------------------
    const handleAdd = (e) => {
        if (currentOptions.length >= maxElements) return
        const newOptions = [...currentOptions, e]
        dispatch(setters[paramKey](newOptions))
    }

    return (
        <div className={s.window} onMouseDown={(e) => e.stopPropagation()}>
            <div className={s.heder}>
                {title}
            </div>
            <div className={s.current}>
                {currentOptions.length < 1 && <span className={s.placeholder}>Выбери из списка подходящие для тебя варианты</span>}
                {currentOptions.map((option, index) => {
                    return (
                        <Bubble obj={option} title={option.title} key={index} isCurrent isEditing onClick={() => onDelete(option.id)} />
                    )
                })}
            </div>
            <DefaultDividerH />
            <input
                type="text"
                placeholder="Поиск..."
                className={s.searchInput}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div className={s.list}>
                {filteredOptions.map((option, index) => (
                    <Bubble obj={option} title={option.title} key={index} isAddable onClick={handleAdd} disabled={currentOptions.length >= maxElements} />
                ))}
            </div>
            <DefaultButton title={'Применить'} onClick={onClose} />
        </div>
    )
}