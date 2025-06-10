import s from './OptionSwitcher.module.scss'
import { useState } from 'react'
import { useTheme } from '../../../../../shared/context/theme/ThemeContext'

export const OptionSwitcher = ({ title, optionList = [], onChoose = () => console.log('пропс onChoose пуст'), defaultOption = { id: null, name: ''} }) => {
    const theme = useTheme()

    const [currentOption, setCurrentOption] = useState(defaultOption)

    const handleChoose = (option) => {
        setCurrentOption(option)
        onChoose(option)
    }

    return (
        <div className={s.wrapper}>
            {title &&
                <h4 className={s.title}>
                    {title}
                </h4>}

            <div className={s.options}>
                {optionList.map((option) => {
                    return (
                        <div className={`${s.option} ${theme === 'dark' ? s.dark : s.light} ${currentOption.id === option.id ? s.current : ''}`}
                            key={option.id}
                            onClick={() => handleChoose(option)}>
                            {option.name}
                        </div>
                    )
                })}
            </div>
        </div >
    )
}