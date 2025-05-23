"use client"

import { User, Settings, LogOut } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/AuthContext"

export function NavUser() {
  const items = [
    {
        title: "Acerca de cuenta",
        url: "#",
        icon: User,
    },
    {
        title: "Settings",
        url: "#",
        icon: Settings,
    },
    {
        title: "Cerrar sesión",
        url: "#",
        icon: LogOut,
    }
]

 const {logout} = useAuth();
const handleLogOut = () => {
  logout()
}
const { user } = useAuth();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="rounded-lg py-2 px-2 hover:bg-gray-100 cursor-pointer">
          <div className="flex items-center justify-between gap-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="font-Montserrat text-sm font-semibold text-gray-500">
              <p>{user?.nombre}</p>
            </div>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-55" side="right" align="start">
        <div className="rounded-lg py-2  ">
          <div className="flex items-center justify-between pb-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="font-Montserrat text-sm font-semibold text-gray-500">
              <p>Mauricio Polo</p>
              <p>maurp17@gmal.com</p>
            </div>
          </div>
          <hr className="p-2"/>
          <div>
            {items.map((item) => (
              <div onClick={handleLogOut} key={item.title} className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-gray-100 cursor-pointer">
                <item.icon className="h-5 w-5 text-gray-500" />
                <p className="font-Montserrat text-sm font-semibold text-gray-500">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>


  )
}
