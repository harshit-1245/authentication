import React from 'react'
import './App.css';
import {ChakraProvider} from "@chakra-ui/react"
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import HomePage from './components/homepage/HomePage'
import Login from './components/login/Login'
import Register from './components/register/Register'

function App() {
  return (
    <ChakraProvider>
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
      </Routes>
      </BrowserRouter>
       
    </div>
    </ChakraProvider>
  );
}

export default App;
