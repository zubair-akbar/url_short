import { useState } from 'react'

const App = () => {

  const [originalURL, setOriginalURL] = useState('')
  const [customURL, setCustomURL] = useState('')
  const [load, setLoad] = useState(false);
  const [shortUrl, setShortUrl] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setOriginalURL(e.target.originalUrl.value)
    setCustomURL(e.target.customUrl.value)
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
      <h1>URL Shortener</h1>
          <form onSubmit={handleSubmit}>
            <label>Enter your original URL here:</label>
            <input type='text' name="originalUrl"></input>
            <br/>
            <label>Or try your own custom shortened URL </label>
            <input type='text' name='customUrl'></input>
            <br/>
            <button type="submit">Submit</button>
          </form>

    </div>
  )
}

export default App
