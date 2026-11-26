import React, { useState } from 'react'
import WishItem from './WishItem'
import './WishList.css'

const WishList = ({ wishs, onUpdate,onDelete }) => {
    const [search, setSearch] = useState('')

    const onChangeSearch = (e) => {
        setSearch(e.target.value)
    }

    const filteredData = () => {
        if (search === '') {
            return wishs
        }

        return wishs.filter((wish) =>
            wish.content
                .toLowerCase()
                .includes(search.toLowerCase())
        )
    }

    const filteredwishs = filteredData()

    return (
        <div className='WishList'>
            <h4>List</h4>
            <input
                type="text"
                value={search}
                onChange={onChangeSearch}
                placeholder='검색어를 입력하세요.'
            />
            <div className="wishs-wrapper">
                {filteredwishs.map((wish) => (
                    <WishItem
                        key={wish.id}
                        {...wish}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                    />
                ))}
            </div>
        </div>
    )
}

export default WishList