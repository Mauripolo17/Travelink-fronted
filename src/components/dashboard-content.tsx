import { useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Vuelo } from "@/interfaces/vuelos";



export default function DashboardContent() {
    const [itemSelect, setItemSelect] = useState<string>(' ');
    const items = ['vuelo', 'carro', 'hotel']

    const flights: Vuelo[] = [
        {
            id: 1,
            origen: "Madrid",
            destino: "París",
            fechaDeSalida: "2025-06-15",
            horaDeSalida: "08:30",
            capacidad: 180,
            precio: 120.50,
            img: "https://blog.properati.com.co/wp-content/uploads/2021/02/GettyImages-1148861090-1024x681.jpg",
            aerolinea: "Air France",
            aeropuerto: "Adolfo Suárez Madrid-Barajas",
            duracion: 2.25 // en horas
        },
        {
            id: 2,
            origen: "Buenos Aires",
            destino: "Santiago de Chile",
            fechaDeSalida: "2025-07-01",
            horaDeSalida: "13:45",
            capacidad: 200,
            precio: 230.00,
            img: "https://images.trvl-media.com/lodging/4000000/3470000/3462900/3462809/d4eb7149.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill",
            aerolinea: "LATAM Airlines",
            aeropuerto: "Aeropuerto Internacional Ministro Pistarini",
            duracion: 2.0
        },
        {
            id: 3,
            origen: "Nueva York",
            destino: "Londres",
            fechaDeSalida: "2025-06-22",
            horaDeSalida: "21:00",
            capacidad: 250,
            precio: 540.99,
            img: "https://www.bachelorpartiescolombia.com/wp-content/uploads/2019/06/Cholon-Tour-Baru-Island-Cartagena-Colombia-Guide-22.jpg",
            aerolinea: "British Airways",
            aeropuerto: "John F. Kennedy International Airport",
            duracion: 7.0
        },
        {
            id: 4,
            origen: "Tokio",
            destino: "Seúl",
            fechaDeSalida: "2025-06-25",
            horaDeSalida: "06:20",
            capacidad: 220,
            precio: 180.75,
            img: "https://hotelalmirantecartagena.com/wp-content/uploads/2023/03/hac-blog-baru.jpg",
            aerolinea: "Korean Air",
            aeropuerto: "Aeropuerto Internacional de Narita",
            duracion: 2.5
        },
        {
            id: 5,
            origen: "Ciudad de México",
            destino: "Los Ángeles",
            fechaDeSalida: "2025-07-10",
            horaDeSalida: "17:15",
            capacidad: 240,
            precio: 310.40,
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuDX9za9zHQsk3wTm4vkrZBjZpDQFY4a7oJg&s",
            aerolinea: "Aeroméxico",
            aeropuerto: "Aeropuerto Internacional Benito Juárez",
            duracion: 4.5
        }
    ];

    return (
        <div className="flex flex-col  w-full h-[80svh]">
            <div className="flex-1 p-4 w-full bg-white rounded-lg font-Montserrat shadow-md text-2xl  ">
                <div className="flex flex-col p-20 items-center h-full">
                    {itemSelect && (
                        <div className="flex  justify-center ">
                            <Table className="overflow-x-auto w-full">
                                <TableCaption>A list of your recent flights.</TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">ID vuelo</TableHead>
                                        <TableHead>Origen</TableHead>
                                        <TableHead>Destino</TableHead>
                                        <TableHead>Fecha</TableHead>
                                        <TableHead>Hora</TableHead>
                                        <TableHead>Precio</TableHead>
                                        <TableHead>Aerolinea</TableHead>
                                        <TableHead className="text-right">Aeropuerto</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {flights.map((flight) => (
                                        <TableRow key={flight.id} className="hover:bg-gray-100">
                                            <TableCell className="font-medium">{flight.id}</TableCell>
                                            <TableCell>{flight.origen}</TableCell>
                                            <TableCell>{flight.destino}</TableCell>
                                            <TableCell>{flight.fechaDeSalida}</TableCell>
                                            <TableCell>{flight.horaDeSalida}</TableCell>
                                            <TableCell>{flight.precio}</TableCell>
                                            <TableCell>{flight.aerolinea}</TableCell>
                                            <TableCell className="text-right">{flight.aeropuerto}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                        </div>)}
                </div>
            </div>
        </div>
    );
}