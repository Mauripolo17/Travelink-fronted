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
import { ReservaProvider } from './context/ReservaContextFly.tsx';
import ReservaPage from './pages/reserva-page.tsx';
import FlightResults from './pages/flight-results.-page.tsx';
import VehicleResults from './pages/vehicle-results-page.tsx';
import VehicleRentPage from './pages/vehicle-rent-page.tsx';
import { CarReservaProvider } from './context/ReservaContextCar.tsx';

function App() {
  return (
    <div className="contenedor ">
      <div className='contenedor2 '>
      <AuthProvider>
        <ReservaProvider>
        <CarReservaProvider>
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
              
              <Route path="/flights" element={<FlightResults />} />
              <Route path="/vehicles" element={<VehicleResults/>} />
              <Route path="/vehicles/reservar/:id" element={<VehicleRentPage/>} />
            </Routes>
          </main>
          <Footer />
        </Router>
        </CarReservaProvider>
        </ReservaProvider>
        </AuthProvider>
      </div>
    </div>
  );
}




export default App
