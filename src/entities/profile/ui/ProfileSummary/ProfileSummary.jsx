import s from './ProfileSummary.module.scss'
import { motion, useAnimation } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ReactComponent as UpIcon } from '../../../../shared/assets/icons/up.svg'
import { EditButton, ModalWindow } from '../../../../shared'
import { ProfileParametersWindow } from '../../../../features/profile/ui/ProfileParametersWindow/ProfileParametersWindow'
import { SummaryContent } from './ui/SummaryContent/SummaryContent'
import { profileApi } from '../../../../shared/api/profileApi'
import {
    getAge, getAlcoholAttitude, getBooks, getChildrenAttitude, getDescription,
    getFilms,
    getGames,
    getHeight, getInterests, getMaritalStatus, getMusic,
    getName,
    getPhotos,
    getPhysicalActivity,
    getSmokingAttitude
} from '../../../../entities/profile/ui/ProfileSummary/model/summarySelectors'
import { computeProfileCompleteness, evaluateDescriptionQuality } from '../../../../shared/lib/algorithmEvaluatingInterlocutor/algorithmEvaluatingInterlocutor'

export const ProfileSummary = ({ isProfilePage = false, dataObj, isDating = false }) => {

    // Consts ----------------------------------------------------
    const data = dataObj || {}
    const controls = useAnimation()

    const updatedData = {
        name: useSelector(getName),
        age: useSelector(getAge),
        description: useSelector(getDescription),
        interests: useSelector(getInterests).map(obj => obj.id),
        music: useSelector(getMusic).map(obj => obj.id),
        films: useSelector(getFilms),
        books: useSelector(getBooks),
        games: useSelector(getGames).map(obj => obj.id),
        photos: useSelector(getPhotos),
        marital_status_id: useSelector(getMaritalStatus),
        smoking_attitude_id: useSelector(getSmokingAttitude),
        alcohol_attitude_id: useSelector(getAlcoholAttitude),
        physical_activity_id: useSelector(getPhysicalActivity),
        children_attitude_id: useSelector(getChildrenAttitude),
        height_cm: useSelector(getHeight),
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
        let newData = {...updatedData, interest_coefficient: computeProfileCompleteness(updatedData)}
        console.log('newData', newData)
        try {
            const response = await profileApi.updateProfile(newData)
            if (!response) {
                console.log('Неизвестная ошибка обновления данных')
            }
            setIsEditMode(false)
        } catch (error) {
            console.error('Ошибка при отправке обновлённых данных:', error)
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
            {isEditMode &&
                <ModalWindow onClose={() => setIsEditMode(false)}>
                    <ProfileParametersWindow data={data} onClick={handleSubmit} />
                </ModalWindow>
            }
            {isProfilePage && <EditButton onClick={handleEdit} />}
            <UpIcon className={`${s.upIcon} ${isOpen ? s.open : ''}`} />
            <div className={s.header}>
                <div className={s.name_age}>
                    {data.name || 'Данных нет'}, {data.age || 'Данных нет'}
                </div>
            </div>

            <div className={`${s.scrollableContent} ${isOpen ? s.open : ''} ${!isMobile ? s.visible : ''}`}>
                <SummaryContent data={data} isDating={isDating} />
            </div>
        </Container>
    )
}
