// app/payment/page.tsx
"use client"

import React, { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { PaymentLinkResponse } from "../types/responses/payment-link"
import { createPaymentLink } from "../utils/client-apis/create-pyament-link"
import ErrorNotification from "../components/errorNotification"

const Checkout = dynamic(() => import("../components/checkout"), { ssr: false })

const PaymentPage: React.FC = () => {
  const [amount, setAmount] = useState(1000)
  const [currency, setCurrency] = useState("AED")
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [response, setReponse] = useState<PaymentLinkResponse | null>(null)

  const [error, setError] = useState("")
  const [isNotificationVisible, setIsNotificationVisible] = useState(false)

  const handleSuccess = (response: any) => {
    setError("")
    setReponse(response)
    setIsNotificationVisible(false)
  }

 
  const handleFailure = (error: any) => {
    setError("Payment Failed:" + error.message)
    setIsNotificationVisible(true)
    console.log("handleFailure Payment Failed:", error)
    console.log(error, isNotificationVisible);
    setReponse(null)
  }

  const handlePayment = async () => {
    try {
      await createPaymentLink({
        amount,
        currency,
        email,
        firstName,
        lastName,
        handleSuccess,
        handleFailure
      })
    } catch (error) {
      handleFailure(error)
      console.error("Error:", error)
    }
  }

  useEffect(() => {
    if (response) {
      console.log("Redirecting to payment page:", response.payment_url)
      window.location.href = response.payment_url
    }
  }, [response, response?.id])

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Payment Page
        </h1>
        <div className="space-y-4">
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handlePayment}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Create Payment Link
          </button>
        </div>
        <div className="mt-6">
          <Checkout
            amount={amount}
            currency={currency}
            onSuccess={handleSuccess}
            onFailure={handleFailure}
          />
        </div>
        <ErrorNotification
          message={error}
          isVisible={isNotificationVisible}
          onClose={() => setIsNotificationVisible(false)}
        />
      </div>
    </div>
  )
}

export default PaymentPage
