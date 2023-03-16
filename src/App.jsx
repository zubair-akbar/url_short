import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Nav } from './Components/Navbar'
import { SocialShare } from './Components/SocialShare'
import { AppFooter } from './Components/AppFooter'

const App = () => {

  const [originalUrl, setOriginalUrl] = useState('');
  const [customURL, setCustomURL] = useState('');
  const [loadState, setLoadState] = useState(false);
  const [shortUrl, setShortUrl] = useState('');
  const [errorState, setErrorState] = useState('');
  const [buttonText, setButtonText] = useState('Copy');
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [theme, setTheme] = useState('default');


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
        //Replace with fetchShortUrl()
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

  const toggleTheme = () => {
    setTheme(theme === 'default' ? 'night' : 'default');
  };

  const shortUrlHash = () => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let shortUrl = '';
      for (let i = 0; i < 6; i++) {
        shortUrl += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      setShortUrl(shortUrl);
  };

  //Pending route setup in server/index.js
  const fetchShortUrl = async () => {
    try {
      const response = await fetch("http://localhost:3001/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          originalUrl,
          customURL
        })
      });

      if (response.ok) {
        const { shortUrl } = await response.json();
        setShortUrl(shortUrl);
        setLoadState(true);
        setErrorState('');
      } else {
        throw new Error('Failed to generate short URL');
      }
    } catch (error) {
      setErrorState(error.message);
    }
  }

  useEffect(() => {
    if (customURL) {
      setShortUrl(customURL);
    } else {
      setShortUrl(shortUrlHash());
    }
  }, [customURL]);

  return (
    <AppWrapper
      data-theme={theme === 'night' ? 'night' : 'default'}>
    <GlobalStyle />
    <Nav
      theme={theme}
    />
    <AppHead>
      <ToggleThemeButton
        onClick={toggleTheme}>
          {theme === 'default' ? 'Night Mode' : 'Default Mode'}
      </ToggleThemeButton>
      <h1>Link<span style={{ fontSize: '0.4em', fontStyle: "oblique" }}>Dwarf</span></h1>
      <p>Effortlessly shorten your URLs. Craft custom, memorable links or generate random hashes in an instant. Share your links seamlessly.<br/>Give it a try now!</p>
    </AppHead>
      <AppBody>
        <StyledForm onSubmit={handleSubmit}>
          <label>Enter your original URL here:</label>
          <Input type='text' name="originalUrlElement"></Input>
          <MoreOptionsButton
            type='button'
            onClick={handleToggleMoreOptions}>
              {showMoreOptions ? 'Less Options' : 'More Options'}
          </MoreOptionsButton>
            <br/>
          {showMoreOptions && (
            <React.Fragment>
            <label>Try your own custom (+6 character) parameters! </label>
            <Input type='text' name='customUrlElement'></Input>
            </React.Fragment>
          )}
            <br/>
          <Button type="submit">Submit</Button>
        </StyledForm>
        {errorState && (
          <ErrorDiv className="error">{errorState}</ErrorDiv>
        )}
        {loadState && !errorState &&
          <div style={{fontWeight: 'bold'}}>Your custom URL is <a href={'linkdwarf/' +shortUrl}>{'linkdwarf/' +shortUrl} </a>
          <MoreOptionsButton onClick={handleCopy}>{buttonText}</MoreOptionsButton><br/>
          ✧♡(◕‿◕✿)
          <SocialShare url={`linkdwarf/${shortUrl}`} />
          </div>
        }
        </AppBody>
        <AppFooter/>
    </AppWrapper>
  )
};

