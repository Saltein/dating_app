import { ProfileCard, ProfileSummary } from '../../../../entities'
import { DefaultDividerV } from '../../../../shared/ui'
import s from './ProfilePage.module.scss'

export const ProfilePage = () => {
    return (
        <div className={s.wrapper}>
            <ProfileCard isProfilePage />
            <div className={s.profileSummary}>
                <ProfileSummary />
            </div>
        </div>
    )
}