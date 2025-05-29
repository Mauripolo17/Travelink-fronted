"use client"
import  { CalendarIcon, Car, Plane, Hotel } from "lucide-react"
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
import { useReservaContext } from "@/context/ReservaContext car";
import { useNavigate } from "react-router-dom";
import { City, hotelService, Hotels } from "@/api/hotelService";



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

  

  const [formCarro, setFormCarro] = useState<reservaCarro>({
    lugar: "",
    desde: '',
    hasta: '',
  });
  const numeroDeHuespedes = [1, 2, 3, 4, 5,]

  const handleSelectChange = (value: string, name: string) => {
    setFormVuelo({ ...formVuelo, [name]: value })
  }



  const handleCalendar = (e: Date | undefined) => {
    if (e) {
      setFormVuelo({ ...formVuelo, desde: e.toISOString() });
    }
  }

  const [citie, setCities] = useState<string[]>([]);



// Estado para hoteles
const [cityHotels, setCityHotels] = useState<string[]>([]);
const [hotels, setHotels] = useState<Hotels[]>([]);
const [isSearching, setIsSearching] = useState(false);
const [formHoteles, setFormsHoteles] = useState({
  ciudad: "",
  inicio: "",
  hasta: "",
});

// Cargar ciudades al inicio
useEffect(() => {
  const loadCities = async () => {
    try {
      const response = await hotelService.getAllCity();
      if (response) {
        setCityHotels(response.map(c => c.nombre));
      }
    } catch (error) {
      console.error('Error cargando ciudades:', error);
    }
  };
  loadCities();
}, []);

const handleSelectChangeHoteles = (value: string, field: string) => {
  setFormsHoteles((prev) => ({
    ...prev,
    [field]: value,
  }));
  
  // Limpiar hoteles cuando cambie la ciudad
  if (field === "ciudad") {
    setHotels([]);
  }
};

const handleSearchHotels = async () => {
  if (!formHoteles.ciudad) {
    alert('Por favor selecciona una ciudad');
    return;
  }

  setIsSearching(true);
  try {
    const hotelesPorCiudad = await hotelService.getHotelsByCity(formHoteles.ciudad);
    console.log('Hoteles encontrados:', hotelesPorCiudad); // Para debug
    
    if (hotelesPorCiudad && Array.isArray(hotelesPorCiudad)) {
      setHotels(hotelesPorCiudad);
    } else {
      setHotels([]);
      console.warn('No se encontraron hoteles o la respuesta no es válida');
    }
  } catch (error) {
    console.error('Error buscando hoteles:', error);
    setHotels([]);
  } finally {
    setIsSearching(false);
  }
};

  // const handleCalendar2 = (e: Date | null) => {
  //   if (e) {
  //     setFormVuelo({ ...formVuelo, desde: e.toISOString() });
  //   }
  // }

const {setFlightToSearch} = useReservaContext();

