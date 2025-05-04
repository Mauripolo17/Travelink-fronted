import type React from "react"
import { Globe, Search, Plane, Home, Tag } from "lucide-react"



const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-indigo-300">
      <div className="flex items-center">
        <img src="src/assets/travelink-logo.png" alt="" className="w-20" />
      </div>

     

      <div className="flex items-center space-x-4">
        <button className="text-white p-2 rounded-full hover:bg-white/10">
          <Globe className="w-5 h-5" />
        </button>
        <button className="text-white p-2 rounded-full hover:bg-white/10">
          <Search className="w-5 h-5" />
        </button>
        <button className="text-white px-4 py-2 rounded-full hover:bg-white/10">My Trips</button>
        <button className="bg-white/10 text-white px-4 py-2 rounded-full hover:bg-white/20">Sign In</button>
      </div>
    </header>
  )
}

export default Header
