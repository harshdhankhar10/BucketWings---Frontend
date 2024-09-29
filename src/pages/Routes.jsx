import React from 'react'
import {Routes, Route} from 'react-router-dom'

import LoginPage from './Auth/LoginPage'
import RegisterPage from './Auth/RegisterPage'
import Homepage from "./Homepage"
import MyProfile from './MyProfile'

const RoutesPath = () => {
  return (
      <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/user/:username" element={<MyProfile />} />



      </Routes>

      </>
  )
}

export default RoutesPath