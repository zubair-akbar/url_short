import { useState, useEffect } from 'react'
import styled, { createGlobalStyle } from 'styled-components'

const App = () => {

  const [originalUrl, setOriginalUrl] = useState('')
  const [customURL, setCustomURL] = useState('')
  const [loadState, setLoadState] = useState(false);
  const [shortUrl, setShortUrl] = useState('')
  const [errorState, setErrorState] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setOriginalUrl(e.target.originalUrlElement.value)
    setCustomURL(e.target.customUrlElement.value)

    try {
      const urlPattern = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
      if (!urlPattern.test(e.target.originalUrlElement.value)) {
        throw new Error("Oops, that link didn't work. Did you try starting from 'www.....'?");
      } else {
        setErrorState('')
        setLoadState(true)
        shortUrlHash()
      }
    } catch (error) {
      setErrorState(error.message);
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl)
    .then(() => {
      alert(`Copied to clipboard: linkdwarf/${shortUrl}`);
    })
    .catch((error) => {
      console.error(`Failed to copy: ${error}`);
    });
  }

  const shortUrlHash = () => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let shortUrl = '';
      for (let i = 0; i < 6; i++) {
        shortUrl += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      setShortUrl(shortUrl)
  }

  return (
    <AppWrapper>
    <GlobalStyle />
      <h1>LinkDwarf</h1>
          <form onSubmit={handleSubmit}>
            <label>Enter your original URL here:</label>
            <input type='text' name="originalUrlElement"></input>
            <br/>
            <label>Or try your own custom shortened URL </label>
            <input type='text' name='customUrlElement'></input>
            <br/>
            <Button type="submit">Submit</Button>
          </form>
          {errorState && (
            <div className="error">{errorState}</div>
          )}
          {loadState && !errorState &&
            <div>Your custom URL is <a href={'linkdwarf/' +shortUrl}>{'linkdwarf/' +shortUrl} </a>
            <Button onClick={handleCopy}>Copy</Button><br/>
            ✧♡(◕‿◕✿)
            </div>
          }
    </AppWrapper>
  )
}

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
  gap: 50px;
  text-align: center;
  border: solid;
  //border-color: orange;
  margin: auto;
  padding-bottom: 20px;
  color: #46351D;
  background-color: #AABA9E;
  height: 100vh;
`;

const Button = styled.button`
  padding: 6px 14px;
  border-radius: 6px;
  border: none;
  background: #6E6D70;
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





export default App
