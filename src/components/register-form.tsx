"use client"
import type React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { InputText } from "primereact/inputtext"
import { Password } from "primereact/password"
import { Dropdown } from "primereact/dropdown"
import { Calendar } from "primereact/calendar"
import { Button } from "flowbite-react";

interface GenderOption {
    name: string
    value: string
}

export default function RegisterForm() {
    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        genero: "",
        fechaNacimiento: null as Date | null,
        email: "",
        password: "",
    })

    const genderOptions: GenderOption[] = [
        { name: "Masculino", value: "masculino" },
        { name: "Femenino", value: "femenino" },
        { name: "Otro", value: "otro" },
        { name: "Prefiero no decir", value: "prefiero-no-decir" },
    ]

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Aquí iría la lógica de registro
        console.log(formData)
    }

    return (
        <div className="flex justify-center">
            <div className="w-full max-w-2xl p-8  bg-white rounded-lg shadow-lg">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900">Crear Cuenta</h1>
                    <p className="mt-2 text-sm text-gray-600">Completa el formulario para registrarte</p>
                </div>

                <form className="mt-6 justify-items-center" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-2 justify-evenly w-full">
                        <div className="field">
                            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                                Nombre
                            </label>
                            <InputText
                                id="nombre"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleTextChange}
                                className="w-full"
                                required
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="apellido" className="block text-sm font-medium text-gray-700 mb-2">
                                Apellido
                            </label>
                            <InputText
                                id="apellido"
                                name="apellido"
                                value={formData.apellido}
                                onChange={handleTextChange}
                                className="w-full"
                                required
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 justify-evenly w-full">
                        <div className="field">
                            <label htmlFor="genero" className="block text-sm font-medium text-gray-700 mb-2">
                                Género
                            </label>
                            <Dropdown
                                id="genero"
                                value={formData.genero}
                                options={genderOptions}
                                onChange={(e) => setFormData({ ...formData, genero: e.value })}
                                optionLabel="name"
                                placeholder="Selecciona una opción"
                                className="w-63"
                                required
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="fechaNacimiento" className="block text-sm font-medium text-gray-700 mb-2">
                                Fecha de Nacimiento
                            </label>
                            <Calendar
                                id="fechaNacimiento"
                                value={formData.fechaNacimiento}
                                onChange={(e) => setFormData({ ...formData, fechaNacimiento: e.value as Date | null })}
                                dateFormat="dd-mm-yy"
                                className="w-full"
                                required
                            />
                        </div>
                    </div>

                    <div className="field  md:w-full sm:w-auto px-1">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Correo electrónico
                        </label>
                        <span className="p-input-icon-left w-full">
                            <InputText
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleTextChange}
                                className="w-full"
                                placeholder="correo@ejemplo.com"
                                required
                            />
                        </span>
                    </div>
                    <div className="grid grid-cols-2 justify-evenly w-full">
                        <div className="field">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Contraseña
                            </label>
                            <Password
                                id="password"
                                type="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                toggleMask
                                pt={{
                                    input:{
                                        className:"w-61"
                                    }
                                }}                      
                                />
                            <p className="mt-1 text-xs text-gray-500">La contraseña debe tener al menos 8 caracteres</p>
                        </div>

                        <div className="field">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Contraseña
                            </label>
                            <Password
                                id="password"
                                type="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                toggleMask
                                pt={{
                                    input:{
                                        className:"w-61"
                                    }
                                }}
                                />
                        </div>
                    </div>


                    <div className="card flex justify-content-center py-3">
                        <Button className="bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-blue-300 dark:focus:ring-blue-800">
                            Buscar
                        </Button>
                    </div>
                </form>

                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        ¿Ya tienes una cuenta?{" "}
                        <Link to="/login" className="font-medium text-[#7C3AED] hover:text-purple-500">
                            Iniciar Sesión
                        </Link>
                    </p>
                </div>
            </div></div>
    )
}
