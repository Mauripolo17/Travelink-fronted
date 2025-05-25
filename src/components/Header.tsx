import type React from "react"
import { Globe, Search} from "lucide-react"
import { useNavigate } from "react-router-dom";
import { use } from "react";
import { useAuth } from "@/context/AuthContext";



const Header: React.FC = () => {
  const navigation = useNavigate();
  const {  user } = useAuth();

  return (
    <header className="flex text-black items-center justify-between px-6 py-4 bg-transparent">
      <div className="flex items-center">
        <img src="src/assets/travelink2.png" onClick={()=>{navigation('/')}} className="w-20 ml-20" />
      </div>

     

      <div className="flex items-center space-x-4">
        <button className="text-inherit bg-white p-2 shadow-sm rounded-full hover:bg-white/10">
          <Globe className="w-5 h-5" />
        </button>
        
        <button className="text-inherit  bg-white px-4 shadow-sm py-2 rounded-full hover:bg-white/10">My Trips</button>
        {user ? (
          <button className="text-inherit bg-white px-4 shadow-sm py-2 rounded-full hover:bg-white/10" onClick={() => navigation('/dashboard')}>Dashboard</button>
        ) : (
          <button className="text-inherit bg-white px-4 shadow-sm py-2 rounded-full hover:bg-white/10" onClick={() => navigation('/login')}>Login</button>
        )}
      </div>
    </header>
  )
}

export default Header
