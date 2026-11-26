import React from 'react'
import './WishTag.css'

const WishTag = ({ tags = [] }) => {
  if (tags.length === 0) return null

  return (
    <ul className='tag'>
      {tags.map(tag => (
        <li key={tag}># {tag}</li>
      ))}
    </ul>
  )
}

export default WishTag