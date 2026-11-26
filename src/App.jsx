
import { useState, useRef } from 'react'
import './App.css'
import Header from './components/Header'
import WishEditor from './components/WishEditor'
import WishList from './components/WishList'

const mockData = [
{
    id: 0,
    isDone: false,
    content: '오사카 여행',
    tags: ['여행', '일본'],
    date: new Date().getTime()
  },
{
  id: 1,
    isDone: false,
      content: "오마카세",
      tags: ['먹방', '일본'],
        date: new Date().getTime()
},
{
  id: 2,
    isDone: false,
      content: "파인다이닝",
      tags: ['먹방', '한국'],
        date: new Date().getTime()
}
]
function App() {

  const [wishs, setWishs] = useState(mockData)
  const idRef = useRef(3)
  const doneCount = wishs.filter(wish => wish.isDone).length

  const onCreate = (content) => {
    const newTodo = {
      id: idRef.current++,
      isDone: false,
      content: content,
      date: new Date().getTime()
    }

    setWishs([newTodo, ...wishs])
  }

  const onUpdate = (targetId, updateData) => {
    setWishs(wishs.map((wish) =>
      wish.id === targetId
        ? { ...wish, ...updateData }
        : wish
    ))
  }

  const onDelete = (targetId) => {
    setWishs(wishs.filter((wish) => wish.id !== targetId))
  }

  return (
    <div className='App'>
      <Header doneCount={doneCount} />
      <WishEditor onCreate={onCreate} />
      <WishList wishs={wishs} onUpdate={onUpdate} onDelete={onDelete} />

    </div>
  )
}

export default App
