import { useState, useEffect } from 'react'
import ReactHowler from 'react-howler'

import useKeyPress from './hooks/useKeyPress'
// import useStickyState from './hooks/useStickyState'
// import getAnimeQuote from './typing-scripts/getAnimeQuote'
// import { script } from './typing-scripts/script1'
import { script } from './typing-scripts/great-gatsby'
import bgMusic from './bg-music/test2.mp3'
import BgVideo from './components/BgVideo'
import BounceLoader from 'react-spinners/BounceLoader'
// import axios from 'axios'

import './App.css'

function App() {
  window.addEventListener('keydown', function (e) {
    if (e.keyCode === 32 && e.target === document.body) {
      e.preventDefault()
    }
  })

  // states
  const [cropIndex, setCropIndex] = useState(100)
  const [par, setPar] = useState(script)
  const [index, setIndex] = useState(1)
  // running count state
  const [runningCount, setRunningCount] = useState(0)
  const [ghostCount, setGhostCount] = useState(0)
  const [lives, setLives] = useState(8)
  // const [livesGoal, setLivesGoal] = useState(1)
  const [startGame, setStartGame] = useState(false)
  // sound

  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsloading] = useState(true)
  useEffect(() => {
    if (ghostCount === 10) {
      setGhostCount(0)
      setLives((lives) => lives + 1)
      // setLivesGoal((livesGoal) => livesGoal + 2)
    }

    if (lives <= 0 || !startGame) {
      console.log('pause')
      setIsPlaying(false)
    } else if (lives > 0 && startGame) {
      setIsPlaying(true)
    }
  }, [lives, ghostCount, startGame])

  const [outgoingChars, setOutgoingChars] = useState('')
  const [currentChar, setCurrentChar] = useState(
    par.charAt(0)
  )
  const [incomingChars, setIncomingChars] = useState(
    par.substr(1, cropIndex)
  )
  // keypress
  useKeyPress((key) => {
    //1
    let updatedOutgoingChars = outgoingChars
    let updatedIncomingChars = incomingChars

    //2
    if (startGame) {
      if (key === currentChar) {
        setRunningCount(runningCount + 1)
        setGhostCount(ghostCount + 1)
        //3
        // if (leftPadding.length > 0) {
        //   setLeftPadding(leftPadding.substring(1));
        // }
        //4
        updatedOutgoingChars += currentChar
        setOutgoingChars(updatedOutgoingChars)

        //5
        setCurrentChar(incomingChars.charAt(0))

        //6
        updatedIncomingChars = incomingChars.substring(1)

        setIncomingChars(updatedIncomingChars)
        console.log(incomingChars)
        setCropIndex((setCropIndex) => setCropIndex + 1)
      } else {
        setRunningCount(0)
        setGhostCount(0)
        setLives(lives - 1)
      }

      let greenBox = document.querySelector(
        '.incomingContainer'
      )

      let cursorBox = document.querySelector('#cursor')
      let cbOffset = cursorBox.offsetTop //32
      let lastOffset = 32 //32
      let scrollBy = 0

      function scrollBy1Line(refEl, parentEl) {
        let currentOffset = refEl.offsetTop
        if (currentOffset > lastOffset) {
          let scrollAmount = currentOffset - lastOffset
          scrollBy += scrollAmount
          lastOffset += scrollBy
          parentEl.scrollTop = scrollBy
        }
      }
      scrollBy1Line(cursorBox, greenBox)
    }
  })

  function handleStart() {
    // playTest()
    setStartGame(true)
  }

  return (
    <div className='App'>
      {/* 
      <div id='bgContainer'>
        <iframe
          id='bgVideo'
          frameborder='0'
          height='100%'
          width='100%'
          src='https://youtube.com/embed/VCVQGKvXBPU?autoplay=1&controls=1&showinfo=0&autohide=1'
        ></iframe>
      </div> */}
      <div id='vidWrapper'>
        <BgVideo index={index} />
      </div>
      <div id='appWrapper'>
        <h1 id='lives'>Lives: {lives}</h1>
        <ReactHowler
          src={bgMusic}
          playing={isPlaying}
          preload={true}
          loop={true}
          onLoad={() => setIsloading(false)}
          html5={true}
        />
        {/*  */}

        <div className='container '>
          {!startGame ? (
            <>
              {isLoading ? (
                <div id='loader'>
                  <BounceLoader
                    color='white'
                    loading={isLoading}
                  />
                </div>
              ) : (
                <div>
                  <h1 onClick={handleStart} className=''>
                    click here to start..
                  </h1>
                </div>
              )}
            </>
          ) : (
            <div className='incomingContainer '>
              <p className='Character'>
                <span className='Character-out'>
                  {outgoingChars}
                </span>
                <span
                  className='Character-current'
                  id='cursor'
                >
                  {currentChar}
                </span>
                <span>{incomingChars}</span>
              </p>
            </div>
          )}
        </div>
        <h1 className='runningCount' ssi>
          Combo: {runningCount}
        </h1>
      </div>
      {/* <button
        onClick={() => {
          {
            setIndex(index + 1)
            console.log(index)
          }
        }}
      >
        change
      </button> */}
    </div>
  )
}

export default App
