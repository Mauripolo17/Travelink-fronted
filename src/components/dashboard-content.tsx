import { useEffect, useState } from "react";
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
import { historyReserva, reservaService } from "@/api/reservasService";
import { useAuth } from "@/context/AuthContext";
import { set } from "date-fns";



export default function DashboardContent() {
    const [itemSelect, setItemSelect] = useState<string>(' ');
    const items = ['vuelo', 'carro', 'hotel']
    const [reservas, setReservas] = useState<historyReserva[]>([]);
    const {user} = useAuth()

    useEffect(() => {
        loadHisory();
    }, []);

    async function loadHisory() {
        const response = await reservaService.getByClientId(user?.id as string);
        setReservas(response.data);
    }
    
    return (
        <div className="flex flex-col  w-full h-[80svh]">
            <div className="flex-1 p-4 w-full bg-white rounded-lg font-Montserrat shadow-md text-2xl  ">
                <div className="flex flex-col p-20 items-center h-full">
                    <h2 className="text-3xl text-primary-600 font-bold mb-4">Bienvenido {user?.nombre}</h2>
                    <h2 className="text-2xl text-gray-600 font-bold mb-4">Aqui tienes tus reservas de vuelos</h2>
                    {itemSelect && (
                        <div className="flex  justify-center ">
                            <Table className="overflow-x-auto w-full">
                                <TableCaption>A list of your recent flights.</TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">Reserva</TableHead>
                                        <TableHead>Vuelo</TableHead>
                                        <TableHead>Origen</TableHead>
                                        <TableHead>Destino</TableHead>
                                        <TableHead>Fecha</TableHead>                                        
                                        <TableHead>Precio</TableHead>
                                        <TableHead>Aerolinea</TableHead>
                                        <TableHead className="text-right">Aeropuerto</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {reservas.map((reserva) => (
                                        <TableRow key={reserva.id} className="hover:bg-gray-100">
                                            <TableCell className="font-medium">{reserva.id}</TableCell>
                                            <TableCell>{reserva.vuelos[0].id}</TableCell>
                                            <TableCell>{reserva.vuelos[0].origen}</TableCell>
                                            <TableCell>{reserva.vuelos[0].destino}</TableCell>
                                            <TableCell>{reserva.vuelos[0].fechaDeSalida}</TableCell>
                                            <TableCell>{reserva.vuelos[0].precio}</TableCell>
                                            <TableCell>{reserva.vuelos[0].aeropuerto.nombre}</TableCell>
                                            <TableCell className="text-right">{reserva.vuelos[0].aerolinea.nombre}</TableCell>
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

