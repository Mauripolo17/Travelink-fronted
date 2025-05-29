"use client";
import { CarResponse } from "@/interfaces/car";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { ModalCar } from "./modalCar"; // Ensure this component exists and is correctly implemented
import { useState } from "react";



export function CardDemo({ car }: { car: CarResponse }) {
  const [showModal, setShowModal] = useState(false);

  const img: string = car.imagen

  return (
    <>
    <div onClick={() => setShowModal(true)} className="max-w-xs w-full group/card bg-gray-50 rounded-lg shadow-md overflow-hidden text-gray-700 hover:text-gray-200">
      <div
        className={cn(
          " cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl  max-w-sm mx-auto backgroundImage flex flex-col justify-between p-4",
        )}
      >
        <div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-black opacity-60"></div>
        <div className="flex flex-row items-center space-x-4 z-10">
        </div>
        <div className="text content">
            <img src= { img } alt="" />
            <p className="font-normal text-sm relative z-10 my-4 ">
                Card with Author avatar, complete name and time to read - most
                suitable for blogs.
            </p>
            <Button variant={"destructive"}>View details</Button>
        </div>
      </div>
    </div>
    {showModal && (
        <ModalCar car={car} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}
