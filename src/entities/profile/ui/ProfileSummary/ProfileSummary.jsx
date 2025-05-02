import s from './ProfileSummary.module.scss'
import { motion, useAnimation } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ReactComponent as UpIcon } from '../../../../shared/assets/icons/up.svg'
import { EditButton } from '../../../../shared'
import { ProfileParametersWindow } from '../../../../features/profile/ui/ProfileParametersWindow/ProfileParametersWindow'
import { SummaryContent } from './ui/SummaryContent/SummaryContent'
import { profileApi } from '../../../../shared/api/profileApi'
import {
    getAge, getDescription,
    getFilmsBooks, getGames,
    getInterest, getMusic,
    getName, getPhoto,
    getQuality
} from '../../../../entities/profile/ui/ProfileSummary/model/summarySelectors'

export const ProfileSummary = ({ isProfilePage = false, dataObj }) => {

    // Consts ----------------------------------------------------
    const data = dataObj || {};
    const controls = useAnimation();

    const updatedData = {
        name: useSelector(getName),
        age: useSelector(getAge),
        description: useSelector(getDescription),
        interest: useSelector(getInterest),
        music: useSelector(getMusic),
        films_books: useSelector(getFilmsBooks),
        games: useSelector(getGames),
        photo: useSelector(getPhoto),
        quality: useSelector(getQuality),
    };

    // States (local) --------------------------------------------
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    // Handlers --------------------------------------------------
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

    const handleSubmit = async () => {
        try {
            await profileApi.updateProfile(updatedData);
            setIsEditMode(false);
        } catch (error) {
            console.error('Ошибка при отправке обновлённых данных:', error);
        }
    }

    // Effects ---------------------------------------------------
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


    // Components ------------------------------------------------
    const Container = isMobile ? motion.div : 'div'

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
            {isEditMode && <ProfileParametersWindow setState={setIsEditMode} data={data} onClick={handleSubmit} />}
            {isProfilePage && <EditButton onClick={handleEdit} />}
            <UpIcon className={`${s.upIcon} ${isOpen ? s.open : ''}`} />
            <div className={s.header}>
                <div className={s.name_age}>
                    {data.name || 'Данных нет'}, {data.age || 'Данных нет'}
                </div>
            </div>

            <div className={`${s.scrollableContent} ${isOpen ? s.open : ''} ${!isMobile ? s.visible : ''}`}>
                <SummaryContent data={data} />
            </div>
        </Container>
    )
}
