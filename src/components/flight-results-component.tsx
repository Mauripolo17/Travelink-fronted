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


export function Flights() {
  const [date, setDate] = useState<Date>()
  const nReservas = [1, 2, 3, 4, 5,]
  const [nReservas2, setNReservas2] = useState(1)
  const documentsType = ['Tarjeta de identidad', 'Cedula', 'Cedula extranjera', 'Pasaporte']

  const handleSelectChange = (value: string) => {
    const e = Number(value)
    setNReservas2(e)
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
                  <Label htmlFor="firstName">Nombre</Label>
                  <Input id="firstName" name="firstName" placeholder="Juan" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lastName">Apellido</Label>
                  <Input id="lastName" name="lastName" placeholder="Pérez" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="TI">Tipo de documento</Label>
                  <Select>
                    <SelectTrigger id="TI" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {documentsType.map((n) => (
                        <SelectItem key={n} value={n}>
                          {n}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="documentid">Numero de documento</Label>
                  <Input id="documentid" name="documentid" type="number" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="birthdate">Fecha de nacimiento</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP", { locale: es }) : "Selecciona una fecha"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        captionLayout="dropdown-buttons"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="gender">Género</Label>
                  <Select>
                    <SelectTrigger id="gender" className="w-full">
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