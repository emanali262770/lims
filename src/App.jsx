import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login/Login'
import Layout from './Components/Layout'

import Users from './pages/adminPages/Users'
import Home from './pages/Home'
import Previlage from './pages/adminPages/Previlage'
import Roles from './pages/adminPages/Roles'
import ReferenceType from './pages/adminPages/RefrenceType'
import UserRight from './pages/adminPages/UserRight'
import SpecimanSetup from './pages/TestSetup/SpecimanSetup'
import LabDepartment from './pages/TestSetup/LabDepartment'
import SubDepartment from './pages/TestSetup/SubDepartment'
import TestHead from './pages/TestSetup/TestHead'
import Specimens from './pages/TestSetup/Specimens'

const App = () => {
  return (
    <div>
      <Routes>
        {/* All pages that should have Navbar + Footer */}
        <Route path="/" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/privileges" element={<Previlage />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/reference-types" element={<ReferenceType />} />
          <Route path="/user-rights-report" element={<UserRight />} />
          <Route path="/specimen-category" element={<SpecimanSetup />} />
          <Route path="/lab-department" element={<LabDepartment />} />
          <Route path="/sub-department" element={<SubDepartment />} />
          <Route path="/test-head" element={<TestHead />} />
          <Route path="/specimens" element={<Specimens />} />

        </Route>

        {/* If you have pages WITHOUT navbar/footer, put them outside */}
        {/* <Route path="/admin" element={<AdminLogin />} /> */}
      </Routes>
    </div>
  )
}

export default App