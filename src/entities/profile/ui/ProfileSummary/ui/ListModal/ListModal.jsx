import { Bubble, DefaultDividerH } from '../../../../../../shared'
import s from './ListModal.module.scss'

export const ListModal = ({ optionList, currentOptions }) => {

    const currentIds = new Set(currentOptions.map(option => option.id))

    const optionsLeft = optionList.filter(option => !currentIds.has(option.id))

    return (
        <div className={s.wrapper} onMouseDown={()=>{}}>
            <div className={s.window}>
                <div className={s.current}>
                    {currentOptions.map((option, index) => {
                        return (
                            <Bubble title={option.title} key={index} isCurrent />
                        )
                    })}
                </div>
                <DefaultDividerH />
                <div className={s.list}>
                    {optionsLeft.map((option, index) => {
                        return (
                            <Bubble title={option.title} key={index} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}