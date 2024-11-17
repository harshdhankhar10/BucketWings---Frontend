import React, {useState, useEffect} from 'react'
import Routes from './pages/Routes'
import "./App.css"
import axios from 'axios'

const App = () => {
  useEffect(()=>{
    const fetchVisitor = async () => {
      try {
        const userAgent = navigator.userAgent;
        const ipAddress = await axios.get("https://api.ipify.org?format=json");

        await axios.post(`${import.meta.env.VITE_REACT_APP_API}/api/v1/visitor/log-visitor`, {
          ipAddress: ipAddress.data.ip,
          userAgent: userAgent
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchVisitor()

  },[])
  return (
    <>
     <div >
     <Routes />
     </div>
    </>
  )
}

export default App;