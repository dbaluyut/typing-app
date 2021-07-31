import { useState } from "react";
import faker from "faker";
// import ScriptContainer from "./script-container/ScriptContainer";
import useKeyPress from "./hooks/useKeyPress";
import "./App.css";

import { script } from "./typing-scripts/script1";
function App() {
  window.addEventListener("keydown", function (e) {
    if (e.keyCode == 32 && e.target == document.body) {
      e.preventDefault();
    }
  });
  // console.log(typeof test1);
  // states

  // const par = faker.lorem.paragraph();
  const par = script;

  const [leftPadding, setLeftPadding] = useState(
    new Array(20).fill(" ").join("")
  );
  const [outgoingChars, setOutgoingChars] = useState("");
  const [currentChar, setCurrentChar] = useState(par.charAt(0));
  const [incomingChars, setIncomingChars] = useState(par.substr(1));

  function generate() {
    return faker.lorem.paragraph();
  }

  // keypress
  useKeyPress((key) => {
    console.log(key);
    //1
    let updatedOutgoingChars = outgoingChars;
    let updatedIncomingChars = incomingChars;

    //2
    if (key === currentChar) {
      //3
      // if (leftPadding.length > 0) {
      //   setLeftPadding(leftPadding.substring(1));
      // }
      //4
      updatedOutgoingChars += currentChar;
      setOutgoingChars(updatedOutgoingChars);

      //5
      setCurrentChar(incomingChars.charAt(0));

      //6
      updatedIncomingChars = incomingChars.substring(1);
      // if (updatedIncomingChars.split(" ").length < 10) {
      //   updatedIncomingChars += " " + generate();
      // }
      setIncomingChars(updatedIncomingChars);
    }

    let greenBox = document.querySelector(".incomingContainer");

    let cursorBox = document.querySelector("#cursor");
    let cbOffset = cursorBox.offsetTop; //32
    let lastOffset = 32; //32
    let scrollBy = 0;
    // if (cbOffset > lastOffset) {
    //   let scrollAm = cbOffset - lastOffset;
    //   scrollBy += scrollAm;
    //   lastOffset += scrollAm;
    //   greenBox.scrollTop = scrollBy;
    // }

    function scrollBy1Line(refEl, parentEl) {
      let currentOffset = refEl.offsetTop;
      if (currentOffset > lastOffset) {
        let scrollAmount = currentOffset - lastOffset;
        scrollBy += scrollAmount;
        lastOffset += scrollBy;
        parentEl.scrollTop = scrollBy;
      }
    }
    scrollBy1Line(cursorBox, greenBox);
  });

  return (
    <div className="App">
      {/* <ScriptContainer />
       */}
      {/* <p>{outgoingChars}</p> */}

      <div className="container">
        {/* <div className='outgoingContainer'>
          <p className='outgoing'>
            {outgoingChars.slice(outgoingChars - 2)}
          </p>
        </div> */}
        <div className="incomingContainer">
          <p className="Character">
            <span className="Character-out">{outgoingChars}</span>
            <span className="Character-current" id="cursor">
              {currentChar}
            </span>
            <span>{incomingChars}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
