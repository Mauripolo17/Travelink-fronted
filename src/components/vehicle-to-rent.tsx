import { useReservaContext } from "@/context/ReservaContext";
import { Alquiler, CarResponse, paymentCar } from "@/interfaces/car"
import { ca } from "date-fns/locale";
import { use, useEffect, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import PaymentMethodCar from "./payment-method-CAR";
import { set } from "date-fns";
import { create } from "domain";
import { createReadStream } from "fs";
import { useAuth } from "@/context/AuthContext";
import { VehicleService } from "@/services/VehicleService";
import { useNavigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"


export default function VehicleToRent() {
    const [openModal, setOpenModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuth();
    const { carToRent, paymentSuccess, carToSearch, managePaymentCar } = useReservaContext()
    const navegation = useNavigate();
    useEffect(() => {
        if (!carToRent) {
            setIsLoading(true);
            console.error("No carToRent found in context");
            return;
        } else {
            setIsLoading(false);
        }
    }, [carToRent]);

    useEffect(() => {
        if (paymentSuccess) {
            createReservation();
        }
    }, [paymentSuccess]);

    const handledReservar = () => {
        setOpenModal(true);

    }

    const createReservation = async () => {
        const reservationData: Alquiler = {
            fechaInicio: carToSearch.desde.slice(0, 10),
            fechaFin: carToSearch.hasta.slice(0, 10),
            valor: carToRent.precio,
            propietarioAlquiler: {
                nombrePropietarioAlquiler: user?.nombre as string || "Nombre Propietario",
                apellidoPropietarioAlquiler: user?.apellido as string || "Apellido Propietario",
                telefonoPropietarioAlquiler: String(user?.telefono)
            },
            carroId: carToRent.id
        }
        try {
            const loadingToast =
                toast("Procesando reserva", {
                    description: "Espere un momento mientras procesamos su reserva..."
                });
            const response = await VehicleService.createReservation(reservationData)
            const reservationId = response.id;
            const alquier: paymentCar = {
                idReservation: reservationId,
                idCar: carToRent.id,
                idClient: user?.id as string || "default-client-id",
                reservationDate: new Date().toISOString().slice(0, 10),
                mouunt: carToRent.precio,
                status: "pagado"
            }
            toast("¡Reserva exitosa!", {
                description: `Su reserva ha sido procesada con exito.`,
              });
            managePaymentCar(alquier);
            
            console.log("Reservation created successfully:", response);
            navegation("/");
        } catch (error) {
            console.error("Error creating reservation:", error);
        }
    }

    return (

        <div>
            {isLoading ?
                <div className="flex-col gap-4 w-full flex items-center justify-center">
                    <div
                        className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full"
                    >
                        <div
                            className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"
                        ></div>
                    </div>
                </div>
                : <div className="flex flex-row p-4 justify-center items center w-[800px] h-[400px] bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="flex justify-center items-center">
                        <img
                            src={carToRent?.imagen}
                            alt={`${carToRent?.marca} ${carToRent?.modelo}`}
                            className="w-full rounded-2xl h-60 object-cover "
                        />
                    </div>

                    <div className="flex flex-col p-8 justify-center">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                            {carToRent?.marca} {carToRent?.modelo}
                        </h2>

                        <p className="text-lg text-gray-700 mb-4">
                            Ubicación: <span className="font-semibold">{carToRent?.locacion}</span>
                        </p>
                        <p className="text-lg text-gray-700 mb-4">
                            Precio por día: <span className="font-semibold">${carToRent?.precio}</span>
                        </p>

                        <div className="flex  ">
                            <button onClick={handledReservar} className="bg-purple-700 text-white font-bold text-base px-4 py-3 rounded-lg w-full hover:bg-purple-800 active:scale-95 transition-transform">
                                Reservar vehículo
                            </button>
                        </div>
                        <Modal size="4xl" className="self-center min-h-svh overflow-auto font-Montserrat" show={openModal} onClose={() => setOpenModal(false)}>
                            <ModalHeader className="p-4">Pago {carToRent?.id}</ModalHeader>
                            <ModalBody>
                                <PaymentMethodCar carDetails={carToRent} />
                            </ModalBody>
                        </Modal>
                    </div>
                </div>}
            <Toaster position="top-right" expand={true} richColors />
        </div>
    );
}