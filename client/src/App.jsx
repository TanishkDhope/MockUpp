import './App.css'
import {Routes, Route} from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import HomePage from './pages/HomePage'

function App() {

  return (
    <Routes>
     <Route path="/" element={<HomePage />} />
     <Route path="/login" element={<Login />} />
     <Route path="/signup" element={<SignUp />} />
    </Routes>
  )
}

export default App
