/* eslint-disable import/no-anonymous-default-export */
import { NextRequest, NextResponse } from "next/server"

type Data = {
  sessionId: string
  amount: number
  currency: string
}

export async function POST(
  req: NextRequest,
) {
  if (req.method === "POST") {
    const { amount, currency, email, firstName, lastName } = await req.json()

    try {
      console.log(
        JSON.stringify({
          title: "Chocolate Box - Small",
          amount,
          amount_currency: currency,
          link_type: "inline",
          email,
          first_name: firstName,
          last_name: lastName
        })
      )

      const response = await fetch(
        "https://sandbox.dev.business.mamopay.com/manage_api/v1/links",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer sk-a83af377-2fd5-4991-8202-e74801df8d98`
          },
          body: JSON.stringify({
            title: "Chocolate Box - Small",
            amount,
            amount_currency: currency,
            link_type: "inline",
            email,
            first_name: firstName,
            last_name: lastName
          })
        }
      )

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`)
      }

      const data = await response.json()
      return NextResponse.json(data)
    } catch (error) {
      return NextResponse.json(
        { error: (error as Error).message },
        { status: 500 }
      )
    }
  }
}