const navegation = useNavigate()
  const handleOnSubmmuit = (e: any) => {
    e.preventDefault();
    if (activeTab === "flights") {
      setFlightToSearch(formVuelo);
      navegation("/flights")
      
    } else if (activeTab === "hotels") {
      console.log(formHoteles)
    } else if (activeTab === "cars") {
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
            <button
              className={`flex items-center gap-2 px-2 py-3 font-medium text-sm ${activeTab === "hotels"
                ? "border-b-2 border-blueT text-blueT bg-primary-50"
                : "text-gray-600 hover:bg-gray-50"
                }`}
              onClick={() => setActiveTab("hotels")}
            >
              <Hotel className="h-4 w-4" />
              Hoteles
            </button>
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
                          {citie.map((citie) => (
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
                          {citie.map((citie) => (
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
                  <div className="flex flex-col w-full justify-center">
                    <div className="flex justify-center gap-1 my-2">
                      <div className="flex flex-col w-full max-w-[384px]">
                        <label htmlFor="ciudad">Ciudad</label>
                        <Select 
                          value={formHoteles.ciudad}
                          onValueChange={(value) => handleSelectChangeHoteles(value, "ciudad")}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecciona una ciudad" />
                          </SelectTrigger>
                          <SelectContent>
                            {cityHotels.map((citie) => (
                              <SelectItem key={citie} value={citie}>
                                {citie}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex justify-center my-4">
                      <div className="flex flex-col sm:flex-row gap-2 max-w-[384px] w-full">
                        <div className="w-full sm:w-1/2">
                          <label htmlFor="fecha-inicio">Fecha inicio</label>
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
                                {formHoteles.inicio ? format(new Date(formHoteles.inicio), "dd-MM-yyyy") : <span>Seleccionar fecha</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={formHoteles.inicio ? new Date(formHoteles.inicio) : undefined}
                                onSelect={(date) => {
                                  if (date) {
                                    setFormsHoteles({ 
                                      ...formHoteles, 
                                      inicio: date.toISOString()
                                    });
                                  }
                                }}
                                initialFocus
                                fromYear={new Date().getFullYear()}
                                toYear={2030}
                                disabled={{ before: new Date() }}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div className="w-full sm:w-1/2">
                          <label htmlFor="fecha-fin">Fecha de fin</label>
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
                                {formHoteles.hasta ? format(new Date(formHoteles.hasta), "dd-MM-yyyy") : <span>Seleccionar fecha</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={formHoteles.hasta ? new Date(formHoteles.hasta) : undefined}
                                onSelect={(date) => {
                                  if (date) {
                                    setFormsHoteles({ 
                                      ...formHoteles, 
                                      hasta: date.toISOString()
                                    });
                                  }
                                }}
                                initialFocus
                                fromYear={new Date().getFullYear()}
                                toYear={2030}
                                disabled={{ 
                                  before: formHoteles.inicio ? new Date(formHoteles.inicio) : new Date()
                                }}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={handleSearchHotels}
                      disabled={!formHoteles.ciudad || isSearching}
                      className="mt-4 w-full max-w-[384px] mx-auto"
                    >
                      {isSearching ? "Buscando..." : "Buscar Hoteles"}
                    </Button>

                    {/* Mostrar mensaje cuando no hay hoteles */}
                    {!isSearching && formHoteles.ciudad && hotels.length === 0 && (
                      <div className="mt-4 text-center text-muted-foreground max-w-[384px] mx-auto">
                        No se encontraron hoteles en {formHoteles.ciudad}
                      </div>
                    )}

                    {/* Lista de hoteles */}
                    {hotels.length > 0 && (
                      <div className="mt-6 space-y-4 max-w-[384px] mx-auto">
                        <h3 className="text-lg font-semibold text-center">
                          Hoteles en {formHoteles.ciudad} ({hotels.length})
                        </h3>
                        {hotels.map((hotel) => (
                          <div key={hotel.id} className="border rounded-xl p-4 shadow hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-lg">{hotel.nombre}</h4>
                            <p className="text-sm text-muted-foreground mb-2">{hotel.descripcion}</p>
                            <div className="space-y-1 text-sm">
                              <p>📞 Teléfono: {hotel.telefono}</p>
                              <p>📧 Email: {hotel.email}</p>
                              <p>⭐ Estrellas: {"★".repeat(hotel.estrellas)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              {/* Contenido de Carros */}
              {activeTab === "cars" && (
                <div>
                  <div className="flex justify-center gap-1 my-2">
                    <div className="flex flex-col w-full max-w-[384px]">
                      <label htmlFor="">Ciudad</label>
                      <Select onValueChange={(value) => setFormCarro({ ...formCarro, lugar: value })}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Origen" />
                        </SelectTrigger>
                        <SelectContent>
                          {citie.map((citie) => (
                            <SelectItem key={citie} value={citie}>
                              {citie}
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
