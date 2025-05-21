import { SummaryContent } from '../../../../entities/profile/ui/ProfileSummary/ui/SummaryContent/SummaryContent'
import { DefaultButton } from '../../../../shared'
import s from './ProfileParametersWindow.module.scss'

export const ProfileParametersWindow = ({ data, onClick }) => {
    return (
        <div className={s.window} onMouseDown={(e) => e.stopPropagation()}>
            <div className={s.header}>
                <div className={s.name_age}>
                    {data.name || 'Данных нет'}, {data.age || 'Данных нет'}
                </div>
            </div>

            <div className={`${s.scrollableContent}`}>
                <SummaryContent data={data} isEditing />
            </div>

            <DefaultButton title={'Сохранить'} onClick={onClick} />
        </div>
    )
}