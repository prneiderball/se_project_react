import './App.css'
import Header from './Header.jsx'
import Main from './Main.jsx'
import Footer from './Footer.jsx'
import {useState} from 'react'

function App() {
  const [weatherData, setWeatherData] = useState({ type: "hot" });

  return (
    <div className='app'>
      <div className='app__content'>
        <Header />
        <Main weatherData={weatherData} />
        <Footer />
      </div>
    </div>
  )
}
export default App
