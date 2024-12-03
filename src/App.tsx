import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Liquidity from './pages/Liquidity'
import Profile from './pages/Profile'
import Login from './pages/Login'
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <BrowserRouter>
        <Layout>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/liquidity' element={<Liquidity />} />
                <Route path='/profit' element={<Profile />} />
                <Route path='/oracle' element={<Login />} />
                <Route path='/login' element={<Login />} />
            </Routes>
        </Layout>
        <Toaster/>
    </BrowserRouter>
  );
}

export default App;
