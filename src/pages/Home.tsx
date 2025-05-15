import SearchComponent from "@/components/search-component";




export default function Home() {


  return (
    <div className="flex  min-h-dvh flex-col items-center justify-center">
      <div className="w-full max-w-3xl md:max-w-3xl">
        <SearchComponent />
      </div>
    </div>
  )
}
