import './App.css'
import React, {useContext, useEffect, useState} from "react"
import { UserContext } from './context/UserContext.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { PageLogin, PageRegister} from './components/pages/Pages.jsx'

const App = () => {
  const [message, setMessage] = useState("")

  const [userData] = useContext(UserContext)
  const current_theme = localStorage.getItem('current_theme')
    
  const [theme, setTheme] = useState(current_theme? current_theme: 'light')

    useEffect(()=>{
        localStorage.setItem('current_theme', theme)
    }, [theme])

  // const getWelcomeMessage = async () => {
  //   const requestOptions = {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   }
  //   const response = await fetch("/api", requestOptions)
  //   const data = await response.json()

  //   if (!response.ok) {
  //     console.log("something messed up")
  //   } else {
  //     setMessage(data.message)
  //   }
  //   console.log(data)
  // }

  // useEffect(() => {
  //   getWelcomeMessage()
  // }, [])
  
  return (
    <BrowserRouter>
        <Routes>
              <Route path="/" element={<PageLogin theme={theme} setTheme={setTheme}/>} />
              <Route path="register" element={<PageRegister theme={theme} setTheme={setTheme}/>} />
              {/* <Route path="home" element={<PageHome theme={theme} setTheme={setTheme}/>} />
              <Route path="account" element={<PageAccount theme={theme} setTheme={setTheme}/>} />
              <Route path="map" element={<PageMap theme={theme} setTheme={setTheme}/>} />
              <Route path="favourite" element={<PageFavourite theme={theme} setTheme={setTheme}/>} />
              <Route path="routes" element={<PageRoute theme={theme} setTheme={setTheme}/>} /> */}
        </Routes>
      </BrowserRouter>
  )
}

export default App
