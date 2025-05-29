import { Button } from "@/components/ui/button"
import { Info } from "lucide-react"
import { use, useEffect, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import { Vuelo } from "@/interfaces/vuelos";
import { useReservaContext } from "@/context/ReservaContext";
import { VueloInfo, vueloService } from "@/api/vuelosService";
import { useNavigate } from "react-router-dom";


export default function FlightResults() {

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
    function handleReserva(e:any, flight: VueloInfo) {
        setFlightSelected(flight)
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
                                        <Button className="bg-green-700" onClick={() =>{ setOpenModal(false); setFlightSelected(flight)}}>Reservar</Button>
                                        <Button className="bg-red-700" onClick={() => setOpenModal(false)}>
                                            Cerrar
                                        </Button>
                                    </ModalFooter>
                                </Modal>
                            </div>
                            <div className="sm:self-center items-center">
                                <h2>{flight.precio}USD</h2>
                                <Button onClick={(e)=>handleReserva(e, flight)}>Reservar</Button>
                            </div>
                        </div>
                    </div>
                ))}</> : <p className="text-gray-500">No se encontraron vuelos disponibles.</p>}
        </div>
    )
}