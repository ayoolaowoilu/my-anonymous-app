
import './style.css'
import Login from "./components/login"
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Auth from './components/auth'
import Home from './components/home'
import Quer from './components/query'

function App() {


  return (
  <BrowserRouter>
   <Routes>
    <Route path='/query/:name' element={<Quer />} ></Route>
     <Route path='/login' element={<Login />}></Route>
     <Route element={<Auth />}>
      <Route path='/home' element={<Home />} ></Route>
     </Route>
   </Routes>
  </BrowserRouter>
  )
}

export default App
