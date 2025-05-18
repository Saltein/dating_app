import { DefaultDividerH, NavButton } from '../../../shared'
import s from './Navigation.module.scss'
import { useState } from 'react'

export const Navigation = ({ buttonsList = [] }) => {
    const [currentPage, setCurrentPage] = useState('/')

    const handleSelectPage = (page) => {
        setCurrentPage(page)
    }

    return (
        <div className={s.wrapper}>
            {buttonsList.map((button, index) => {
                return (
                    <div key={index}>
                        <NavButton title={button.title} Icon={button.Icon}
                            href={button.href} onClick={handleSelectPage} currentPage={currentPage}
                        />
                        {index < buttonsList.length - 1 && (
                            <DefaultDividerH margin={'24px'} />
                        )}
                    </div>
                )
            })}
        </div>
    )
}