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
            <button type="submit">Submit</button>
          </form>
          {errorState && (
            <div className="error">{errorState}</div>
          )}
          {loadState && !errorState &&
            <div>Your custom URL is <a href={'linkdwarf/' +shortUrl}>{'linkdwarf/' +shortUrl}</a><br/>✧♡(◕‿◕✿)</div>
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



export default App
