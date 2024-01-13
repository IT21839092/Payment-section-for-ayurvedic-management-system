import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom'

//components and pages
import AdminManage from './pages/AdminManage'
import PayOnline from './components/PayOnline'
import Navbar from './components/Navbar'
import Report from './pages/Report'

function App(){
  return(
    <div className='App'>
      <BrowserRouter>
      <Navbar/>
        <div className='pages'>
          <Routes>
            <Route
              path='/'
              element={<AdminManage/>}
            />
            <Route
              path='/add'
              element={<PayOnline/>}
            />
            <Route 
            path="/report" 
            element={<Report />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App