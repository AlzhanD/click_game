import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Game from './game'
import { setGameNumbers } from '../redux/reducers/game'

const Home = () => {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const dispatch = useDispatch()

  return (
    <div className="container mx-auto">
      <div className="">
        <input
          className="bg-orange-200 mr-5 mb-5"
          placeholder="set X-line"
          type="text"
          onChange={(e) => setWidth(e.target.value)}
        />
        <input
          className="bg-orange-200"
          placeholder="set Y-line"
          type="text"
          onChange={(e) => setHeight(e.target.value)}
        />
        <button
          type="button"
          className=" ml-3 mb-5 bg-pink-600 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => dispatch(setGameNumbers(width, height))}
        >
          PLAY
        </button>
      </div>
      <Game />
    </div>
  )
}

Home.propTypes = {}

export default Home
