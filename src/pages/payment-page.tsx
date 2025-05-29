import PaymentMethod from "@/components/payment-method";
import { useReservaContext } from "@/context/ReservaContext";

export function PaymentPage() {

    const reservationDetails = {
        origin: "New York (JFK)",
        destination: "Los Angeles (LAX)",
        date: "May 30, 2025",
        time: "10:30 AM",
        passengers: 2,
        flightNumber: "FL-1234",
        totalAmount: 549.98,
        currency: "USD",
      }

      const { flightSelected } = useReservaContext();
    return (
        <div className="flex min-h-svh flex-col items-center justify-center">
          <div className="flex-1 pt-30 w-full max-w-5/6 md:max-w-1/2  ">
            <PaymentMethod reservationDetails={reservationDetails} />
          </div>
        </div>
      )
}