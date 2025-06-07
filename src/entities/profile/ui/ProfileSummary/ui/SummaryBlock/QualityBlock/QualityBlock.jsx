import { useEffect, useState } from 'react'
import s from './QualityBlock.module.scss'
import { QualityParam } from './QualityParam/QualityParam'
import { profileApi } from '../../../../../../../shared/api/profileApi'
import { ReactComponent as HeartIcon } from '../../../../../../../shared/assets/icons/heart.svg'
import { ReactComponent as HeightIcon } from '../../../../../../../shared/assets/icons/height.svg'
import { ReactComponent as SmokingIcon } from '../../../../../../../shared/assets/icons/smoking.svg'
import { ReactComponent as AlcoholIcon } from '../../../../../../../shared/assets/icons/alcohol.svg'
import { ReactComponent as SportIcon } from '../../../../../../../shared/assets/icons/sport.svg'
import { ReactComponent as ChildrenIcon } from '../../../../../../../shared/assets/icons/children.svg'

export const QualityBlock = ({ title = '', params, isEditing = false, isDating = false }) => {
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
                {(params.marital_status || isEditing) &&
                    <QualityParam defaultParam='Семейное положение' param={params.marital_status} Icon={HeartIcon}
                        options={options.marital_status} name='M' isEditing={isEditing} isDating={isDating} />}
                {(params.height || isEditing) &&
                    <QualityParam defaultParam='Какого ты роста?' param={params.height} Icon={HeightIcon}
                        name='H' isEditing={isEditing} isDating={isDating} />}
                {(params.smoking_attitude || isEditing) &&
                    <QualityParam defaultParam='Куришь?' param={params.smoking_attitude} Icon={SmokingIcon}
                        options={options.smoking_attitude} name='S' isEditing={isEditing} isDating={isDating} />}
                {(params.alcohol_attitude || isEditing) &&
                    <QualityParam defaultParam='Пьёшь?' param={params.alcohol_attitude} Icon={AlcoholIcon}
                        options={options.alcohol_attitude} name='A' isEditing={isEditing} isDating={isDating} />}
                {(params.physical_activity || isEditing) &&
                    <QualityParam defaultParam='Занимаешься спортом?' param={params.physical_activity} Icon={SportIcon}
                        options={options.physical_activity} name='P' isEditing={isEditing} isDating={isDating} />}
                {(params.children_attitude || isEditing) &&
                    <QualityParam defaultParam='Есть дети?' param={params.children_attitude} Icon={ChildrenIcon}
                        options={options.children_attitude} name='C' isEditing={isEditing} isDating={isDating} />}
            </div>
        </div>
    )
}