import { StatBadge } from '../../../../shared'
import s from './ProfileCard.module.scss'
import photo from './photo.jpg'
import { ReactComponent as LikeIcon } from '../../../../shared/assets/icons/heart.svg'

export const ProfileCard = ({ isProfilePage = false }) => {

    const views = 45
    const likes = 3

    return (
        <div className={s.wrapper}>
            <div className={s.photos}>
                <img className={s.photo} src={photo} alt='photo' />
            </div>
            {
                isProfilePage
                    ?
                    <div className={s.params}>
                        <StatBadge title={'Просмотры'} value={views} type={'views'} />
                        <StatBadge title={'Лайки'} value={likes} Icon={LikeIcon} type={'likes'} />
                    </div>
                    :
                    <div className={s.buttons}>
                        abiba
                    </div>
            }

        </div>
    )
}