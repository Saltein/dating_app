import { LikeCard } from '../../../../entities'
import s from './LikesPage.module.scss'

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
    return (
        <div className={s.wrapper}>
            <div className={s.header}>
                <span className={s.title}>Лайки</span>
                <span className={`${s.title} ${s.desc}`}>Здесь анкеты людей, которым Вы понравились</span>
            </div>
            <div className={s.profiles}>
                {tempData.map((profile, index) => {
                    return <LikeCard profileData={profile} key={index} />
                })}
            </div>
        </div>
    )
}