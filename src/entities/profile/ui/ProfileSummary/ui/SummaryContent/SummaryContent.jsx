import { useState, useEffect, useRef } from 'react'
import { SummaryBlock } from '../SummaryBlock/SummaryBlock'
import { PhotoItem } from './PhotoItem/PhotoItem'
import s from './SummaryContent.module.scss'

export const SummaryContent = ({ data, isEditing = false }) => {
    const [description, setDescription] = useState(data.description)
    const descriptionRef = useRef()

    const hasContent = (value) => {
        if (isEditing) return true
        if (Array.isArray(value)) return value.length > 0
        if (typeof value === 'object' && value !== null) return Object.values(value).some(
            val => Array.isArray(val) ? val.length > 0 : !!val
        )
        return !!value
    }

    const handleAdd = () => {
        console.log('handleAdd')
    }

    const handleChange = (e) => {
        setDescription(e.target.value)
    }

    const adjustHeight = () => {
        const textarea = descriptionRef.current;

        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight + 8}px`;
    };

    useEffect(() => {
        isEditing && adjustHeight();
    }, [description])

    const Input = isEditing ? "textarea" : "div"

    return (
        <div className={s.wrapper}>
            <Input className={s.description} ref={descriptionRef} contentEditable={isEditing} spellCheck="false" onChange={handleChange}>
                {data.description
                    ? data.description
                    : <span className={s.placeholder}>Расскажите о себе...</span>}
            </Input>

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