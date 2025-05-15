import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import SearchComponent from './components/search-component'
import "primereact/resources/themes/lara-light-indigo/theme.css";
import LoginPage from './pages/auth-page'
import SignupPage from './pages/signup-page.tsx'
import { Footer } from './components/footer.tsx';
import Home from './pages/Home.tsx';

function App() {
  return (
    <div className="contenedor">
      <Router>
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}




export default App
