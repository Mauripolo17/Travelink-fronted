import { useEffect, useState } from "react";
import { CarResponse } from "@/interfaces/car";
import { CardDemo } from "./ui/cardDemo";
import { Button } from "./ui/button";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { VehicleService } from "@/services/VehicleService";
import { LocationService, Location } from "@/services/LocationService";
import { useCarReservaContext } from "@/context/ReservaContextCar";


export default function VehicleResultsComponent({ cars }: { cars: CarResponse[] }) {
  const [availableCars, setAvailableCars] = useState<CarResponse[]>(cars);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [locacionId, setLocacionId] = useState<number | undefined>();
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);

  const { setCarSelected, setRentalDates } = useCarReservaContext();

  // Cargar locaciones al iniciar
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const data = await LocationService.getAll();
        setLocations(data);
        if (data.length > 0) setLocacionId(data[0].id);
      } catch (error) {
        console.error("Error al cargar locaciones:", error);
      }
    };

    fetchLocations();
  }, []);

  // Actualizar fechas en context cuando cambian las fechas locales
  useEffect(() => {
    if (startDate && endDate) {
      setRentalDates({
        inicio: startDate.toISOString().split("T")[0],
        fin: endDate.toISOString().split("T")[0],
      });
    } else {
      setRentalDates(null);
    }
  }, [startDate, endDate, setRentalDates]);

  const buscarVehiculos = async () => {
    if (!startDate || !endDate || !locacionId) {
      alert("Debes seleccionar la locación y ambas fechas.");
      return;
    }

    setLoading(true);
    try {
      const formattedInicio = startDate.toISOString().split("T")[0];
      const formattedFin = endDate.toISOString().split("T")[0];
      const data = await VehicleService.getAvailableCars(locacionId, formattedInicio, formattedFin);
      setAvailableCars(data);
    } catch (error) {
      console.error("Error buscando vehículos disponibles:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCar = (car: CarResponse) => {
    setCarSelected(car);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 w-full max-w-4xl m-12">
        {/* Locación */}
        <select
          value={locacionId}
          onChange={(e) => setLocacionId(Number(e.target.value))}
          className="border rounded p-2 w-full md:w-48"
        >
          {locations.map((loc) => (
            <option key={loc.id} value={loc.id}>
              {loc.nombre}
            </option>
          ))}
        </select>

        {/* Fecha de inicio */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full md:w-48 justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {startDate ? (
                <span>{startDate.toLocaleDateString("es-CO")}</span>
              ) : (
                <span className="text-muted-foreground">Fecha inicio</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
          </PopoverContent>
        </Popover>

        {/* Fecha de fin */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full md:w-48 justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {endDate ? (
                <span>{endDate.toLocaleDateString("es-CO")}</span>
              ) : (
                <span className="text-muted-foreground">Fecha fin</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
          </PopoverContent>
        </Popover>

        {/* Botón buscar */}
        <Button onClick={buscarVehiculos} className="w-full md:w-auto mt-2 md:mt-0">
          Buscar
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 m-12">
        {loading ? (
          <p className="col-span-full text-center">Cargando vehículos disponibles...</p>
        ) : availableCars.length === 0 ? (
          <p className="col-span-full text-center text-muted-foreground">No hay vehículos disponibles.</p>
        ) : (
          availableCars.map((carro) => (
            <div
              key={carro.placa}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => handleSelectCar(carro)}
            >
              <CardDemo car={carro} />
            </div>
          ))
        )}
      </div>
    </>
  );
}
