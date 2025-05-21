import { Bubble, ModalWindow } from '../../../../../../shared'
import s from './SummaryBlock.module.scss'
import { ReactComponent as FilmIcon } from '../../../../../../shared/assets/icons/film.svg'
import { ReactComponent as BookIcon } from '../../../../../../shared/assets/icons/book.svg'
import { useDispatch } from 'react-redux'
import { removeParam, setFilmsBooks } from '../../model/summarySlice'
import { ListModal } from '../ListModal/ListModal'
import { useEffect, useState } from 'react'
import { profileApi } from '../../../../../../shared/api/profileApi'

export const SummaryBlock = ({ title = 'no title', params, isBubble = true, isEditing, paramKey }) => {
    // Consts ----------------------------------------------------
    const dispatch = useDispatch()

    // States (local) --------------------------------------------
    const [optionList, setOptionList] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isFBEditing, setIsFBEditing] = useState(false)

    // Handlers --------------------------------------------------
    const handleRemove = (id) => {
        dispatch(removeParam({ key: paramKey, value: id }))
    }

    const handleOpenModal = () => {
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
    }

    const handleChange = (e) => {
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
                    <div className={s.param} onClick={() => setIsFBEditing(true)}>
                        <FilmIcon className={s.icon} />
                        {isFBEditing
                            ? <textarea className={`${s.text} ${s.edit}`} value={params.films || ''} />
                            : <span className={s.text}>{params.films}</span>
                        }
                    </div>
                    <div className={s.param}>
                        <BookIcon className={s.icon} />
                        <span className={s.text}>{params.books}</span>
                    </div>
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