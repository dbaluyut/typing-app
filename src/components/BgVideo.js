import { useState, useEffect } from 'react'

function BgVideo({ index }) {
  const videoLinks = [
    'https://thumbs.gfycat.com/BreakableGlaringImpala-mobile.mp4',
    'https://thumbs.gfycat.com/InsignificantPlainBlobfish-mobile.mp4',
    'https://thumbs.gfycat.com/AchingUnsightlyHarrierhawk-mobile.mp4',
  ]

  const els = [
    <source src='https://thumbs.gfycat.com/BreakableGlaringImpala-mobile.mp4'></source>,
    <source src='https://thumbs.gfycat.com/InsignificantPlainBlobfish-mobile.mp'></source>,
    <source src='https://thumbs.gfycat.com/AchingUnsightlyHarrierhawk-mobile.mp4'></source>,
  ]

  const [ci, setCI] = useState(1)
  //   const [currentBG, setCurrentBG] = useState(
  //     videoLinks[currentIndex]
  //   )

  let currentBG = videoLinks[ci]

  function changeBG() {
    setCI(ci + 1)
    console.log(ci)
  }

  useEffect(() => {
    setTimeout(changeBG, 1000)
  }, [])

  return (
    <video playsInline autoPlay muted loop id='bgVideoLoop'>
      <source src={currentBG}></source>
    </video>
  )
}

export default BgVideo
