
import { CarResponse } from "@/interfaces/car"
import { Button } from "./button";
import { useNavigate } from "react-router-dom";
import { use } from "react";
import { useReservaContext } from "@/context/ReservaContext";
import { set } from "date-fns";

export function ModalCar({ car, onClose }: { car: CarResponse; onClose: () => void }) {

const navigate = useNavigate();
const {carToRent, setCarToRent} = useReservaContext();

const handleReservar = (car: CarResponse) => {
  setCarToRent(car);
  setTimeout(() => {
    navigate(`reservar/`);
  }, 1000); // Simula un retraso para mostrar el mensaje de reserva
  console.log("Reservando vehículo:", car);
};

return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
      <div className="relative bg-white p-4 rounded shadow-lg w-full max-w-lg">
        {/* Botón "X" en la esquina superior derecha */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
          onClick={onClose}
          aria-label="Cerrar modal"
        >
          ✕
        </button>
  
        <h2 className="text-lg font-bold mb-2">{car.modelo}</h2>
        <img
          src={car.imagen}
          alt={car.modelo}
          className="w-full h-60 object-cover rounded"
        />
        <p className="mt-4 text-gray-700">
          <strong>Marca:</strong> {car.marca}
        </p>
        <p className="mt-4 text-gray-700">
          <strong>Precio por día:</strong> ${car.precio}
        </p>
        <p className="mt-4 text-gray-700">
          <strong>Ubicación:</strong> {car.locacion}
        </p>    
        <p className="mt-4">Detalles del vehículo...</p>
        {/* Botón cerrar abajo */}
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Cerrar
          </Button>
          <Button variant="destructive" onClick={() => handleReservar(car)}>
            Reservar
          </Button>
        </div>
      </div>
    </div>

    
  );      
}
