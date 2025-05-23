import { Plane, Home, Car, Hotel, Settings, Search } from "lucide-react"

import { useNavigate } from "react-router-dom";
import { NavUser } from "./nav-user";
import { useAuth } from "@/context/AuthContext";

// Menu items.
const items = [
    {
        title: "Home",
        url: "#",
        icon: Home,
    },
    {
        title: "Mis vuelos",
        url: "#",
        icon: Plane,
    },
    {
        title: "Mis carros",
        url: "#",
        icon: Car,
    },
    {
        title: "Mis hoteles",
        url: "#",
        icon: Hotel,
    },
    {
        title: "Buscar reserva",
        url: "#",
        icon: Search,
    },
]

const data = {
    teams: [
        {
            name: "Acme Inc",
            logo: '',
            plan: "Enterprise",
        },
        {
            name: "Acme Corp.",
            logo: '',
            plan: "Startup",
        },
        {
            name: "Evil Corp.",
            logo: 'Command',
            plan: "Free",
        },
    ],
}
export function AppSidebar() {
    const { user } = useAuth();
    const navigation = useNavigate();
    return (
        <div className="bg-white rounded-xl flex flex-col   h-[80svh] shadow-md">
            <div className="flex flex-col items-center gap-3 p-4 w-54 h-svh font-Montserrat text-md  text-gray-500">
                <div>
                    <NavUser />
                </div>
                {items.map((item) => (
                    <div className="flex w-full hover:bg-gray-200 rounded-lg p-2 gap-2 cursor-pointer" key={item.title} onClick={() => navigation(item.url)}>
                        <item.icon className="h-5 w-5  text-gray-500" />
                        {item.title}
                    </div>
                ))}
            </div>

        </div>
    )
}
