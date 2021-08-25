import { useState, useEffect } from "react"
import ReactHowler from "react-howler"

import useKeyPress from "./hooks/useKeyPress"
import useStickyState from "./hooks/useStickyState"
// import getAnimeQuote from './typing-scripts/getAnimeQuote'
// import { script } from './typing-scripts/script1'
import { script } from "./typing-scripts/great-gatsby"
import bgMusic from "./bg-music/test2.mp3"
import BgVideo from "./components/BgVideo"
import BounceLoader from "react-spinners/BounceLoader"
// import axios from 'axios'

import "./App.css"

function App() {
  window.addEventListener("keydown", function (e) {
    if (e.keyCode === 32 && e.target === document.body) {
      e.preventDefault()
    }
  })

  // states
  const [ccCrop, setCccrop] = useStickyState(0, "current char")
  const [cropStart, setCropStart] = useStickyState(1, "start")
  const [cropIndex, setCropIndex] = useStickyState(300, "end")
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
      console.log("pause")
      setIsPlaying(false)
    } else if (lives > 0 && startGame) {
      setIsPlaying(true)
    }
  }, [lives, ghostCount, startGame])

  const [outgoingChars, setOutgoingChars] = useStickyState(
    "",
    "outgoing"
  )
  const [incomingChars, setIncomingChars] = useStickyState(
    par.substr(cropStart, cropIndex),
    "incoming"
  )
  const [currentChar, setCurrentChar] = useStickyState(
    par.charAt(ccCrop),
    "test"
  )
  // keypress`
  useKeyPress((key) => {
    if (startGame) {
      if (key === currentChar) {
        // running count
        setRunningCount(runningCount + 1)
        setGhostCount(ghostCount + 1)

        setOutgoingChars(outgoingChars + currentChar)

        setCccrop((ccCrop) => ccCrop + 1)

        setCropIndex(cropIndex + 1)

        setCurrentChar(par.charAt(ccCrop))

        setCropStart(cropStart + 1)

        let updatedIncomingChars = par.substring(cropStart, cropIndex)

        setIncomingChars(updatedIncomingChars)
      } else if (lives > 0) {
        setRunningCount(0)
        setGhostCount(0)
        setLives(lives - 1)
      }

      let greenBox = document.querySelector(".incomingContainer")

      let cursorBox = document.querySelector("#cursor")
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
    <div className="App">
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
      <div id="vidWrapper">
        <BgVideo index={index} />
      </div>
      <div id="appWrapper">
        <button
          onClick={() => {
            window.localStorage.clear()
            window.location.reload()
          }}
        >
          reset
        </button>
        <h1 id="lives">Lives: {lives}</h1>
        <ReactHowler
          src={bgMusic}
          playing={isPlaying}
          preload={true}
          loop={true}
          onLoad={() => setIsloading(false)}
          html5={true}
          volume={0.25}
        />
        {/*  */}

        <div className="container ">
          {!startGame ? (
            <>
              {isLoading ? (
                <div id="loader">
                  <BounceLoader color="white" loading={isLoading} />
                </div>
              ) : (
                <div>
                  <h1 onClick={handleStart} className="">
                    click here to start..
                  </h1>
                </div>
              )}
            </>
          ) : (
            <div className="incomingContainer ">
              <p className="Character">
                <span className="Character-out">{outgoingChars}</span>
                <span className="Character-current" id="cursor">
                  {currentChar}
                </span>
                <span>{incomingChars}</span>
              </p>
            </div>
          )}
        </div>
        <h1 className="runningCount" ssi>
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
