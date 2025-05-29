

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreditCard, Plane, Calendar, Clock, Users, DollarSign } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { VueloInfo } from "@/api/vuelosService"
import { useReservaContext } from "@/context/ReservaContext"
import { set } from "date-fns"

interface ReservationDetails {
  origin: string
  destination: string
  date: string
  time: string
  passengers: number
  flightNumber: string
  totalAmount: number
  currency: string
}

interface PaymentMethodProps {
  reservationDetails: VueloInfo
}

export default function PaymentMethod({ reservationDetails }: PaymentMethodProps) {
  const [selectedMethod, setSelectedMethod] = useState("card")

  const paymentMethods = [
    {
      id: "card",
      name: "Card",
      icon: <CreditCard className="h-6 w-6" />,
    },
    {
      id: "paypal",
      name: "Paypal",
      icon: (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.26-.93 4.778-4.005 6.495-7.974 6.495h-2.19c-.524 0-.968.382-1.05.9L8.238 20.9h4.605a.641.641 0 0 0 .633-.74l.034-.207.65-4.131.042-.23a.641.641 0 0 1 .633-.74h.4c3.131 0 5.583-1.275 6.294-4.958.297-1.54.143-2.827-.653-3.707z" />
        </svg>
      ),
    },
    {
      id: "apple",
      name: "Apple",
      icon: (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
        </svg>
      ),
    },
  ]

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount)
  }

  const { paymentSuccess, setPaymentSuccess} = useReservaContext()

  function handledPay(e: any) {
    if (setPaymentSuccess) {
      setTimeout(() => {
        setPaymentSuccess(true)
      }, 3000) // Simulate a delay for payment processing
    }
    e.preventDefault()
  }
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Payment Method</CardTitle>
        <CardDescription>Add a new payment method to your account.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 flex gap-5">
        <div> <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="First Last" className="bg-gray-50" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input id="city" className="bg-gray-50" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="card-number">Card number</Label>
            <Input id="card-number" className="bg-gray-50" />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-2">
              <Label htmlFor="expires">Expires</Label>
              <Select>
                <SelectTrigger className="bg-gray-50">
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => (
                    <SelectItem key={i + 1} value={String(i + 1).padStart(2, "0")}>
                      {String(i + 1).padStart(2, "0")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Select>
                <SelectTrigger className="bg-gray-50">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 10 }, (_, i) => {
                    const year = new Date().getFullYear() + i
                    return (
                      <SelectItem key={year} value={String(year)}>
                        {year}
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cvc">CVC</Label>
              <Input id="cvc" placeholder="CVC" className="bg-gray-50" maxLength={4} />
            </div>
          </div>
          <Button onClick={handledPay} className="w-full bg-black hover:bg-gray-800 text-white">Continue</Button></div>

        </div>
        <div className="bg-gray-50 p-4 rounded-lg space-y-3 w-lg">
          <h3 className="font-medium text-sm text-gray-700">Reservation Details</h3>

          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-2">
              <Plane className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600">Flight:</span>
            </div>
            <div className="font-medium">{reservationDetails.id}</div>

            <div className="flex items-center gap-2">
              <span className="text-gray-600">From:</span>
            </div>
            <div className="font-medium">{reservationDetails.origen}</div>

            <div className="flex items-center gap-2">
              <span className="text-gray-600">To:</span>
            </div>
            <div className="font-medium">{reservationDetails.destino}</div>

            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600">Date:</span>
            </div>
            <div className="font-medium">{reservationDetails.fechaDeSalida}</div>

            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600">Time:</span>
            </div>
            <div className="font-medium">{reservationDetails.horaDeSalida}</div>

            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600">Passengers:</span>
            </div>
            <div className="font-medium">{1}</div>
          </div>

          <Separator className="my-2" />

          <div className="flex justify-between items-center font-medium">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-gray-700" />
              <span>Total Amount:</span>
            </div>
            <div className="text-lg">{formatCurrency(reservationDetails.precio, "USD")}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