const GlobalStyle = createGlobalStyle`
  :root {
    --background-color: #76826d;
    --gradient-start: #AABA9E;
    --gradient-end: #76826d;
    --button-gradient-start: #926444;
    --button-gradient-end: #c48f60;
    --button-hover: #939e8a;
    --text-color: #46351D;
    --nav-bg-color: white;
    --nav-link-color: #46351D;
    --nav-link-hover-color: #58ACFA;
  }

  [data-theme="night"] {
    --background-color: #243447;
    --gradient-start: #435A6F;
    --gradient-end: #243447;
    --button-gradient-start: #576B86;
    --button-gradient-end: #778DA3;
    --button-hover: #4e5a68;
    --text-color: #E6E6E6;
    --nav-bg-color: #1f2f3d;
    --nav-link-color: #E6E6E6;
    --nav-link-hover-color: #58ACFA;
  }

  body {
    font-family: 'Montserrat', sans-serif;
    margin: 0;
    padding: 0;
  }
  `;

const AppWrapper = styled.div`
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
  color: var(--text-color);
  background-color: var(--background-color);
  height: 100vh;
  //border-color: orange;
`;

const AppHead = styled.div`
  background: linear-gradient(to bottom, var(--gradient-start), var(--gradient-end));
  //flex-shrink: 0; /* don't shrink */
  width: 100%;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);

  h1 {
    font-size: 75px;
    margin-bottom: 1px;
    color: var(--text-color);
  }

  p {
    margin-top: 1px;
  }

`

const AppBody = styled.div`
  background-color: #76826d;
  //flex-shrink: 1; /* don't shrink */;
  margin-top: 100px;
`;

const Button = styled.button`
  font-family: 'Montserrat', sans-serif;
  padding: 6px 14px;
  border-radius: 6px;
  border: none;
  background: linear-gradient(to bottom, var(--button-gradient-start), var(--button-gradient-end));
  margin: 5px;
  color: #DFDEDF;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
    cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: var(--button-hover);
  }
  &:focus {
    box-shadow: inset 0px 0.8px 0px -0.25px rgba(255, 255, 255, 0.2), 0px 0.5px 1px rgba(0, 0, 0, 0.1), 0px 0px 0px 3.5px rgba(58, 108, 217, 0.5);
    outline: 0;
  }

  /* &:hover {
    background: linear-gradient(to bottom, #885944, #6f463a);
  } */

  &:focus {
    box-shadow: inset 0px 0.8px 0px -0.25px rgba(255, 255, 255, 0.2), 0px 0.5px 1px rgba(0, 0, 0, 0.1), 0px 0px 0px 3.5px rgba(58, 108, 217, 0.5);
    outline: 0;
  }
`;

const StyledForm = styled.form`
  font-family: 'Montserrat', sans-serif;
  background-color: var(--background-color);
`

const MoreOptionsButton = styled.button`
  font-family: 'Montserrat', sans-serif;
  padding: 10px;
  margin: 10px;
  background: var(--button-hover);
  border: none;
  border-radius: 10px;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: var(--button-hover);
  }
  &:focus {
    box-shadow: inset 0px 0.8px 0px -0.25px rgba(255, 255, 255, 0.2), 0px 0.5px 1px rgba(0, 0, 0, 0.1), 0px 0px 0px 3.5px rgba(58, 108, 217, 0.5);
    outline: 0;
  }
`;


const Input = styled.input`
  font-family: 'Montserrat', sans-serif;
  background: #ecf0f3;
  padding: 9px;
  margin: 5px;
  height: 5px;
  font-size: 14px;
  border-radius: 60px;
`;

const ToggleThemeButton = styled.button`
  font-family: 'Montserrat', sans-serif;
  position: absolute;
  top: 25px;
  right: 10px;
  padding: 10px;
  margin: 10px;
  background: var(--button-hover);
  border: none;
  border-radius: 10px;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: var(--button-hover);
  }
  &:focus {
    box-shadow: inset 0px 0.8px 0px -0.25px rgba(255, 255, 255, 0.2), 0px 0.5px 1px rgba(0, 0, 0, 0.1), 0px 0px 0px 3.5px rgba(58, 108, 217, 0.5);
    outline: 0;
  }
`;

const ErrorDiv = styled.div`
  background-color: var(--background-color);
`;

export default App;
