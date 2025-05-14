import type React from "react"
import { Globe, Search, Plane, Home, Tag } from "lucide-react"
import { useNavigate } from "react-router-dom";



const Header: React.FC = () => {
  const navigation = useNavigate();
  return (
    <header className="flex text-black items-center justify-between px-6 py-4 bg-transparent">
      <div className="flex items-center">
        <img src="src/assets/travelink2.png" onClick={()=>{navigation('/')}} className="w-20" />
      </div>

     

      <div className="flex items-center space-x-4">
        <button className="text-inherit bg-white p-2 shadow-sm rounded-full hover:bg-white/10">
          <Globe className="w-5 h-5" />
        </button>
        <button className="text-inherit p-2  bg-white shadow-sm rounded-full hover:bg-white/10">
          <Search className="w-5 h-5" />
        </button>
        <button className="text-inherit  bg-white px-4 shadow-sm py-2 rounded-full hover:bg-white/10">My Trips</button>
        <button onClick={()=>{navigation('/login')}} className="bg-white shadow-sm text-inherit px-4 py-2 rounded-full hover:bg-white/20">Sign In</button>
      </div>
    </header>
  )
}

export default Header
