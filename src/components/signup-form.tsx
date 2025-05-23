"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useNavigate } from "react-router-dom"
import { signupRequest } from "@/api/authService"
import { useAuth } from "@/context/AuthContext"

export function SignupForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const [date, setDate] = useState<Date>()
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const { signup} = useAuth()
  const [signupRequest, setSignupRequest] = useState<signupRequest>({
    username:'',
    email:'',
    password:'',
    nombre:'',
    apellido:'',
    numeroDocumento:0,
    direccion:'',
    telefono:0,
    fechaDeNacimiento:'',
  })

  const handlePasswordConfirm = (e: React.FocusEvent<HTMLInputElement>) => {
    const password = document.getElementById("password") as HTMLInputElement
    if (password.value !== e.target.value) {
      setPasswordError("Las contraseñas no coinciden")
    } else {
      setPasswordError(null)
    }
  }
  const navigation = useNavigate();

  const handlesignup = async (e: any) => {
    e.preventDefault()
    signup(signupRequest)
    navigation('/login')
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Crear una cuenta</CardTitle>
          <CardDescription>Regístrate con tu cuenta de Google</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlesignup}>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <Button variant="outline" className="w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mr-2 h-4 w-4">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Registrarse con Google
                </Button>
              </div>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">O continúa con</span>
              </div>
              <div className="grid gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="firstName">Nombre</Label>
                    <Input id="firstName" name="firstName" value={signupRequest.nombre} onChange={(value)=>{setSignupRequest({...signupRequest, nombre: value.target.value} )}} placeholder="Juan" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lastName">Apellido</Label>
                    <Input id="lastName" name="lastName" value={signupRequest.apellido} onChange={(value)=>{setSignupRequest({...signupRequest, apellido: value.target.value} )}} placeholder="Pérez" required />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input id="email" type="email" name="email" value={signupRequest.email} onChange={(value)=>{setSignupRequest({...signupRequest, email: value.target.value} )}} placeholder="juan@ejemplo.com" required />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="password">Contraseña</Label>
                    <Input id="password" name="password" value={signupRequest.password} onChange={(value)=>{setSignupRequest({...signupRequest, password: value.target.value} )}} type="password" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required
                      onBlur={handlePasswordConfirm}
                    />
                    {passwordError && <p className="text-sm text-destructive">{passwordError}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="birthdate">Fecha de nacimiento</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn("w-full justify-start text-left font-normal", !signupRequest.fechaDeNacimiento && "text-muted-foreground")}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {signupRequest.fechaDeNacimiento ? format(signupRequest.fechaDeNacimiento, "dd-MM-yyyy", { locale: es }) : "Selecciona una fecha"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={new Date(signupRequest.fechaDeNacimiento)}
                          onSelect={(e) => e && setSignupRequest({ ...signupRequest, fechaDeNacimiento: e.toISOString()})}
                          initialFocus
                          
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="numerID">Numero de documento</Label>
                    <Input type="number" id="numerID" name="numerID" value={signupRequest.numeroDocumento} onChange={(value)=>{setSignupRequest({...signupRequest, numeroDocumento: Number(value.target.value)} )}} placeholder="Juan" required />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="telefono">Telefono</Label>
                    <Input id="telefono" type="number" name="telefono" value={signupRequest.telefono} onChange={(value)=>{setSignupRequest({...signupRequest, telefono: Number(value.target.value)} )}} placeholder="Juan" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="direccion">Direccion</Label>
                    <Input id="direccion" name="direccion" value={signupRequest.direccion} onChange={(value)=>{setSignupRequest({...signupRequest, direccion: value.target.value} )}} placeholder="Pérez" required />
                  </div>
                </div>

                <Button onClick={handlesignup} className="w-full">
                  Crear cuenta
                </Button>
              </div>
              <div className="text-center text-sm">
                ¿Ya tienes una cuenta?{" "}
                <a onClick={() => { navigation('/login') }} href="#" className="underline underline-offset-4">
                  Iniciar sesión
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-center text-xs text-white [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
        Al hacer clic en continuar, aceptas nuestros <a href="#">Términos de Servicio</a> y{" "}
        <a href="#">Política de Privacidad</a>.
      </div>
    </div>
  )
}
