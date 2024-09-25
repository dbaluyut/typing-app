import { useState, useEffect } from "react";

function BgVideo({ index }) {
  const videoLinks = [
    "https://tenor.com/view/lofi-girl-lofi-study-gif-22173420",
  ];

  const els = [
    <source src="https://tenor.com/view/lofi-girl-lofi-study-gif-22173420"></source>,
  ];

  const [ci, setCI] = useState(1);
  //   const [currentBG, setCurrentBG] = useState(
  //     videoLinks[currentIndex]
  //   )

  let currentBG = videoLinks[ci];

  function changeBG() {
    for (let i = 1; i < els.length; i++) {
      setTimeout(function () {
        setCI((ci) => ci + 1);
        console.log(ci);
      }, 3000);
    }
  }

  useEffect(() => {
    // setTimeout(changeBG, 10000)
  }, [ci]);
  return (
    <div id="bgVideoLoop">
      <div
        style={{
          width: "100%",
          height: 0,
          paddingBottom: "100%",
          position: "relative",
        }}
      >
        <iframe
          src="https://giphy.com/embed/JGMaGy5beukJ96I5Xw"
          width="100%"
          height="100%"
          style={{position: 'absolute'}}
          frameBorder="0"
          class="giphy-embed"
          allowFullScreen
        ></iframe>
      </div>
      <p>
        <a href="https://giphy.com/gifs/savesoil-merry-christmas-lofi-girl-lofigirl-JGMaGy5beukJ96I5Xw">
          via GIPHY
        </a>
      </p>
    </div>
  );
}

export default BgVideo;
