import { motion, useAnimation } from 'framer-motion'
import { useState, useEffect } from 'react'
import s from './ProfileSummary.module.scss'
import { SummaryBlock } from './ui/SummaryBlock/SummaryBlock'
import { ReactComponent as UpIcon } from '../../../../shared/assets/icons/up.svg'
import { Bubble, DefaultButton, EditButton } from '../../../../shared'
import { ProfileParametersWindow } from '../../../../features/profile/ui/ProfileParametersWindow/ProfileParametersWindow'

export const ProfileSummary = ({ isProfilePage = false, isEditing = false, dataObj }) => {
    const data = dataObj || {};
    const controls = useAnimation();
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => {
            window.removeEventListener('resize', checkScreenSize);
        };
    }, []);

    const handleTap = () => {
        if (isMobile) {
            setIsOpen(prev => !prev);
            controls.start({
                y: isOpen ? 0 : "-90%",
                transition: { type: "spring", stiffness: 500, damping: 30 }
            });
        }
    };

    const handleEdit = () => {
        setIsEditMode(true)
    }

    const Container = isMobile ? motion.div : 'div';

    return (
        <Container
            className={`${s.wrapper} ${isOpen ? s.open : ''}`}
            {...(isMobile && {
                onTap: handleTap,
                drag: "y",
                dragConstraints: { top: -window.innerHeight * 0.75, bottom: 0 },
                dragElastic: 0,
                animate: controls
            })}
        >
            {isEditMode && <ProfileParametersWindow setState={setIsEditMode} data={data} />}
            {isProfilePage && <EditButton onClick={handleEdit} />}
            <UpIcon className={`${s.upIcon} ${isOpen ? s.open : ''}`} />
            <div className={s.header}>
                <div className={s.name_age}>
                    {data.name || 'Данных нет'}, {data.age || 'Данных нет'}
                </div>
            </div>

            <div className={`${s.scrollableContent} ${isOpen ? s.open : ''} ${!isMobile ? s.visible : ''}`}>
                <div className={s.description}>{data.description}</div>
                {/* <div className={s.quality}>
                    {data.quality
                        ? <SummaryBlock title="Личные качества" params={data.quality} />
                        : 'Данных нет'}
                </div> */}
                <div className={s.interest}>
                    {data.interest
                        ? <SummaryBlock title="Увлечения" params={data.interest} isEditing={isEditing} />
                        : 'Данных нет'}
                </div>
                <div className={s.music}>
                    {data.music
                        ? <SummaryBlock title="Музыка" params={data.music} isEditing={isEditing} />
                        : 'Данных нет'}
                </div>
                <div className={s.films_books}>
                    {data.films_books
                        ? <SummaryBlock title="Фильмы и книги" params={data.films_books} isBubble={false} isEditing={isEditing} />
                        : 'Данных нет'}
                </div>
                <div className={s.games}>
                    {data.games
                        ? <SummaryBlock title="Видеоигры" params={data.games} isEditing={isEditing} />
                        : 'Данных нет'}
                </div>
            </div>

            {isEditing && <DefaultButton title={'Сохранить'} />}
        </Container>
    )
}
