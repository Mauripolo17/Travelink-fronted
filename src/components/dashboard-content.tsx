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
import { useDashboardContext } from "@/context/DashboardContext";
import { VehicleService } from "@/services/VehicleService";
import { AlquilerResponse } from "@/interfaces/car";
import { collection, doc, getDoc, getDocs, getFirestore, query, where } from 'firebase/firestore';
import firebaseApp from "../firebase/credenciales.tsx";
import { set } from "date-fns";



export default function DashboardContent() {
    const firestore = getFirestore(firebaseApp);
    const { item, setItem } = useDashboardContext();
    const items = ['vuelo', 'carro', 'hotel']
    const [reservas, setReservas] = useState<historyReserva[]>([]);
    const [alquiler, setAlquiler] = useState<AlquilerResponse[]>([]);
    const [payments, setPayments] = useState<any[]>([]);
    const [payments2, setPayments2] = useState<any[]>([]);
    const { user } = useAuth()

    useEffect(() => {
        loadHisory();
        loadHisoryCar()
        loadPayment();
        loadPayment2();
    }, []);

    async function loadHisory() {
        const response = await reservaService.getByClientId(user?.id as string);
        setReservas(response.data);
    }

    async function loadHisoryCar() {
        const response = await VehicleService.getByClientId(user?.nombre as string);
        setAlquiler(response);
    }

    async function loadPayment() {
        const paymentsRef = collection(firestore, 'paymentsCar');
        const q = query(paymentsRef, where('idClient', '==', user?.id));

        const querySnapshot = await getDocs(q);
        setPayments(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

    }



    async function loadPayment2() {
        const paymentsRef = collection(firestore, 'payments');
        const q = query(paymentsRef, where('clienteId', '==', user?.id));

        const querySnapshot = await getDocs(q);
        setPayments2(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

    }
    return (
        <div className="flex flex-col  w-full h-[80svh]">
            <div className="flex-1 p-4 w-full overflow-y-auto bg-white rounded-lg font-Montserrat shadow-md text-2xl  ">
                <div className="flex flex-col  p-20 items-center h-full">
                    <h2 className="text-3xl text-primary-600 font-bold mb-4">Bienvenido {user?.nombre}</h2>
                    <h2 className="text-2xl text-gray-600 font-bold mb-4">Aqui tienes tus reservas de {item == 'Mis vuelos' ? 'Vuelos' : 'Carros'}</h2>
                    {item == 'Mis vuelos' ? <div className="flex  justify-center ">
                        <div>
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
                            <Table className="overflow-x-auto w-full">
                                <TableCaption>A list of your recent flights.</TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">Reserva</TableHead>
                                        <TableHead>id Vuelo</TableHead>
                                        <TableHead>Fecha</TableHead>
                                        <TableHead className="text-right">Estado</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                {payments2.map((pay) => (
                                        <TableRow key={pay.id} className="hover:bg-gray-100">
                                            <TableCell className="font-medium">{pay.id}</TableCell>
                                            <TableCell>{pay.vueloId}</TableCell>
                                            <TableCell>{pay.fechaReserva.slice(0, 10)}</TableCell>
                                            <TableCell className="text-right"> {pay.estado}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div> :
                        <div className="flex flex-col justify-center ">

                            <Table className="overflow-x-auto w-full">
                                <TableCaption>A list of your recent Cars rent.</TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">Reserva</TableHead>
                                        <TableHead>Desde</TableHead>
                                        <TableHead>Hasta</TableHead>
                                        <TableHead>Valor</TableHead>
                                        <TableHead>Ciudad</TableHead>
                                        <TableHead>Marca</TableHead>
                                        <TableHead className="text-right">Modelo</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {alquiler.map((alqui) => (
                                        <TableRow key={alqui.id} className="hover:bg-gray-100">
                                            <TableCell className="font-medium">{alqui.id}</TableCell>
                                            <TableCell>{alqui.fechaInicio}</TableCell>
                                            <TableCell>{alqui.fechaFin}</TableCell>
                                            <TableCell>{alqui.valor}</TableCell>
                                            <TableCell>{alqui.locacion}</TableCell>
                                            <TableCell>{alqui.carro.marca}</TableCell>
                                            <TableCell className="text-right"> {alqui.carro.modelo}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <br />
                            <h2 className="text-2xl text-center text-gray-600 font-bold mb-4">Aqui tienes tus pagos</h2>
                            <Table className="overflow-x-auto w-full">
                                <TableCaption>A list of your recent payments.</TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">Reserva</TableHead>
                                        <TableHead>id Carro</TableHead>
                                        <TableHead>Fecha</TableHead>
                                        <TableHead>Valor</TableHead>
                                        <TableHead className="text-right">Estado</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {payments.map((pay) => (
                                        <TableRow key={pay.id} className="hover:bg-gray-100">
                                            <TableCell className="font-medium">{pay.id}</TableCell>
                                            <TableCell>{pay.idCar}</TableCell>
                                            <TableCell>{pay.reservationDate}</TableCell>
                                            <TableCell>{pay.mouunt}</TableCell>
                                            <TableCell className="text-right"> {pay.status}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>}
                </div>
            </div>
        </div>
    );
}

