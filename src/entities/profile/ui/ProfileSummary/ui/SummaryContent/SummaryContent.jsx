import s from './SummaryContent.module.scss'
import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { SummaryBlock } from '../SummaryBlock/SummaryBlock'
import { PhotoItem } from './PhotoItem/PhotoItem'
import { setDescription } from '../../model/summarySlice'
import { QualityBlock } from '../SummaryBlock/QualityBlock/QualityBlock'

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
        textarea.style.height = `${textarea.scrollHeight - 16}px`;
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
                <>
                    <textarea
                        maxLength={512}
                        className={s.description}
                        ref={descriptionRef}
                        value={data.description || ''}
                        spellCheck="false"
                        onChange={handleChange}
                        onInput={adjustHeight}
                    />
                </>
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
            {hasContent(data.quality) && <QualityBlock title="Личные качества" params={data} />}
            {hasContent(data.interest) && <SummaryBlock title="Увлечения" params={data.interest} isEditing={isEditing} paramKey={'interests'} />}
            {hasContent(data.music) && <SummaryBlock title="Музыка" params={data.music} isEditing={isEditing} paramKey={'music'} />}
            {hasContent(data.films_books) && <SummaryBlock title="Фильмы и книги" params={data.films_books} isBubble={false} isEditing={isEditing} />}
            {hasContent(data.games) && <SummaryBlock title="Видеоигры" params={data.games} isEditing={isEditing} paramKey={'games'} />}
        </div>
    )
}