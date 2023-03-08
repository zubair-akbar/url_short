import { useState } from 'react'

const App = () => {

  const [originalUrl, setOriginalUrl] = useState('')
  const [customURL, setCustomURL] = useState('')
  const [loadState, setLoadState] = useState(false);
  const [shortUrl, setShortUrl] = useState('')
  const [errorState, setErrorState] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setOriginalUrl(e.target.originalUrl.value)
    setCustomURL(e.target.customUrl.value)

    try {
      const urlPattern = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i;
      if (!urlPattern.test(originalUrl)) {
        throw new Error('Invalid URL');
      }
    } catch (error) {
      setErrorState(error.message);
    }
    setLoadState(true)
    shortUrlHash()
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
    <div>
      <h1>LinkDwarf</h1>
          <form onSubmit={handleSubmit}>
            <label>Enter your original URL here:</label>
            <input type='text' name="originalUrl"></input>
            <br/>
            <label>Or try your own custom shortened URL </label>
            <input type='text' name='customUrl'></input>
            <br/>
            <button type="submit">Submit</button>
          </form>
          {errorState && (
            <div className="error">{errorState}</div>
          )}
          {loadState && !errorState &&
            <div>Your custom URL is <a href={window.location.origin + '/' +shortUrl}>{window.location.origin + '/' +shortUrl}!</a></div>
          }
    </div>
  )
}

export default App
