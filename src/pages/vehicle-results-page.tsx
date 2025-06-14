"use client";

import { useEffect, useState } from "react";
import VehicleResultsComponent from "@/components/vehicle-results-component";
import { CarResponse } from "@/interfaces/car";
import { VehicleService } from "@/services/VehicleService";
import { useReservaContext } from "@/context/ReservaContext";

export default function VehicleResults() {
  const [cars, setCars] = useState<CarResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { carToSearch } = useReservaContext();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await VehicleService.getAvailableCars(carToSearch);
        setCars(data);
      } catch (error) {
        console.error("Error al obtener los vehículos:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) return <div className="text-center mt-10">Cargando vehículos...</div>;
  if (error) return <div className="text-red-500 text-center mt-10">Error al cargar vehículos.</div>;
  console.log("Vehículos obtenidos:", cars);
  return (
    <div className="min-h-svh flex-col items-center justify-center">
      <VehicleResultsComponent cars={cars} />
    </div>
  );
}
