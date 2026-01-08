import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login/Login'
import Layout from './Components/Layout'
import Home from './pages/adminPages/Home'
import Users from './pages/adminPages/Users'

const App = () => {
  return (
    <div>
       <Routes>
      {/* All pages that should have Navbar + Footer */}
        <Route path="/" element={<Login />} />
      <Route element={<Layout />}>
       <Route path="/home" element={<Home />} />
       <Route path="/users" element={<Users />} />
      
      </Route>

      {/* If you have pages WITHOUT navbar/footer, put them outside */}
      {/* <Route path="/admin" element={<AdminLogin />} /> */}
    </Routes>
    </div>
  )
}

export default App