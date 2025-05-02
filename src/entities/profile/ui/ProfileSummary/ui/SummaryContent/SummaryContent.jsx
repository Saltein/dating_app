import s from './SummaryContent.module.scss'
import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { SummaryBlock } from '../SummaryBlock/SummaryBlock'
import { PhotoItem } from './PhotoItem/PhotoItem'
import { setDescription } from '../../model/summarySlice'

export const SummaryContent = ({ data, isEditing = false }) => {
    // Consts ----------------------------------------------------
    const descriptionRef = useRef()
    const dispatch = useDispatch()

    // Functions -------------------------------------------------
    const hasContent = (value) => {
        if (isEditing) return true
        if (Array.isArray(value)) return value.length > 0
        if (typeof value === 'object' && value !== null) return Object.values(value).some(
            val => Array.isArray(val) ? val.length > 0 : !!val
        )
        return !!value
    }

    const adjustHeight = () => {
        const textarea = descriptionRef.current;

        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight - 24}px`;
    };

    // Handlers --------------------------------------------------
    const handleAdd = () => {
        console.log('handleAdd')
    }

    const handleChange = (e) => {
        dispatch(setDescription(e.target.value))
        isEditing && adjustHeight()
    }

    // Effects ---------------------------------------------------
    useEffect(() => {
        isEditing && adjustHeight()
    }, [])

    return (
        <div className={s.wrapper}>
            {isEditing ? (
                <textarea
                    className={s.description}
                    ref={descriptionRef}
                    value={data.description || ''}
                    spellCheck="false"
                    onChange={handleChange}
                    onInput={adjustHeight}
                />
            ) : (
                <div className={s.description}>
                    {data.description || (
                        <span className={s.placeholder}>Расскажите о себе...</span>
                    )}
                </div>
            )}

            {isEditing && hasContent(data.photo) &&
                <div className={s.photoList}>
                    {data.photo.map((photo, index) => {
                        return (
                            <PhotoItem photo={photo} key={index} handleAdd={handleAdd} />
                        )
                    })}
                    <PhotoItem />
                </div>
            }
            {hasContent(data.quality) && <SummaryBlock title="Личные качества" params={data.quality} />}
            {hasContent(data.interest) && <SummaryBlock title="Увлечения" params={data.interest} isEditing={isEditing} />}
            {hasContent(data.music) && <SummaryBlock title="Музыка" params={data.music} isEditing={isEditing} />}
            {hasContent(data.films_books) && <SummaryBlock title="Фильмы и книги" params={data.films_books} isBubble={false} isEditing={isEditing} />}
            {hasContent(data.games) && <SummaryBlock title="Видеоигры" params={data.games} isEditing={isEditing} />}
        </div>
    )
}