import { Button } from "@/components/ui/button"
import { Info } from "lucide-react"
import { use, useEffect, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import { Vuelo } from "@/interfaces/vuelos";
import { useReservaContext } from "@/context/ReservaContext car";
import { VueloInfo, vueloService } from "@/api/vuelosService";
import { useNavigate } from "react-router-dom";

export default function FlightResults() {
    // const flights: Vuelo[] = [
    //     {
    //         id: 1,
    //         origen: "Madrid",
    //         destino: "París",
    //         fechaDeSalida: "2025-06-15",
    //         horaDeSalida: "08:30",
    //         capacidad: 180,
    //         precio: 120.50,
    //         img: "https://blog.properati.com.co/wp-content/uploads/2021/02/GettyImages-1148861090-1024x681.jpg",
    //         aerolinea: "Air France",
    //         aeropuerto: "Adolfo Suárez Madrid-Barajas",
    //         duracion: 2.25 // en horas
    //     },
    //     {
    //         id: 2,
    //         origen: "Buenos Aires",
    //         destino: "Santiago de Chile",
    //         fechaDeSalida: "2025-07-01",
    //         horaDeSalida: "13:45",
    //         capacidad: 200,
    //         precio: 230.00,
    //         img: "https://images.trvl-media.com/lodging/4000000/3470000/3462900/3462809/d4eb7149.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill",
    //         aerolinea: "LATAM Airlines",
    //         aeropuerto: "Aeropuerto Internacional Ministro Pistarini",
    //         duracion: 2.0
    //     },
    //     {
    //         id: 3,
    //         origen: "Nueva York",
    //         destino: "Londres",
    //         fechaDeSalida: "2025-06-22",
    //         horaDeSalida: "21:00",
    //         capacidad: 250,
    //         precio: 540.99,
    //         img: "https://www.bachelorpartiescolombia.com/wp-content/uploads/2019/06/Cholon-Tour-Baru-Island-Cartagena-Colombia-Guide-22.jpg",
    //         aerolinea: "British Airways",
    //         aeropuerto: "John F. Kennedy International Airport",
    //         duracion: 7.0
    //     },
    //     {
    //         id: 4,
    //         origen: "Tokio",
    //         destino: "Seúl",
    //         fechaDeSalida: "2025-06-25",
    //         horaDeSalida: "06:20",
    //         capacidad: 220,
    //         precio: 180.75,
    //         img: "https://hotelalmirantecartagena.com/wp-content/uploads/2023/03/hac-blog-baru.jpg",
    //         aerolinea: "Korean Air",
    //         aeropuerto: "Aeropuerto Internacional de Narita",
    //         duracion: 2.5
    //     },
    //     {
    //         id: 5,
    //         origen: "Ciudad de México",
    //         destino: "Los Ángeles",
    //         fechaDeSalida: "2025-07-10",
    //         horaDeSalida: "17:15",
    //         capacidad: 240,
    //         precio: 310.40,
    //         img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuDX9za9zHQsk3wTm4vkrZBjZpDQFY4a7oJg&s",
    //         aerolinea: "Aeroméxico",
    //         aeropuerto: "Aeropuerto Internacional Benito Juárez",
    //         duracion: 4.5
    //     }
    // ];


    const [openModal, setOpenModal] = useState(false);

    const [flights, setFlights] = useState<VueloInfo[]>([]);


    const { flightToSearch, flightSelected, setFlightSelected} = useReservaContext();
    useEffect(() => {
        fetchFlights();
    }, []);

    const fetchFlights = async () => {
        const flights: VueloInfo[] = await vueloService.buscarVuelos(flightToSearch);
        console.log(flights);
        setFlights(flights);
    };

    const navigation = useNavigate();
    function handleReserva() {
        if (flightSelected) {
            navigation("/reserva")
        }
    }
    return (
        <div className="bg-white shadow-md rounded-lg min-h-[70svh] p-6 font-Montserrat">
            <h2 className="text-2xl font-bold mb-4">Resultados de Vuelos</h2>
            {flights.length > 0 ? <>
                {flights.map((flight) => (
                    <div key={flight.id} className="flex flex-col sm:flex-row hover:bg-gray-200 rounded-lg my-2">
                        <img src={flight.img} className="size-34 rounded-lg" alt="" />
                        <div className="flex justify-between w-full p-4">
                            <div>
                                <h2>{flight.origen} - {flight.destino}</h2>
                                <h2>{flight.fechaDeSalida} - {flight.horaDeSalida}</h2>
                                <Button onClick={() => { setOpenModal(true); setFlightSelected(flight) }}><Info />Ver info</Button>
                                <Modal size="4xl" className="self-center min-h-svh font-Montserrat" show={openModal} onClose={() => setOpenModal(false)}>
                                    <ModalHeader className="p-4">Informacion del vuelo {flightSelected?.id}</ModalHeader>
                                    <ModalBody>
                                        <div className="grid grid-cols-2 space-y-6">
                                            <div>
                                                <p className="">Origen: {flightSelected?.origen}</p>
                                                <p className="">Destino: {flightSelected?.destino}</p>
                                                <p className="">Fecha: {flightSelected?.fechaDeSalida}</p>
                                                <p className="">Hora: {flightSelected?.horaDeSalida}</p>
                                                <p className="">Capacidad del avion: {flightSelected?.capacidad}</p>
                                            </div>
                                            <div>
                                                <p>Precio: {flightSelected?.precio}</p>
                                                <p>Aerolinea: {flightSelected?.aerolinea.nombre}</p>
                                                <p>Aeropuerto: {flightSelected?.aeropuerto.nombre}</p>
                                                <p>Duracion: {flightSelected?.duracion}h</p>
                                            </div>
                                        </div>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button className="bg-green-700" onClick={() => setOpenModal(false)}>Reservar</Button>
                                        <Button className="bg-red-700" onClick={() => setOpenModal(false)}>
                                            Cerrar
                                        </Button>
                                    </ModalFooter>
                                </Modal>
                            </div>
                            <div className="sm:self-center items-center">
                                <h2>{flight.precio}USD</h2>
                                <Button onClick={handleReserva}>Reservar</Button>
                            </div>
                        </div>
                    </div>
                ))}</> : <p className="text-gray-500">No se encontraron vuelos disponibles.</p>}
        </div>
    )
}