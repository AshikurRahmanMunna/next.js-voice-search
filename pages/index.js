import { useEffect, useState } from "react"
import startLottie from '../assets/lottie/start.json';
import errorLottie from '../assets/lottie/error.json';
import doneLottie from '../assets/lottie/done.json';
import microphone from '../assets/lottie/69198-microphone.json';
import Lottie from "lottie-react";

export default function Home() {
  const [value, setValue] = useState('');
  const [lang, setLang] = useState('en-us');
  const [error, setError] = useState(false);
  const [done, setDone] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [typing, setTyping] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [placeholder, setPlaceholder] = useState('Search');

  const handleSpeech = () => {
    setDone(false);
    setError(false);
    setSpeaking(false);
    setTyping(false);
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = lang;
    recognition.addEventListener('start', () => {
      setError(false);
      setSpeaking(true);
      setDone(false);
      setDisabled(true);
    })
    recognition.addEventListener('error', () => {
      setDone(false);
      setError(true);
      setSpeaking(false);
      setDisabled(false);
    })
    recognition.addEventListener('result', (e) => {
      const result = Array.from(e.results).map(r => r[0]).map(r => r.transcript);
      setDone(true);
      setError(false);
      setSpeaking(false);
      setValue(result);
      setDisabled(true);
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
  useEffect(() => {
    if (lang === 'bn' && speaking) {
      setPlaceholder('এখন কথা বলুন');
    }
    else if (lang === 'en-us' && speaking) {
      setPlaceholder('Speak Now');
    }
    else if (lang === 'hi' && speaking) {
      setPlaceholder('अब बोलो');
    }
    else if (error) {
      setPlaceholder("Didn't Catch That, Please Try Again");
    }
    else {
      setPlaceholder('Search')
    }
  }, [lang, speaking, error]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div>
        <form onSubmit={handleFormSubmit} className="flex items-center">
          <label htmlFor="simple-search" className="sr-only">Search</label>
          <div className="relative w-full">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              {
                typing
                &&
                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
              }
              {
                speaking && <Lottie style={{ height: '40px', width: '40px' }} animationData={startLottie} className="ml-[-10px]" loop={true} />
              }
              {
                error && <Lottie style={{ height: '40px', width: '40px' }} animationData={errorLottie} className="ml-[-10px]" loop={false} />
              }
              {
                done && <Lottie style={{ height: '40px', width: '40px' }} animationData={doneLottie} className="ml-[-10px]" loop={false} />
              }
            </div>
            <div className="flex items-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 lg:w-[50vw] md:w-[70vw] sm:w-[70vw] w-[60vw] pl-10 pt-0 pb-0  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <input value={value} onChange={(e) => {
                setValue(e.target.value);
                setTyping(true);
                setSpeaking(false);
                setError(false);
                setDone(false);
              }}
                type="text" style={{ fontSize: '18px' }} disabled={disabled} id="text" className="w-full bg-transparent focus:border-none focus:outline-none h-full" placeholder={placeholder} required />
              <Lottie onClick={handleSpeech} style={{ height: '40px', width: '40px', marginRight: '10px', cursor: 'pointer' }} animationData={microphone} loop={true} />
            </div>
          </div>
          <button type="submit" className="p-2.5 ml-2 text-sm font-medium text-white bg-[#36B0C9] rounded-lg border hover:bg-[#2dc5e4] focus:ring-4 focus:outline-none focus:ring-[#60d5ec] dark:bg-[#36B0C9] dark:hover:bg-[#2dc5e4] dark:focus:ring-[#60d5ec]">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            <span className="sr-only">Search</span>
          </button>
          <select className="ml-3 h-[42px] bg-[#36B0C9] font-bold text-white rounded-md" disabled={speaking && true} onChange={(e) => setLang(e.target.value)}>
            <option value="en-us">English</option>
            <option value="bn">Bangla</option>
            <option value="hi">Hindi</option>
          </select>
        </form>
        <div className="">

        </div>
      </div>
    </div>
  )
}
