import { useEffect, useState } from 'react'
import { LikeCard } from '../../../../entities'
import s from './LikesPage.module.scss'
import { datingApi } from '../../../../shared/api/datingApi'
import { useSelector } from 'react-redux'
import { getId } from '../../../../entities/profile/ui/ProfileSummary/model/summarySelectors'
import { ModalWindow } from '../../../../shared'

const tempData = [
    {
        name: 'Катя',
        age: '22',
        img: 'https://img.freepik.com/free-photo/handsome-sensitive-man-portrait_23-2149509848.jpg?semt=ais_hybrid&w=740'
    },
    {
        name: 'Алина',
        age: '19',
        img: 'https://tairtd.ru/upload/medialibrary/color_inspiration/white3.jpg'
    },
    {
        name: 'Дарья',
        age: '23',
        img: 'https://www.biletik.aero/upload/medialibrary/807/807f262b60da392f1e09aa6d33f20a9b.png'
    },
]

export const LikesPage = () => {
    const userId = useSelector(getId)

    const [likes, setLikes] = useState([])

    const fetchLikes = async () => {
        try {
            const response = await datingApi.getLikes(userId)
            if (!response) {
                console.log('Неизвестная ошибка получения лайков')
                return
            }
            setLikes(response) // сохраняем в стейт
        } catch (error) {
            console.error('Ошибка получения лайков:', error)
        }
    }

    useEffect(() => {
        if (!userId) return // Ждём, пока userId появится
        fetchLikes()
    }, [userId])

    return (
        <div className={s.wrapper}>
            <div className={s.header}>
                <span className={s.title}>Лайки</span>
                <span className={`${s.title} ${s.desc}`}>Здесь анкеты людей, которым Вы понравились</span>
            </div>
            {likes.length < 1 &&
                <div className={s.noLikes}>
                    <h3>Вас пока никто не лайкнул(</h3>
                </div>}
            <div className={s.profiles}>
                {likes.map((profile, index) => {
                    return <LikeCard profileData={profile} key={index} onAction={fetchLikes} />
                })}
            </div>
        </div>
    )
}