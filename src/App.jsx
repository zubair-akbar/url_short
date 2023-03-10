import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Nav } from './Components/Navbar'

const App = () => {

  const [originalUrl, setOriginalUrl] = useState('');
  const [customURL, setCustomURL] = useState('');
  const [loadState, setLoadState] = useState(false);
  const [shortUrl, setShortUrl] = useState('');
  const [errorState, setErrorState] = useState('');
  const [buttonText, setButtonText] = useState('Copy');
  const [showMoreOptions, setShowMoreOptions] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setOriginalUrl(e.target.originalUrlElement.value)
    if (e.target.customUrlElement && e.target.customUrlElement.value) {
      setCustomURL(e.target.customUrlElement.value);
    }

    try {
      const urlPattern = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
      if (!urlPattern.test(e.target.originalUrlElement.value)) {
        throw new Error("Oops, that link didn't work. Did you try starting from 'www.....'?");
      } else {
        setErrorState('')
        setLoadState(true)
        customURL ? setShortUrl(customURL) : shortUrlHash()
      }
    } catch (error) {
      setErrorState(error.message);
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(`linkdwarf/${shortUrl}`)
    .then(() => {
      setButtonText('Copied!');
    })
    .catch((error) => {
      console.error(`Failed to copy: ${error}`);
    });
  }

  const handleToggleMoreOptions = () => {
    try {
      setShowMoreOptions(!showMoreOptions);
    } catch (error) {
      console.error(error);
    }
  }

  const shortUrlHash = () => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let shortUrl = '';
      for (let i = 0; i < 6; i++) {
        shortUrl += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      setShortUrl(shortUrl);
  };

  useEffect(() => {
    if (customURL) {
      setShortUrl(customURL);
    } else {
      setShortUrl(shortUrlHash());
    }
  }, [customURL]);

  return (
    <AppWrapper>
    <GlobalStyle />
    <Nav/>
    <AppHead>
      <h1>LinkDwarf</h1>
      <p>The quick and easy way to shorten your URLs. Create custom, memorable links or generate random hashes with just a few clicks. Share your links easily and efficiently! <br/>Try it now!</p>
      </AppHead>
      <AppBody>
        <form onSubmit={handleSubmit}>
          <label>Enter your original URL here:</label>
          <Input type='text' name="originalUrlElement"></Input>
          <Button type='button' onClick={handleToggleMoreOptions}>{showMoreOptions ? 'Less Options' : 'More Options'}</Button>
          <br/>
          {showMoreOptions && (
            <React.Fragment>
            <label>Try your own custom (+6 character) parameters! </label>
            <Input type='text' name='customUrlElement'></Input>
            </React.Fragment>
          )}
          <br/>
          <Button type="submit">Submit</Button>
        </form>
        {errorState && (
          <div className="error">{errorState}</div>
        )}
        {loadState && !errorState &&
          <div>Your custom URL is <a href={'linkdwarf/' +shortUrl}>{'linkdwarf/' +shortUrl} </a>
          <Button onClick={handleCopy}>{buttonText}</Button><br/>
          ✧♡(◕‿◕✿)
          </div>
        }
        </AppBody>
    </AppWrapper>
  )
};

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Alegreya', serif;
    font-family: 'Montserrat', sans-serif;
  }
  `;

const AppWrapper = styled.div`
  font-family: 'Montserrat', sans-serif;
  display: flex;
  flex-flow: column wrap;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  //gap: 10px;
  text-align: center;
  border: solid;
  //margin: auto;
  padding-bottom: 20px;
  color: #46351D;
  background-color: #76826d;
  height: 100vh;
  //border-color: orange;
`;

const AppHead = styled.div`
  background: linear-gradient(to bottom, #AABA9E, #76826d);
  //flex-shrink: 0; /* don't shrink */
  width: 100%;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
`

const AppBody = styled.div`
  background-color: #76826d;
  //flex-shrink: 1; /* don't shrink */;
  margin-top: 100px;
`;

const Button = styled.button`
  padding: 6px 14px;
  border-radius: 6px;
  border: none;
  background: #6E6D70;
  margin: 5px;
  box-shadow: 0px 0.5px 1px rgba(0, 0, 0, 0.1), inset 0px 0.5px 0.5px rgba(255, 255, 255, 0.5), 0px 0px 0px 0.5px rgba(0, 0, 0, 0.12);
  color: #DFDEDF;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
&:focus {
  box-shadow: inset 0px 0.8px 0px -0.25px rgba(255, 255, 255, 0.2), 0px 0.5px 1px rgba(0, 0, 0, 0.1), 0px 0px 0px 3.5px rgba(58, 108, 217, 0.5);
  outline: 0;
}
`;

const Input = styled.input`
  background: #ecf0f3;
  padding: 9px;
  margin: 5px;
  height: 5px;
  font-size: 14px;
  border-radius: 60px;
`;

export default App;
