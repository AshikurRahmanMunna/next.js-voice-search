import { useState } from "react"
import startLottie from '../assets/lottie/start.json';
import errorLottie from '../assets/lottie/error.json';
import doneLottie from '../assets/lottie/done.json';
import Lottie from "lottie-react";

export default function Home() {
  const [value, setValue] = useState('');
  const [lang, setLang] = useState('en-us');
  const [error, setError] = useState(false);
  const [done, setDone] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const handleSpeech = () => {
    setDone(false);
    setError(false);
    setSpeaking(false);
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = lang;
    recognition.addEventListener('start', () => {
      setError(false);
      setSpeaking(true);
      setDone(false);
    })
    recognition.addEventListener('error', () => {
      setDone(false);
      setError(true);
      setSpeaking(false);
    })
    recognition.addEventListener('result', (e) => {
      const result = Array.from(e.results).map(r => r[0]).map(r => r.transcript);
      setDone(true);
      setError(false);
      setSpeaking(false);
      setValue(result);
      setTimeout(() => {
        location.href = `https://www.google.com/search?q=${result[0].split(" ").join('+')}`
      }, 1500);
    })
    recognition.start();
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    location.href = `https://www.google.com/search?q=${e.target.text.value.split(" ").join('+')}`
  }
  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input value={value} name="text" onChange={(e) => setValue(e.target.value)} />
        <br />
        <button type="button" onClick={handleSpeech}>Start</button>
        <button type="submit">Submit</button>
        <br />
        <select onChange={(e) => setLang(e.target.value)}>
          <option value="en-us">English</option>
          <option value="bn">Bangla</option>
          <option value="hi">Hindi</option>
        </select>
      </form>
      {
        speaking && <Lottie style={{ height: '200px', width: '200px' }} animationData={startLottie} loop={true} />
      }
      {
        error && <Lottie style={{ height: '200px', width: '200px' }} animationData={errorLottie} loop={false} />
      }
      {
        done && <Lottie style={{ height: '200px', width: '200px' }} animationData={doneLottie} loop={false} />
      }
    </div>
  )
}
