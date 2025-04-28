import s from './PhotoList.module.scss';
import { useState } from 'react';

export const PhotoList = ({ photos = [] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleClick = (e) => {
        const x = e.nativeEvent.offsetX;
        const width = e.target.clientWidth;

        if (x < width / 2) {
            setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
        } else {
            setCurrentIndex((prev) => (prev < photos.length - 1 ? prev + 1 : prev));
        }
    };

    return (
        <>
            <div className={s.wrapper} onClick={handleClick}>
                <img className={s.photo} src={photos[currentIndex]} alt="Фото" />
                <div className={s.photoCount}>
                    {photos.map((_, index) => (
                        <span
                            key={index}
                            className={`${s.dot} ${index === currentIndex ? s.active : ''}`}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};
