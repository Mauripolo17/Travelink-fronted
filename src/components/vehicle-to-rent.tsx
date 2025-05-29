import { CarResponse } from "@/interfaces/car"
import { VehicleService } from "@/services/VehicleService";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ReservationRequest, ReservationService } from "@/services/ReservationService";
import { useCarReservaContext } from "@/context/ReservaContextCar";

const getVehicleById = async (id: number) => {
    if (id === undefined) {
        console.error("Vehicle ID is undefined");
        return null;
    }
    return VehicleService.getVehicleById(id)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.error("Error fetching vehicle data:", error);
            return null;
        });
}

export default function VehicleToRent() {
    const { carSelected, rentalDates, setCarSelected, setRentalDates } = useCarReservaContext();
    const fechaInicio  = rentalDates?.inicio;
    const fechaFin = rentalDates?.fin;

    const { id } = useParams();
    const [car, setCar] = useState<CarResponse | null>(null);

    useEffect(() => {
        const numericId = Number(id);
        if (isNaN(numericId)) {
            console.error("Vehicle ID is not a valid number");
        }
        const fetchCar = async () => {
            const vehicle = await getVehicleById(numericId);
            setCar(vehicle);
        };
        fetchCar();
    }, []);

    if (!car) {
        return <div>Cargando información del vehículo...</div>;
    }

    const handleReservar = async () => {
        if (!car) return;

        const reserva: ReservationRequest = {
        fechaInicio,
        fechaFin,
        valor: car.precio, // o algún cálculo total si aplica
        propietarioAlquiler: {
        nombrePropietarioAlquiler: "n n",
        apellidoPropietarioAlquiler: "n n",
        telefonoPropietarioAlquiler: 12 // el ID del usuario que alquila, puedes obtenerlo del contexto o auth
        },
        carroId: car.id,
    };
        try {
            const result = await ReservationService.reservarVehiculo(reserva);
            alert("Reserva exitosa");
            // También puedes redirigir con navigate('/mis-reservas') si usas react-router
        } catch (error) {
            console.error("Error al reservar vehículo:", error);
            alert("Error al reservar vehículo");
        }
    };

    return (
        <div className="flex flex-row items center w-[800px] h-[400px] bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="flex justify-center items-center">
                <img
                src={car.imagen}
                alt={`${car.marca} ${car.modelo}`}
                className="w-full h-60 object-cover"
                />
            </div>

            <div className="flex flex-col p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {car.marca} {car.modelo}
                </h2>

                <p className="text-lg text-gray-700 mb-4">
                Ubicación: <span className="font-semibold">{car.locacion}</span>
                </p>
                <p className="text-lg text-gray-700 mb-4">
                Precio por día: <span className="font-semibold">${car.precio}</span>
                </p>

                <div className="flex justify-end col items-end mt-auto">
                <button className="bg-purple-700 text-white font-bold text-base px-4 py-3 rounded-lg w-full hover:bg-purple-800 active:scale-95 transition-transform"
                onClick={handleReservar}>
                    Reservar vehículo
                </button>
                </div>
            </div>
        </div>
    );
}