import { motion, useAnimation } from 'framer-motion'
import { useState, useEffect } from 'react'
import s from './ProfileSummary.module.scss'
import { SummaryBlock } from './ui/SummaryBlock/SummaryBlock'
import { ReactComponent as UpIcon } from '../../../../shared/assets/icons/up.svg'
import { DefaultButton, EditButton } from '../../../../shared'
import { ProfileParametersWindow } from '../../../../features/profile/ui/ProfileParametersWindow/ProfileParametersWindow'
import { SummaryContent } from './ui/SummaryContent/SummaryContent'

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

    const handleSubmit = () => {
        setIsEditMode(false)
    }

    useEffect(() => {
        console.log('isEditMode', isEditMode)
    }, [isEditMode])

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

            {isEditing && <DefaultButton title={'Сохранить'} onClick={handleSubmit} />}
        </Container>
    )
}
