import React, { useState, useRef } from 'react';
import './App.css';
import Teddy from './img/cat-0.gif';
import Cat1 from './img/cat-1.gif';
import Cat2 from './img/cat-2.gif';
import Cat3 from './img/cat-3.gif';
import Cat4 from './img/cat-4.gif';
import Cat5 from './img/cat-5.gif';
import YesCat from './img/cat-yes.gif';
import emailjs from 'emailjs-com';

const serviceId = process.env.REACT_APP_SERVICE_ID;
  const templateID = process.env.REACT_APP_TEMPLATE_ID;
  const publicKey = process.env.REACT_APP_PUBLIC_KEY;
  const gfName = process.env.REACT_APP_NAME;
const MAX_IMAGES = 5;

const App = () => {
  
  const [play, setPlay] = useState(true);
  const [noCount, setNoCount] = useState(0);
  // const [yesCount, setYesCount] = useState(0);
  let yesCount = 0;
  const [title, setTitle] = useState(`${gfName} Will You Be My Girlfriend?`)
  const ImgData = [Teddy, Cat1, Cat2, Cat3, Cat4, Cat5, YesCat];
 
  const [catImage, setCatImage] = useState(ImgData[noCount]);

  const handleYesClick = () => {
    // setYesCount(1);
    yesCount += 1;
    updateStateAndImage(6);
    setTitle("Yay!! I Love You Cupcake \u{1F48B}");
    yesButtonRef.current.style.display = 'none'; // Hide "Yes" button after clicking
    noButtonRef.current.style.display = 'none'; // Hide "Yes" button after clicking
    
    sendEmail();
  };

  const handleNoClick = () => {
  if (play) {
    const newCount = Math.min(noCount + 1, MAX_IMAGES);
    console.log(newCount);
    setNoCount(newCount);
    updateStateAndImage(newCount);
    updateNoButtonText(newCount); // Add this line to update "No" button text
    
    }
};

  const updateStateAndImage = (imageIndex) => {
    // setTitle(newTitle);
    // setButtonsHidden(hideButtons);
    resizeYesButton();
    updateNoButtonText(imageIndex);
    ChangeImage(imageIndex);
    console.log(imageIndex);
    if (imageIndex === MAX_IMAGES) {
      setPlay(false);
      sendEmail();
      hideNoButton(); // Call the function to hide the "No" button after the last image
    }
  };

  const resizeYesButton = () => {
    const fontSize = parseFloat(window.getComputedStyle(yesButtonRef.current).fontSize);
    yesButtonRef.current.style.fontSize = `${fontSize * 1.6}px`;
  };

  const generateMessage = (count) => {
    const messages = [
      "Are you sure?",
      "Cupcake please",
      "Don't do this to me baby :(",
      "You're breaking my heart",
      "I'm gonna cry...",
    ];

    return messages[Math.min(count, messages.length - 1)];
  };

  const updateNoButtonText = (count) => {
    noButtonRef.current.innerHTML = generateMessage(count);
  };

  const ChangeImage = (imageIndex) => {
    setCatImage(ImgData[imageIndex]);
    // setButtonsHidden(imageIndex === MAX_IMAGES); // Hide only the "No" button after the last image
  };
const hideNoButton = () => {
  noButtonRef.current.style.display = 'none'; // Hide "No" button after reaching the last image
};
  // const [buttonsHidden, setButtonsHidden] = useState(false);

  const yesButtonRef = useRef();
  const noButtonRef = useRef();
  
  const sendEmail = () => {
    emailjs
      .send({serviceId},{templateID}, {
        yesCount,
        noCount,
        // other variables you might need in your template
      }, {publicKey})
      .then((response) => {
        console.log('Email sent:', response);
      })
      .catch((error) => {
        console.error('Email error:', error);
      });
  };

  return (
    <main className="container">
      <img className="cat-img" src={catImage} />
      <p className="title">{title}</p>
      <div>
        <button type="button" className="btn btn--yes" onClick={handleYesClick} ref={yesButtonRef}>
          Yes
        </button>
        <button type="button" className="btn btn--no" onClick={handleNoClick} ref={noButtonRef}>
          No
        </button>
      </div>
    </main>
  );
};

export default App;
