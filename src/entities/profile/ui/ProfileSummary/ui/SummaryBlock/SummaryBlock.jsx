import { Bubble, ModalWindow } from '../../../../../../shared'
import s from './SummaryBlock.module.scss'
import { ReactComponent as FilmIcon } from '../../../../../../shared/assets/icons/film.svg'
import { ReactComponent as BookIcon } from '../../../../../../shared/assets/icons/book.svg'
import { useDispatch } from 'react-redux'
import { removeFromArray, setBooks, setFilms } from '../../model/summarySlice'
import { ListModal } from '../ListModal/ListModal'
import { useEffect, useState } from 'react'
import { profileApi } from '../../../../../../shared/api/profileApi'

export const SummaryBlock = ({ title = 'no title', params = [], isBubble = true, isEditing, paramKey }) => {
    // Consts ----------------------------------------------------
    const dispatch = useDispatch()

    // States (local) --------------------------------------------
    const [optionList, setOptionList] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isFBEditing, setIsFBEditing] = useState(false)

    // Handlers --------------------------------------------------
    const handleRemove = (id) => {
        dispatch(removeFromArray({ key: paramKey, value: id }))
    }

    const handleOpenModal = () => {
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
    }

    const handleFilmsChange = (e) => {
        dispatch(setFilms([e.target.value]));
    }
    const handleBooksChange = (e) => {
        dispatch(setBooks([e.target.value]));
    }

    // Effects ---------------------------------------------------
    useEffect(() => {
        if (paramKey) {
            const fetchOptions = async () => {
                try {
                    let response = await profileApi.getOptions(paramKey)
                    setOptionList(response)
                } catch (error) {
                    console.error('Ошибка получения списка опций:', error)
                }
            }
            fetchOptions()
        }
    }, [paramKey])

    return (
        <div className={s.wrapper}>
            <span className={s.title}>{title}</span>
            {isBubble
                ?
                <div className={s.bubbleList}>
                    {params.map((param, index) => {
                        return (
                            <Bubble title={param.title} key={index} isEditing={isEditing} onClick={isEditing ? () => handleRemove(param.id) : undefined} />
                        )
                    })}
                    {isEditing && <Bubble title={'+'} isButton onClick={handleOpenModal} />}
                </div>
                :
                <div className={s.filmsBooks}>
                    {isEditing
                        ? (
                            <>
                                <div className={s.param}>
                                    <FilmIcon className={s.icon} />
                                    <textarea
                                        maxLength={64}
                                        className={`${s.text} ${s.edit}`}
                                        value={params.films || ''}
                                        onChange={handleFilmsChange}
                                        onBlur={() => setIsFBEditing(false)}
                                        onInput={(e) => {
                                            e.target.style.height = '20px';
                                            e.target.style.height = `${e.target.scrollHeight}px`;
                                        }}
                                    />
                                </div>
                                <div className={s.param}>
                                    <BookIcon className={s.icon} />
                                    <textarea
                                        maxLength={64}
                                        className={`${s.text} ${s.edit}`}
                                        value={params.books || ''}
                                        onChange={handleBooksChange}
                                        onBlur={() => setIsFBEditing(false)}
                                        onInput={(e) => {
                                            e.target.style.height = '20px';
                                            e.target.style.height = `${e.target.scrollHeight}px`;
                                        }}
                                    />
                                </div>
                            </>
                        )
                        : (
                            <>
                                <div
                                    className={s.param}
                                >
                                    <FilmIcon className={s.icon} />
                                    <span className={s.text}>{params.films}</span>
                                </div>
                                <div className={s.param}>
                                    <BookIcon className={s.icon} />
                                    <span className={s.text}>{params.books}</span>
                                </div>
                            </>
                        )
                    }
                </div>
            }
            {isModalOpen &&
                <ModalWindow onClose={handleCloseModal}>
                    <ListModal optionList={optionList} currentOptions={params} onClose={handleCloseModal} paramKey={paramKey} onDelete={handleRemove} title={title} />
                </ModalWindow>
            }
        </div>
    )
}