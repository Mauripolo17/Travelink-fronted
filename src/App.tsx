import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import SearchComponent from './components/search-component'
import { Login } from './components/Login'
// import 'primeicons/primeicons.css';
// import "primereact/resources/primereact.min.css"; //core css
// import "primeflex/primeflex.css"; // flex
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { Footer, FooterTravelink } from './components/Footer'
import RegisterForm from './components/register-form.tsx'
import AuthPage from './pages/auth-page'
import LoginPage from './pages/auth-page'
import SignupPage from './pages/signup-page.tsx'

function App() {

  return (
    <Router>
      <Header></Header>
      <Routes>
        <Route path="/" element={<SearchComponent/>}></Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App
