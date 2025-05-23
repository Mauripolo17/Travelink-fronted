import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from "lucide-react"
import { es } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { use, useState } from "react"
import { format } from "date-fns"

interface ReservationForm {
  firstName: string;
  lastName: string;
  documentType: string;
  documentNumber: string;
  birthDate?: string;
  gender: string;
}

export function Reserva() {
  const [date, setDate] = useState<Date>()
  const nReservas = [1, 2, 3, 4, 5,]
  const [nReservas2, setNReservas2] = useState(1)
  const documentsType = ['Tarjeta de identidad', 'Cedula', 'Cedula extranjera', 'Pasaporte']

  const [reservations, setReservations] = useState<ReservationForm[]>([{
    firstName: '',
    lastName: '',
    documentType: documentsType[0],
    documentNumber: '',
    birthDate: '',
    gender: ''
  }]);

  const handleInputChange = (index: number, field: keyof ReservationForm, value: any) => {
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
            firstName: '',
            lastName: '',
            documentType: documentsType[0],
            documentNumber: '',
            birthDate: undefined,
            gender: ''
          }))
        ];
      } else {
        // Remove excess forms
        return prev.slice(0, newCount);
      }
    });
  };

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
                  <Label htmlFor="lastName">Apellido</Label>
                  <Input id={`firstName-${index}`} value={reservations[index]?.firstName || ''}
                    onChange={(e) => handleInputChange(index, 'firstName', e.target.value)} name="lastName" placeholder="Pérez" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor={`lastName-${index}`}>Apellido</Label>
                  <Input
                    id={`lastName-${index}`}
                    value={reservations[index]?.lastName || ''}
                    onChange={(e) => handleInputChange(index, 'lastName', e.target.value)}
                    placeholder="Pérez"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor={`TI-${index}`}>Tipo de documento</Label>
                  <Select
                    value={reservations[index]?.documentType}
                    onValueChange={(value) => handleInputChange(index, 'documentType', value)}
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
                    value={reservations[index]?.documentNumber || ''}
                    onChange={(e) => handleInputChange(index, 'documentNumber', e.target.value)}
                    type="number"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor={`birthdate-${index}`}>Fecha de nacimiento</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !reservations[index]?.birthDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {reservations[index]?.birthDate ?
                          format(reservations[index].birthDate, "dd-MM-yyyy", { locale: es }) :
                          "Selecciona una fecha"
                        }
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={new Date(reservations[index]?.birthDate || '')}
                        onSelect={(date) => handleInputChange(index, 'birthDate', date)}
                        initialFocus
                        captionLayout="dropdown-buttons"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor={`gender-${index}`}>Género</Label>
                  <Select
                    value={reservations[index]?.gender || ''}
                    onValueChange={(value) => handleInputChange(index, 'gender', value)}
                  >
                    <SelectTrigger id={`gender-${index}`} className="w-full">
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
            <Button type="submit">
              Reservar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}