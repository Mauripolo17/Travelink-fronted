import FlightResults from "@/components/flight-results";


export default function FlightResultsPage() {
  
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <div className="flex-1 pt-30 w-full max-w-5/6 md:max-w-1/2  ">
        <FlightResults />
      </div>
    </div>
  )
}
