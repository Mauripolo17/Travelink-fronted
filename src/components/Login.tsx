import type React from "react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { InputText } from "primereact/inputtext"
import { Password } from "primereact/password"
import { Checkbox } from "primereact/checkbox"
import { Button } from "flowbite-react";
import "primereact/resources/primereact.min.css"
import "primereact/resources/themes/lara-light-indigo/theme.css"
import "primeicons/primeicons.css"

export function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ email, password, rememberMe })
  }

  const handleGoogleLogin = () => {
    // Aquí va la lógica para redirigir al login con Google
    console.log("Iniciar sesión con Google")
  }

  const navigation = useNavigate();

  return (
    <div className="flex justify-center my-10">
      <div className="w-full max-w-2xl p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Iniciar Sesión</h1>
          <p className="mt-2 text-sm text-gray-600">Ingresa tus credenciales para acceder a tu cuenta</p>
        </div>



        <form className="mt-4 space-y-6" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Correo electrónico
            </label>
            <span className="p-input-icon-left w-full">
              <InputText
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
                placeholder="correo@ejemplo.com"
                required
              />
            </span>
          </div>

          <div className="field">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña
            </label>
            <InputText
              id="password"
              name="password"
              type="password"              
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full" />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Checkbox
                inputId="remember-me"
                name="remember-me"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.checked as boolean)}
                className="mr-2"
              />
              <label htmlFor="remember-me" className="text-sm text-gray-900">
                Recordarme
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-[#7C3AED] hover:text-purple-500">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <span className="text-gray-400 text-sm mt-2">— o —</span>
          </div>

          {/* Botón de Google */}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-100 transition"
            >
              <i className="pi pi-google"></i>
              Iniciar sesión con Google
            </button>
          </div>



          <div className="card flex justify-content-center py-3">
            <Button className="bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-blue-300 dark:focus:ring-blue-800">
              Buscar
            </Button>
          </div>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            ¿No tienes una cuenta?{" "}
            <Link to="/register" className="font-medium text-[#7C3AED] hover:text-purple-500">
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
