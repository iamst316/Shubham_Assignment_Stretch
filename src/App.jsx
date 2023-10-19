import './App.css'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Profiles from './components/Profiles';
import Login from './components/Login';
import Register from './components/Register';
import Edit from './components/Edit'
import Protected from './components/Protected'
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Profiles />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/edit' element={<Protected Component={Edit} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
