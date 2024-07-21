type PaymentLinkArgs = {
    amount: number;
    currency: string;
    email: string;
    firstName: string;
    lastName: string;
    handleSuccess: (data: any) => void;
    handleFailure: (error: any) => void
};
  export const createPaymentLink = async (args: PaymentLinkArgs) => {
    const { amount, currency, email, firstName, lastName, handleFailure, handleSuccess } = args
    try {
      

      const response = await fetch("/api/create-payment-lik", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ amount, currency, email, firstName, lastName })
      })

      const data = await response.json()
      if (response.ok) {
        console.log("Payment link created:", data)
        handleSuccess(data)
        // Use the payment link as needed
      } else {
        console.error("Error creating payment link:", data)
        handleFailure(data)
      }
    } catch (error) {
      handleFailure(error)
      console.error("Error:", error)
    }
  }

