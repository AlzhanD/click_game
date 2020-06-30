import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Game = () => {
  const userInput = useSelector((store) => store.game.total)
  const width = Number(userInput.width)
  const height = Number(userInput.height)
  const [gameField, setGameField] = useState(
    new Array(width * height).fill(null).map((el, index) => {
      return {
        index,
        state: 'free'
      }
    })
  )

  const getRandomBox = () => {
    const gameBoxFree = gameField.filter((el) => el.state === 'free')
    return gameBoxFree[Math.floor(Math.random() * gameBoxFree.length)].index
  }

  const [timeOutId, setTimeOutId] = useState(null)
  const [selected, setSelected] = useState(getRandomBox())
  const updateState = (id, state) => {
    setGameField(
      gameField.map((item) => ({ ...item, state: item.index === id ? state : item.state }))
    )
    setSelected(getRandomBox())
    clearTimeout(timeOutId)
  }

  const nextRound = (select) => {
    const timeOutIndex = setTimeout(() => {
      updateState(select, 'pc')
    }, 1000)
    setTimeOutId(timeOutIndex)
  }

  useEffect(() => {
    const userField = gameField.filter((el) => el.state === 'user')
    const pcField = gameField.filter((el) => el.state === 'pc')
    if (userField.length > (width * height) / 2) {
      alert('USER WIN')
      setSelected(null)
    }
    if (pcField.length > (width * height) / 2) {
      alert('PC WIN')
      setSelected(null)
    }
    if (userField.length <= (width * height) / 2 && pcField.length <= width * height) {
      nextRound(selected)
    }
  }, [height, selected, width])
  return (
    <div>
      <h2>My Game</h2>

      <div className="flex item-center justify-center border-2 border-bg-gray-200 ">
        <div className="flex flex-wrap " style={{ width: `${width * 45}px` }}>
          {gameField.map((el) => {
            const colorStatus = `
            ${el.state === 'free' ? 'bg-gray-300' : ''}
            ${el.index === selected ? 'bg-yellow-200' : ''}
            ${el.state === 'user' ? 'bg-green-200' : ''}
            ${el.state === 'pc' ? 'bg-red-600' : ''}
            `
            return (
              <button
                key={el.index}
                className={`box border-2 rounded border-gray-100 ${colorStatus}`}
                type="button"
                onClick={() => {
                  if (selected === el.index) {
                    updateState(el.index, 'user')
                  }
                }}
              >
                {el.index}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

Game.propTypes = {}

export default React.memo(Game)
