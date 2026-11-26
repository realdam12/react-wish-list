import React from 'react'
import './Header.css'

const Header = ({ doneCount }) => {
  return (
    <header className='Header'>
      <h3>Wish List 📝</h3>
      <h1>지금까지 해낸 위시 <strong>{doneCount}</strong>개</h1>
    </header>
  )
}

export default Header