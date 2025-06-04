import { useEffect, useState } from 'react'
import s from './QualityBlock.module.scss'
import { QualityParam } from './QualityParam/QualityParam'
import { profileApi } from '../../../../../../../shared/api/profileApi'

export const QualityBlock = ({ title = '', params }) => {
    const [options, setOptions] = useState({ marital_status: [], smoking_attitude: [], alcohol_attitude: [], physical_activity: [], children_attitude: [] })

    const fetchOptions = async () => {
        try {
            const marital = await profileApi.getOptions('marital_status')
            const smoking = await profileApi.getOptions('smoking_attitude')
            const alcohol = await profileApi.getOptions('alcohol_attitude')
            const physical = await profileApi.getOptions('physical_activity')
            const children = await profileApi.getOptions('children_attitude')
            if (marital && smoking && alcohol && physical && children) {
                setOptions({
                    marital_status: marital,
                    smoking_attitude: smoking,
                    alcohol_attitude: alcohol,
                    physical_activity: physical,
                    children_attitude: children
                })
            } else {
                console.log('Неизвестная ошибка получения списков личных качеств')
            }
        } catch (error) {
            console.log('Ошибка получения списков личных качеств:', error)
        }
    }

    useEffect(() => {
        fetchOptions()
    }, [])

    return (
        <div className={s.wrapper}>
            <span className={s.title}>{title}</span>

            <div className={s.params}>
                <QualityParam defaultParam='Семейное положение' param={params.marital_status} options={options.marital_status} />
                <QualityParam defaultParam='Какого ты роста?' param={params.height} />
                <QualityParam defaultParam='Куришь?' param={params.smoking_attitude} options={options.smoking_attitude} />
                <QualityParam defaultParam='Пьёшь?' param={params.alcohol_attitude} options={options.alcohol_attitude} />
                <QualityParam defaultParam='Занимаешься спортом?' param={params.physical_activity} options={options.physical_activity} />
                <QualityParam defaultParam='Есть дети?' param={params.children_attitude} options={options.children_attitude} />
            </div>
        </div>
    )
}