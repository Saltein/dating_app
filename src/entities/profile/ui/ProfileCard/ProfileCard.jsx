import { StatBadge } from '../../../../shared'
import s from './ProfileCard.module.scss'
import { ReactComponent as LikeIcon } from '../../../../shared/assets/icons/heart.svg'
import { PhotoList } from './PhotoList/PhotoList'

export const ProfileCard = ({ isProfilePage = false, data }) => {

    let photo
    let views
    let likes

    if (data) {
        photo = data.photo
        views = data.views
        likes = data.likes
    }

    return (
        <div className={s.wrapper}>
            <div className={s.photos}>
                {data ? <PhotoList photos={photo} /> : "Данные отсутствуют"}
            </div>
            {
                isProfilePage
                    ?
                    <div className={s.params}>
                        <StatBadge title={'Просмотры'} value={views} type={'views'} />
                        <StatBadge title={'Лайки'} value={likes} Icon={LikeIcon} type={'likes'} />
                    </div>
                    :
                    <div className={s.params}>
                        abiba
                    </div>
            }

        </div>
    )
}