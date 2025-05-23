import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import "primereact/resources/themes/lara-light-indigo/theme.css";
import LoginPage from './pages/auth-page'
import SignupPage from './pages/signup-page.tsx'
import { Footer } from './components/footer.tsx';
import Home from './pages/Home.tsx';
import  Dashboard  from './pages/dashboard-page.tsx';
import FlightResultsPage from './pages/flight-results.-page.tsx';
import { AuthProvider } from './context/AuthContext.tsx';
import PrivateRoutes from './PrivateRoutes.tsx';
import { ReservaProvider } from './context/ReservaContext car.tsx';
import { Reserva } from './components/reserva.tsx';
import ReservaPage from './pages/reserva-page.tsx';

function App() {
  return (
    <div className="contenedor ">
      <div className='contenedor2 '>
      <AuthProvider>
        <ReservaProvider>
        <Router>
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/flights" element={<FlightResultsPage />} />
              <Route element={<PrivateRoutes />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/reserva" element={<ReservaPage />} />
              </Route>
              
            </Routes>
          </main>
          <Footer />
        </Router>
        </ReservaProvider>
        </AuthProvider>
      </div>
    </div>
  );
}




export default App
