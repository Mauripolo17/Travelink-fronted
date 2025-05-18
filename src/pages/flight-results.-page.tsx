import { Flights } from "@/components/flight-results-component";


export default function FlightResults() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <div className="flex-1 pt-30 w-2xl max-w-sm md:max-w-3xl">
        <Flights/>
      </div>
    </div>
  )
}
