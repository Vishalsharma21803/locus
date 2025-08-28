import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import MenuPage from './pages/menu/MenuPage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage'; 
import LandingPage from './pages/landingPage/LandingPage';
import Profile from './pages/profile/Profile';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
