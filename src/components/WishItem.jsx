import React, { useState } from 'react'
import './WishItem.css'
import WishTag from './WishTag'

const toInputData = (time) => {
    const d = new Date(time)
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const dd = String(d.getDate()).padStart(2, '0')

    return `${d.getFullYear()}-${mm}-${dd}`
}

const WishItem = ({ id, isDone, content, date, tags = [], onUpdate, onDelete }) => {
    const [isEdit, setIsEdit] = useState(false)
    const [editContent, setEditContent] = useState(content)
    const [editDate, setEditDate] = useState(toInputData(date))
    const [editTags, setEditTags] = useState(tags.join(', '))

    const onChangeCheck = () => {
        onUpdate(id, { isDone: !isDone })
    }

    const onClickUpdate = () => {
        if (!isEdit) {
            setEditContent(content)
            setEditDate(toInputData(date))
            setEditTags(tags.join(', '))
            setIsEdit(true)
            return
        }

        if (!editContent.trim() || !editDate) return

        const tagList = editTags
            .split(',')
            .map(tag => tag.trim().replace(/^#+/, '').trim())
            .filter(Boolean)

        onUpdate(id, {
            content: editContent.trim(),
            date: new Date(`${editDate}T00:00:00`).getTime(),
            tags: [...new Set(tagList)]
        })

        setIsEdit(false)
    }

    return (
        <div className={`WishItem ${isDone ? 'isDone' : ''}`}>
            <input
                type='checkbox'
                checked={isDone}
                onChange={onChangeCheck}
            />

            <div className='main-wrap'>
                <div className='content-wrap'>
                    {isEdit ? (
                        <>
                            <input
                                type='text'
                                className='content'
                                aria-label='위시 내용'
                                value={editContent}
                                onChange={e => setEditContent(e.target.value)}
                            />
                            <input
                                type='text'
                                className='tag-input'
                                aria-label='위시 태그'
                                placeholder='태그를 쉼표로 구분해 입력해줘'
                                value={editTags}
                                onChange={e => setEditTags(e.target.value)}
                            />
                        </>
                    ) : (
                        <>
                            <div className='content'>{content}</div>
                            <WishTag tags={tags} />
                        </>
                    )}
                </div>
            </div>

            <div className='btn-wrap'>
                {isEdit ? (
                    <input
                        type='date'
                        className='date'
                        aria-label='위시 날짜'
                        value={editDate}
                        onChange={e => setEditDate(e.target.value)}
                    />
                ) : (
                    <span className='date'>{new Date(date).toLocaleDateString()}</span>
                )}

                <button className='updateBtn' onClick={onClickUpdate}>
                    {isEdit ? '저장' : '수정'}
                </button>
                <button className='deleteBtn' onClick={() => onDelete(id)}>
                    삭제
                </button>
            </div>
        </div>
    )
}

export default WishItem