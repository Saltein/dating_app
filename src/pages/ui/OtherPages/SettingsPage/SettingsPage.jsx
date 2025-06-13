import { DefaultDividerH, DefaultSwitch, SettingsButton, ThemeSwitch } from '../../../../shared/ui'
import s from './SettingsPage.module.scss'

export const SettingsPage = () => {
    return (
        <div className={s.wrapper}>
            <SettingsButton title={'Использовать тёмную тему'} Control={<ThemeSwitch />} />
            <DefaultDividerH margin={'24px'} />
            <SettingsButton title={'Помощь'} />
            <SettingsButton title={'О сервисе'} />
            <DefaultDividerH margin={'24px'} />
            <SettingsButton title={'Удалить анкету'} color={'var(--color-error)'} />
        </div>
    )
}