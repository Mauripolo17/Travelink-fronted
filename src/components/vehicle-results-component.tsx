import { useEffect, useState } from "react";
import { CarResponse } from "@/interfaces/car";
import { CardDemo } from "./ui/cardDemo";
import { Button } from "./ui/button";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { VehicleService } from "@/services/VehicleService";
import { LocationService, Location } from "@/services/LocationService";

export default function VehicleResultsComponent({ cars }: { cars: CarResponse[] }) {
  const [availableCars, setAvailableCars] = useState<CarResponse[]>(cars);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [locacionId, setLocacionId] = useState<number | undefined>();
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);

  const citisCar: Location[] =
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
    const fetchLocations = async () => {
      try {
        setLocations(citisCar);
        if (citisCar.length > 0) setLocacionId(citisCar[0].id); // Seleccionar la primera por defecto
      } catch (error) {
        console.error("Error al cargar locaciones:", error);
      }
    };
    fetchLocations();
  }, []);

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

  return (
    <>
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
    <h2 className="text-black font-bold text-3xl invert">Resultados de busqueda</h2>
    <div className="flex flex-wrap gap-6 m-12">
        {loading ? (
          <p className="col-span-full text-center">Cargando vehículos disponibles...</p>
        ) : availableCars.length === 0 ? (
          <p className="col-span-full text-center text-muted-foreground">No hay vehículos disponibles.</p>
        ) : (
          
          availableCars.map((carro) => (
            <div key={carro.placa} className="flex flex-col items-center">
              <CardDemo car={carro} />
            </div>
          ))
        )}
      </div>
    </div>
      
    </>
  );
}
