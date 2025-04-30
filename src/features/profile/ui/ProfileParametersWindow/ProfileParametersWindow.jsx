import { ProfileSummary } from '../../../../entities'
import s from './ProfileParametersWindow.module.scss'

export const ProfileParametersWindow = ({ setState, data }) => {
    return (
        <div className={s.wrapper} onClick={() => { setState(false) }}>
            <div className={s.window} onClick={(e) => e.stopPropagation()}>
                <ProfileSummary isProfilePage={false} dataObj={data} isEditing />
            </div>
        </div>
    )
}