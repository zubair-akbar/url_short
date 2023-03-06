import { useState } from 'react'

const App = () => {

  const [originalURL, setOriginalURL] = useState('')
  const [customURL, setCustomURL] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setOriginalURL(e.target.originalUrl.value)
    setCustomURL(e.target.customUrl.value)
  }
  console.log(originalURL);
  return (
    <div>
      <h1>URL Shortner</h1>
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
