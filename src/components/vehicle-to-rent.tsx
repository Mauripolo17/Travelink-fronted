import { CarResponse } from "@/interfaces/car"

const car: CarResponse = {
    id: 3,
    marca: "Ford",
    modelo: "Mustang",
    placa: 9101,
    imagen: "https://www.pngarts.com/files/3/Ford-Mustang-PNG-Photo.png",
    precio: 30000,
    locacion: "Chicago"
}

export default function VehicleToRent() {
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
                <button className="bg-purple-700 text-white font-bold text-base px-4 py-3 rounded-lg w-full hover:bg-purple-800 active:scale-95 transition-transform">
                    Reservar vehículo
                </button>
                </div>
            </div>
        </div>
    );
}