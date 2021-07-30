import { useState } from 'react';
import faker from 'faker';
import ScriptContainer from './script-container/ScriptContainer';
import useKeyPress from './hooks/useKeyPress';
import './App.css';

function App() {
  window.addEventListener('keydown', function (e) {
    if (e.keyCode == 32 && e.target == document.body) {
      e.preventDefault();
    }
  });

  // states
  const par = faker.lorem.paragraph();

  const [leftPadding, setLeftPadding] = useState(
    new Array(20).fill(' ').join('')
  );
  const [outgoingChars, setOutgoingChars] = useState('');
  const [currentChar, setCurrentChar] = useState(
    par.charAt(0)
  );
  const [incomingChars, setIncomingChars] = useState(
    par.substr(1)
  );

  const [currentLine, setCurrentLine] = useState(0);

  function generate() {
    return faker.lorem.paragraph();
  }

  // keypress
  useKeyPress((key) => {
    //1
    let updatedOutgoingChars = outgoingChars;
    let updatedIncomingChars = incomingChars;

    //2
    if (key === currentChar) {
      //3
      if (leftPadding.length > 0) {
        setLeftPadding(leftPadding.substring(1));
      }
      //4
      updatedOutgoingChars += currentChar;
      setOutgoingChars(updatedOutgoingChars);

      //5
      setCurrentChar(incomingChars.charAt(0));

      //6
      updatedIncomingChars = incomingChars.substring(1);
      if (updatedIncomingChars.split(' ').length < 10) {
        updatedIncomingChars += ' ' + generate();
      }
      setIncomingChars(updatedIncomingChars);
    }

    let parEl = document.querySelector('.Character');
    let pHeight = parEl.clientHeight;

    let greenBox = document.querySelector(
      '.incomingContainer'
    );
    let gbScrollPos = greenBox.scrollTop;
    console.log(gbScrollPos);
    let cursorBox = document.querySelector('#cursor');
    let cbOffset = cursorBox.offsetTop; //32
    let lastOffset = 32; //32
    let scrollBy = 0;
    if (cbOffset > lastOffset) {
      let scrollAm = cbOffset - lastOffset;
      scrollBy += scrollAm;
      lastOffset += scrollAm;
      greenBox.scrollTop = scrollBy;
    }
    console.log(cbOffset);
    // let scrollBy =
  });

  return (
    <div className='App'>
      {/* <ScriptContainer />
       */}
      {/* <p>{outgoingChars}</p> */}

      <div className='container'>
        {/* <div className='outgoingContainer'>
          <p className='outgoing'>
            {outgoingChars.slice(outgoingChars - 2)}
          </p>
        </div> */}
        <div className='incomingContainer'>
          <p
            className='Character'
            style={{ top: currentLine + 'ch' }}
          >
            <span className='Character-out'>
              {outgoingChars}
            </span>
            <span className='Character-current' id='cursor'>
              {currentChar}
            </span>
            <span>{incomingChars.substr(0)}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
