// components/Checkout.tsx
'use client';
import React, { useEffect } from 'react';

interface CheckoutProps {
  amount: number;
  currency: string;
  onSuccess: (response: any) => void;
  onFailure: (error: any) => void;
}

const Checkout: React.FC<CheckoutProps> = ({ amount, currency, onSuccess, onFailure }) => {
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).MamoCheckout) {
      const mamoCheckout = new (window as any).MamoCheckout({
        amount: amount,
        currency: currency,
        onSuccess: onSuccess,
        onFailure: onFailure,
      });

      const handleCheckout = () => {
        mamoCheckout.checkout();
      };

      const checkoutButton = document.getElementById('checkout-button');
      if (checkoutButton) {
        checkoutButton.addEventListener('click', handleCheckout);
      }

      return () => {
        if (checkoutButton) {
          checkoutButton.removeEventListener('click', handleCheckout);
        }
      };
    }
  }, [amount, currency, onSuccess, onFailure]);

  return (
    <button id="checkout-button" disabled={!(window as any).MamoCheckout}>
      Checkout
    </button>
  );
};

export default Checkout;
