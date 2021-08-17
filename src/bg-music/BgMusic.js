import Sound from 'react-sound'
import bgMusic from '../bg-music/test2.mp3'

function BgMusic({ isPlaying }) {
  return (
    <Sound
      url={bgMusic}
      playStatus={
        isPlaying
          ? Sound.status.PLAYING
          : Sound.status.PAUSED
      }
      playFromPosition={300}
    />
  )
}

export default BgMusic
