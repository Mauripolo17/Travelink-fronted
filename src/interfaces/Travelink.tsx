"use client"

import type React from "react"
import { useState } from "react"
import Header from "../components/Header"
import { Globe, Search, Plane, Home, Tag } from "lucide-react"

interface NavItemProps {
  icon: React.ReactNode
  label: string
  active?: boolean
}
const NavItem: React.FC<NavItemProps> = ({ icon, label, active }) => {
  return (
    <button
      className={`flex items-center gap-2 px-4 py-2 rounded-full text-white ${active ? "bg-white/20" : "hover:bg-white/10"
        }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  )
}


const NavItemProps: React.FC<NavItemProps> = ({ icon, label, active }) => {
  return (
    <button
      className={`flex items-center gap-2 px-4 py-2 rounded-full text-white ${active ? "bg-white/20" : "hover:bg-white/10"
        }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  )
}

interface SearchInputProps {
  label: string
  placeholder: string
  value: string
  onChange: (value: string) => void
}

const SearchInput: React.FC<SearchInputProps> = ({ label, placeholder, value, onChange }) => {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent outline-none text-gray-800 placeholder-gray-500"
      />
    </div>
  )
}


const TravelinkInterface: React.FC = () => {
  const [destination, setDestination] = useState("")
  const [dates, setDates] = useState("")
  const [guests, setGuests] = useState("2 guests")

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">

      </div>


      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/10 z-10"></div>

      {/* Content */}
      <div className="relative z-20 w-full h-full">
        {/* Navigation Bar */}
        <Header />


        {/* Main Search Form */}
        <div className="flex justify-center items-center h-[calc(60vh-100px)] shared-gradient pt-10 pb-20">

          <div className="flex flex-col items-center space-x-2">
            <div className="flex items-center space-x-2">
              <div className="flex bg-white/10 rounded-full p-1">
                <NavItem icon={<Home className="w-5 h-5" />} label="Hoteles" active />
                <NavItem icon={<Plane className="w-5 h-5" />} label="VUelos" />
                <NavItem icon={<Tag className="w-5 h-5" />} label="Autos" />
              </div>
            </div>
            <div className="relative bg-white rounded-full p-2 shadow-lg max-w-4xl w-full">

              <div className="flex items-center">
                <div className="flex-1 border-r p-2">
                  <SearchInput
                    label="Where"
                    placeholder="Search destination"
                    value={destination}
                    onChange={setDestination}
                  />
                </div>
                <div className="flex-1 border-r p-2">
                  <SearchInput label="Dates" placeholder="Add dates" value={dates} onChange={setDates} />
                </div>
                <div className="flex-1 p-2">
                  <SearchInput label="Guests" placeholder="Add guests" value={guests} onChange={setGuests} />
                </div>
                <button className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full">
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

        </div>
      
      </div>
    </div>
  )
}

export default TravelinkInterface
