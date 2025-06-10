import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import s from './SummaryContent.module.scss';
import { SummaryBlock } from '../SummaryBlock/SummaryBlock';
import { PhotoItem } from './PhotoItem/PhotoItem';
import { setDescription, setPhotos } from '../../model/summarySlice';
import { QualityBlock } from '../SummaryBlock/QualityBlock/QualityBlock';
import { profileApi } from '../../../../../../shared/api/profileApi';

export const SummaryContent = ({ data, isEditing = false, isDating = false }) => {
    const dispatch = useDispatch();
    const descriptionRef = useRef();
    const fileInputRef = useRef();
    const [allPhotos, setAllPhotos] = useState(data.photo || []);
    useEffect(() => {
        if (isEditing) adjustHeight();
    }, [isEditing])

    useEffect(() => {
        setAllPhotos(data.photo)
    }, [])

    const adjustHeight = () => {
        const ta = descriptionRef.current;
        if (!ta) return;
        ta.style.height = 'auto';
        ta.style.height = `${ta.scrollHeight - 16}px`;
    };

    const hasContent = (v) => {
        if (isEditing) return true;
        return Array.isArray(v) ? v.length > 0 : !!v;
    };

    const handleChange = (e) => {
        dispatch(setDescription(e.target.value))
        isEditing && adjustHeight()
    }

    const handleAddPhoto = () => fileInputRef.current?.click()

    const handleDeletePhoto = (photoUrl) => {
        const updatedPhotos = allPhotos.filter(p => p !== photoUrl)
        setAllPhotos(updatedPhotos)
        profileApi.updateProfile({ photos: updatedPhotos }).catch(console.error)
    }

    const onFileChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        try {
            const url = await profileApi.uploadPhoto(file);
            const newPhotos = [...allPhotos, url];
            setAllPhotos(newPhotos)
            await profileApi.updateProfile({ photos: newPhotos });
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        dispatch(setPhotos(allPhotos))
    }, [allPhotos])

    return (
        <div className={s.wrapper}>
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={onFileChange}
            />

            {isEditing ? (
                <textarea
                    ref={descriptionRef}
                    className={s.description}
                    maxLength={512}
                    value={data.description || ''}
                    spellCheck="false"
                    onChange={handleChange}
                    onInput={adjustHeight}
                />
            ) : (
                <div className={s.description}>
                    {data.description || <span className={s.placeholder}>Расскажите о себе...</span>}
                </div>
            )}

            {isEditing && (
                <div className={s.photoList}>
                    {allPhotos.map((p, i) => <PhotoItem key={i} photo={p} handleDelete={handleDeletePhoto} />)}
                    <PhotoItem photo={null} handleAdd={handleAddPhoto} photoCount={allPhotos.length} />
                </div>
            )}

            {(hasContent(data.alcohol_attitude) ||
                hasContent(data.children_attitude) ||
                hasContent(data.height) ||
                hasContent(data.marital_status) ||
                hasContent(data.physical_activity) || hasContent(data.smoking_attitude)) && <QualityBlock title="Личные качества" params={data} isEditing={isEditing} isDating={isDating} />}
            {hasContent(data.interest) && <SummaryBlock title="Увлечения" params={data.interest} isEditing={isEditing} paramKey={'interests'} />}
            {hasContent(data.music) && <SummaryBlock title="Музыка" params={data.music} isEditing={isEditing} paramKey={'music'} />}
            {hasContent(data.films_books) && <SummaryBlock title="Фильмы и книги" params={data.films_books} isBubble={false} isEditing={isEditing} />}
            {hasContent(data.games) && <SummaryBlock title="Видеоигры" params={data.games} isEditing={isEditing} paramKey={'games'} />}
        </div>
    )
}