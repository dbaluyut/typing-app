import { useState, useEffect } from 'react'
import useSound from 'use-sound'
import Sound from 'react-sound'

import useKeyPress from './hooks/useKeyPress'
// import useStickyState from './hooks/useStickyState'
// import getAnimeQuote from './typing-scripts/getAnimeQuote'
import { script } from './typing-scripts/script1'
import bgMusic from './bg-music/test2.mp3'

import axios from 'axios'

import './App.css'
import BgMusic from './bg-music/BgMusic'

function App() {
  window.addEventListener('keydown', function (e) {
    if (e.keyCode === 32 && e.target === document.body) {
      e.preventDefault()
    }
  })

  // console.log(typeof test1);
  // states

  const [par, setPar] = useState(script)

  // running count state
  const [runningCount, setRunningCount] = useState(0)
  const [ghostCount, setGhostCount] = useState(0)
  const [lives, setLives] = useState(8)
  const [livesGoal, setLivesGoal] = useState(1)
  const [quote, setQuote] = useState('')

  // sound
  // const [play, { pause, isPlaying }] = useSound(bgMusic)
  // const [playBg, setPlayBg] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsloading] = useState(true)
  useEffect(() => {
    if (ghostCount === 10) {
      setGhostCount(0)
      setLives((lives) => lives + 1)
      // setLivesGoal((livesGoal) => livesGoal + 2)
    }

    if (lives <= 0) {
      console.log('pause')
      setIsPlaying(false)
    } else {
      setIsPlaying(true)
    }
  }, [lives, ghostCount])

  const [outgoingChars, setOutgoingChars] = useState('')
  const [currentChar, setCurrentChar] = useState(
    par.charAt(0)
  )
  const [incomingChars, setIncomingChars] = useState(
    par.substr(1)
  )
  // keypress
  useKeyPress((key) => {
    //1
    let updatedOutgoingChars = outgoingChars
    let updatedIncomingChars = incomingChars

    //2
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
    // if (cbOffset > lastOffset) {
    //   let scrollAm = cbOffset - lastOffset;
    //   scrollBy += scrollAm;
    //   lastOffset += scrollAm;
    //   greenBox.scrollTop = scrollBy;
    // }

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
  })
  return (
    <div className='App'>
      <h1>{lives}</h1>

      <Sound
        url={bgMusic}
        playStatus={
          isPlaying
            ? Sound.status.PLAYING
            : Sound.status.PAUSED
        }
        autoLoad={true}
        loop={true}
      />
      <h1 className='runningCount'>{runningCount}</h1>
      <div className='container '>
        {isLoading ? (
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
        ) : (
          <h1>loading..</h1>
        )}
      </div>
    </div>
  )
}

export default App
