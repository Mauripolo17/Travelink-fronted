import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Toaster } from "@/components/ui/sonner"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from "lucide-react"
import { es } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { use, useEffect, useState } from "react"
import { format, set } from "date-fns"
import { toast } from "sonner"
import { VueloInfo } from "@/api/vuelosService"
import { reservaService } from "@/api/reservasService"
import { useReservaContext } from "@/context/ReservaContext"
import { useAuth } from "@/context/AuthContext"
import { Pasajero } from "@/api/pasajeroService"
import { useNavigate } from "react-router-dom"
import { Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import PaymentMethod from "./payment-method"
import { create } from "domain"

export interface Reserva {
  id?: number;
  fechaReserva: string;
  cliente: string;
  pasajeros?: Pasajero[];
  vuelos?: VueloInfo[];
}


export function Reserva() {
  const [date, setDate] = useState<Date>()
  const nReservas = [1, 2, 3, 4, 5,]
  const [nReservas2, setNReservas2] = useState(1)
  const documentsType = ['Tarjeta de identidad', 'Cedula', 'Cedula extranjera', 'Pasaporte']
  const { flightSelected, setFlightSelected, paymentSuccess, managePayment } = useReservaContext()
  const { user } = useAuth()
  const [openModal, setOpenModal] = useState(false);

  const [reservations, setReservations] = useState<Pasajero[]>([{
    nombre: '',
    apellido: '',
    tipoDocumento: '',
    numeroDocumento: 0,
    fechaDeNacimiento: '',
    sexo: ''
  }]);

  const navigation = useNavigate();

  const handleInputChange = (index: number, field: keyof Pasajero, value: any) => {
    const updatedReservations = [...reservations];
    updatedReservations[index] = {
      ...updatedReservations[index],
      [field]: value
    };
    setReservations(updatedReservations);
  };

  const handleSelectChange = (value: string) => {
    const newCount = Number(value);
    setNReservas2(newCount);

    // Adjust the reservations array based on the new count
    setReservations(prev => {
      if (newCount > prev.length) {
        // Add more empty forms
        return [
          ...prev,
          ...Array(newCount - prev.length).fill(null).map(() => ({
            nombre: '',
            apellido: '',
            tipoDocumento: '',
            numeroDocumento: 0,
            fechaDeNacimiento: '',
            sexo: ''
          }))
        ];
      } else {
        // Remove excess forms
        return prev.slice(0, newCount);
      }
    });
  };

  useEffect(() => {
    if (paymentSuccess){
      createReservation()
    }
  }, [paymentSuccess]);
  const handleReservation = async () => {
    // Validate all reservation data
   

    const hasEmptyFields = reservations.some(reservation =>
      !reservation.nombre ||
      !reservation.apellido ||
      !reservation.numeroDocumento ||
      !reservation.fechaDeNacimiento ||
      !reservation.sexo
    );

    if (hasEmptyFields) {
      toast.warning("Campos incompletos", {
        description: "Por favor complete todos los campos requeridos para cada viajero.",
      })
      return;
    }
    setOpenModal(true);
  };

  async function createReservation() {
    try {
      // Show loading state
      const loadingToast =
        toast("Procesando reserva", {
          description: "Espere un momento mientras procesamos su reserva..."
        });

      const reservaData: Reserva = {
        fechaReserva: new Date().toISOString().slice(0, 10),
        cliente: user?.id as string,
        pasajeros: reservations,
        vuelos: [flightSelected as VueloInfo]
      }
      console.log(reservaData)
      const response = await reservaService.createReserva(reservaData)
      toast("¡Reserva exitosa!", {
        description: `Su reserva ha sido procesada con exito.`,
      });
      managePayment(response as Reserva); ;
      setTimeout(() => {
        navigation("/")
      }, 3000);
    } catch (error) {
      console.error('Error al procesar la reserva:', error);
      toast("Error en la reserva", {
        description: "Ha ocurrido un problema al procesar su reserva. Por favor intente nuevamente."
      });
    }
  }
  return (
    <div className="max-w-4xl">
      <div className="bg-white w-full rounded-sm p-8 shadow-md">
        <div className="grid gap-6">
          <div className="flex flex-col items-center">
            <h1 className="font-bold">Haz tu reserva</h1>
            <div className="w-36 ">
              <Select onValueChange={(value) => handleSelectChange(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="1" />
                </SelectTrigger>
                <SelectContent>
                  {nReservas.map((n) => (
                    <SelectItem key={n} value={n.toString()}>
                      {n}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          {Array.from({ length: nReservas2 }, (_, index) => <div>
            <hr className="color-black pb-5" />
            <div className="grid gap-6 jus">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="nombre">Nombre</Label>
                  <Input id={`nombre-${index}`} value={reservations[index]?.nombre || ''}
                    onChange={(e) => handleInputChange(index, 'nombre', e.target.value)} name="lastName" placeholder="Pérez" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor={`apellido-${index}`}>Apellido</Label>
                  <Input
                    id={`apellido-${index}`}
                    value={reservations[index]?.apellido || ''}
                    onChange={(e) => handleInputChange(index, 'apellido', e.target.value)}
                    placeholder="Pérez"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor={`TI-${index}`}>Tipo de documento</Label>
                  <Select
                    value={reservations[index]?.tipoDocumento}
                    onValueChange={(value) => handleInputChange(index, 'tipoDocumento', value)}
                  >
                    <SelectTrigger id={`TI-${index}`} className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {documentsType.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor={`documentid-${index}`}>Numero de documento</Label>
                  <Input
                    id={`documentid-${index}`}
                    value={reservations[index]?.numeroDocumento || ''}
                    onChange={(e) => handleInputChange(index, 'numeroDocumento', e.target.value)}
                    type="number"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor={`fechaDeNacimiento-${index}`}>Fecha de nacimiento</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !reservations[index]?.fechaDeNacimiento && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {reservations[index]?.fechaDeNacimiento ?
                          format(reservations[index].fechaDeNacimiento, "dd-MM-yyyy", { locale: es }) :
                          "Selecciona una fecha"
                        }
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={new Date(reservations[index]?.fechaDeNacimiento || '')}
                        onSelect={(date) => handleInputChange(index, 'fechaDeNacimiento', date)}
                        initialFocus
                        captionLayout="dropdown-buttons"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor={`sexo-${index}`}>Género</Label>
                  <Select
                    value={reservations[index]?.sexo || ''}
                    onValueChange={(value) => handleInputChange(index, 'sexo', value)}
                  >
                    <SelectTrigger id={`sexo-${index}`} className="w-full">
                      <SelectValue placeholder="Selecciona tu género" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Masculino</SelectItem>
                      <SelectItem value="female">Femenino</SelectItem>
                      <SelectItem value="non-binary">No binario</SelectItem>
                      <SelectItem value="other">Otro</SelectItem>
                      <SelectItem value="prefer-not-to-say">Prefiero no decirlo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

          </div>)}
          <div className="flex justify-center">
            <Button onClick={handleReservation} >
              Reservar
            </Button>
            <Modal size="4xl" className="self-center min-h-svh overflow-auto font-Montserrat" show={openModal} onClose={() => setOpenModal(false)}>
              <ModalHeader className="p-4">Pago {flightSelected?.id}</ModalHeader>
              <ModalBody>
               <PaymentMethod reservationDetails={flightSelected as VueloInfo}/>
              </ModalBody>
            </Modal>
            <Toaster position="top-right" expand={true} richColors />
          </div>
        </div>
      </div>
    </div>
  )
}