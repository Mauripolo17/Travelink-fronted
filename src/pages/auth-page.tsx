"use client"

import { useState } from "react"
import { LoginForm } from "@/components/login-form"
import  { Login } from "../components/Login"
import RegisterForm from "../components/register-form.tsx"
import { SignupForm } from "@/components/signup-form.tsx"

export default function LoginPage() {
  const [showLogin, setShowLogin] = useState(true)

  return (
    <div className="flex min-h-svh flex-col items-center justify-center  p-6 md:p-10">
      <div className="w-md max-w-sm md:max-w-3xl">
        <LoginForm />
      </div>
    </div>
  )
}
