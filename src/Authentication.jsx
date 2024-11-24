import React from 'react'
import NavBar from './components/NavBar/NavBar'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Auth/Dashboard/Dashboard'
import Complain from './pages/Auth/Complain/Complain'
import TransportCards from './pages/Auth/TransportCards/TransportCards'
import BusOrder from './pages/Auth/BusOrder/BusOrder'
import Views from './pages/Auth/Views/Views'

function Authentication({ setToken }) {
  return (
    <div className='flex'>
      <NavBar/>
      <div className='w-[80%] h-[100vh]'>
        <Routes>
          <Route path='/' element={<Dashboard setToken={setToken} />}/>
          <Route path='/complain' element={<Complain />}/>
          <Route path='/views' element={<Views/>}/>
          <Route path='/transport-cards' element={<TransportCards/>}/>
          <Route path='/bus-order' element={<BusOrder/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default Authentication