"use client"
import { CalendarIcon, Car, Hotel, Plane } from "lucide-react"
// import { Button } from 'primereact/button';
import { useEffect, useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { reservaCarro, reservaHoteles, reservaVuelo } from "../interfaces/reservaCarro";
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Datepicker } from "flowbite-react";
import { flighToSearch, vueloService } from "@/api/vuelosService";
import { useReservaContext } from "@/context/ReservaContext";
import { useNavigate } from "react-router-dom";

export default function SearchComponent() {
  // Estado para controlar qué pestaña está activa
  const [activeTab, setActiveTab] = useState("flights")
  // const cities = ['New York', 'Rome', 'London', 'Istanbul']

  const [formVuelo, setFormVuelo] = useState<flighToSearch>({
    origen: "",
    destino: "",
    desde: '',
    hasta: null,
  });

  const [formHoteles, setFormsHoteles] = useState<reservaHoteles>({
    ciudad: '',
    inicio: '',
    hasta: '',
    adultos: 0,
    menores: 0
  })

  const [formCarro, setFormCarro] = useState<reservaCarro>({
    lugar: 0,
    desde: '',
    hasta: '',
  });
  const numeroDeHuespedes = [1, 2, 3, 4, 5,]

  const handleSelectChange = (value: string, name: string) => {
    setFormVuelo({ ...formVuelo, [name]: value })
  }

  const handleSelectChangeHoteles = (value: string, name: string) => {
    setFormsHoteles({ ...formHoteles, [name]: value })
  }

  const handleCalendar = (e: Date | undefined) => {
    if (e) {
      setFormVuelo({ ...formVuelo, desde: e.toISOString() });
    }
  }

  const [cities, setCities] = useState<string[]>([]);

  const citisCar =
    [
      {
        "id": 1,
        "nombre": "Santa Marta"
      },
      {
        "id": 2,
        "nombre": "Bogota"
      },
      {
        "id": 3,
        "nombre": "Barranquilla"
      }
    ]


  useEffect(() => {
    (async () => {
      await loadCitys();
    })();
  }, [])

  const loadCitys = async () => {
    try {
      const response = await vueloService.getCiudades();
      const data = await response;
      setCities(data);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  }
  const { setFlightToSearch, setCarToSearch } = useReservaContext();

  const navegation = useNavigate()
  const handleOnSubmmuit = (e: any) => {
    e.preventDefault();
    if (activeTab === "flights") {
      setFlightToSearch(formVuelo);
      navegation("/flights")

    } else if (activeTab === "hotels") {
      console.log(formHoteles)
    } else if (activeTab === "cars") {
      setCarToSearch(formCarro);
      navegation("/vehicles")
      console.log(formCarro)
    }
  }
  return (
    <div className="bg-transparent mb-30 h-full">
      <div className="w-full max-w-2xl max-h-md mx-auto px-10">
        <h2 className="text-3xl mb-5 text-white font-bold text-shadow-sm font-Montserrat flex justify-self-center uppercase">Encuentra tu alquiler perfecto</h2>
        <div className="bg-white rounded-lg shadow-lg ">
          {/* Tabs Header */}
          <div className="flex justify-evenly">
            <button
              className={`flex items-center gap-2 px-2 py-3 font-medium text-sm ${activeTab === "flights"
                ? "border-b-2 border-blueT text-blueT bg-primary-50"
                : "text-gray-600 hover:bg-gray-50"
                }`}
              onClick={() => setActiveTab("flights")}
            >
              <Plane className="h-4 w-4" />
              Vuelos
            </button>
            {/* <button
              className={`flex items-center gap-2 px-2 py-3 font-medium text-sm ${activeTab === "hotels"
                ? "border-b-2 border-blueT text-blueT bg-primary-50"
                : "text-gray-600 hover:bg-gray-50"
                }`}
              onClick={() => setActiveTab("hotels")}
            >
              <Hotel className="h-4 w-4" />
              Hoteles
            </button> */}
            <button
              className={`flex items-center gap-2 px-2 py-3 font-medium text-sm ${activeTab === "cars"
                ? "border-b-2 border-blueT text-blueT bg-primary-50"
                : "text-gray-600 hover:bg-gray-50"
                }`}
              onClick={() => setActiveTab("cars")}
            >
              <Car className="h-4 w-4" />
              Carros
            </button>
          </div>

          <form onSubmit={handleOnSubmmuit}>
            <div className="p-6">
              {/* Contenido de Vuelos */}
              {activeTab === "flights" && (
                <div className="flex flex-col items-center">
                  {/* Inputs ORIGEN y DESTINO */}
                  <div className="flex flex-col sm:flex-row justify-center gap-4 my-4 max-w-[384px] w-full">
                    <div className="w-full sm:w-1/2">
                      <label className="font-Montserrat">Origen</label>
                      <Select onValueChange={(value) => handleSelectChange(value, "origen")}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Origen" />
                        </SelectTrigger>
                        <SelectContent>
                          {cities.map((citie) => (
                            <SelectItem key={citie} value={citie}>
                              {citie}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="w-full sm:w-1/2">
                      <label>Destino</label>
                      <Select onValueChange={(value) => handleSelectChange(value, "destino")}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Destino" />
                        </SelectTrigger>
                        <SelectContent>
                          {cities.map((citie) => (
                            <SelectItem key={citie} value={citie}>
                              {citie}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  {/* DatePicker */}
                  <div className="flex justify-center my-2 w-full max-w-[384px]">
                    <div className="flex flex-col w-full">
                      <label>Fecha</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !formVuelo.desde && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formVuelo.desde ? format(formVuelo.desde, "dd-MM-yyyy") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={new Date(formVuelo.desde)}
                            onSelect={handleCalendar}
                            fromYear={new Date().getFullYear()} // o cualquier año mínimo que necesites
                            toYear={2030}
                            disabled={{ before: new Date(Date.now()) }}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </div>

              )}

              {/* Contenido de Hoteles */}
              {activeTab === "hotels" && (
                <div className="flex flex-col w-full justify-center ">
                  <div className="flex justify-center gap-1 my-2">
                    <div className="flex flex-col w-full max-w-[384px]">
                      <label htmlFor="">Ciudad</label>
                      <Select onValueChange={(value) => handleSelectChangeHoteles(value, "ciudad")}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Origen" />
                        </SelectTrigger>
                        <SelectContent>
                          {cities.map((citie) => (
                            <SelectItem key={citie} value={citie}>
                              {citie}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex justify-center my-4 ">
                    <div className="flex flex-col sm:flex-row gap-2 max-w-[384px]  w-full">
                      <div className="w-full sm:w-1/2">
                        <label htmlFor="">Fecha inicio</label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full text-left font-normal",
                                !formHoteles.inicio && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {formHoteles.inicio ? format(formHoteles.inicio, "dd-MM-yyyy") : <span>Pick a date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={new Date(formHoteles.inicio)}
                              onSelect={(e) => e && setFormsHoteles({ ...formHoteles, inicio: e?.toDateString() })}
                              initialFocus
                              fromYear={new Date().getFullYear()} // o cualquier año mínimo que necesites
                              toYear={2030}
                              disabled={{ before: new Date(Date.now()) }}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="w-full sm:w-1/2">
                        <label htmlFor="">Fecha de fin</label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full text-left font-normal",
                                !formHoteles.hasta && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {formHoteles.hasta ? format(formHoteles.hasta, "dd-MM-yyyy") : <span>Pick a date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={new Date(formHoteles.hasta)}
                              onSelect={(e) => e && setFormsHoteles({ ...formHoteles, hasta: e.toISOString() })}
                              initialFocus
                              fromYear={new Date().getFullYear()} // o cualquier año mínimo que necesites
                              toYear={2030}
                              disabled={{ before: new Date(Date.now()) }}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>

                  </div>

                  <div className="flex justify-center">
                    <div className="flex grow flex-col sm:flex-row gap-2 max-w-[384px] ">
                      <div className="w-full sm:w-1/2 ">
                        <h1 className="self-start">Huespedes</h1>
                        <Select onValueChange={(value) => handleSelectChangeHoteles(value, "adultos")}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Adultos" />
                          </SelectTrigger>
                          <SelectContent>
                            {numeroDeHuespedes.map((n) => (
                              <SelectItem key={n} value={n.toString()}>
                                {n}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="self-end w-full sm:w-1/2 ">
                        <Select onValueChange={(value) => handleSelectChangeHoteles(value, "menores")}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Menores" />
                          </SelectTrigger>
                          <SelectContent>
                            {numeroDeHuespedes.map((n) => (
                              <SelectItem key={n} value={n.toString()}>
                                {n}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Contenido de Carros */}
              {activeTab === "cars" && (
                <div>
                  <div className="flex justify-center gap-1 my-2">
                    <div className="flex flex-col w-full max-w-[384px]">
                      <label htmlFor="">Ciudad</label>
                      <Select onValueChange={(value) => setFormCarro({ ...formCarro, lugar: Number(value) })}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Origen" />
                        </SelectTrigger>
                        <SelectContent>
                          {citisCar.map((city) => (
                            <SelectItem key={city.id} value={String(city.id)}>
                              {city.nombre}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex justify-center my-4 ">
                    <div className="flex flex-col sm:flex-row gap-2 w-full max-w-[384px]">
                      <div className="w-full sm:w-1/2">
                        <label htmlFor="">Fecha inicio</label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full text-left font-normal",
                                !formCarro.desde && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {formCarro.desde ? format(formCarro.desde, "dd-MM-yyyy") : <span>Pick a date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={new Date(formCarro.desde)}
                              onSelect={(e) => e && setFormCarro({ ...formCarro, desde: e.toISOString() })}
                              initialFocus
                              fromYear={new Date().getFullYear()} // o cualquier año mínimo que necesites
                              toYear={2030}
                              disabled={{ before: new Date(Date.now()) }}
                            />
                          </PopoverContent>
                        </Popover>

                      </div>
                      <div className="w-full sm:w-1/2">
                        <label htmlFor="">Fecha de fin</label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full text-left font-normal",
                                !formCarro.hasta && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {formCarro.hasta ? format(formCarro.hasta, "dd-MM-yyyy") : <span>Pick a date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={new Date(formCarro.hasta)}
                              onSelect={(e) => e && setFormCarro({ ...formCarro, hasta: e.toISOString() })}
                              initialFocus
                              fromYear={new Date().getFullYear()} // o cualquier año mínimo que necesites
                              toYear={2030}
                              disabled={{ before: new Date(Date.now()) }}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>

                  </div>
                </div>
              )}

              <div className="flex mt-10 mb-5 justify-center">
                <Button type="submit" >Buscar</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
