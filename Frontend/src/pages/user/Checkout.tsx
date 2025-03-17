import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { paymentConfirmation } from "@/service/user/userApi";
console.log("Stripe Key:", import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

interface PaymentFormProps {
    userSecret: string;
    guideId: string;
    amount: string;
    userEmail: string;
    slotId?: string;
    paymentIntentid: string
    locationId:string
}


const PaymentForm: React.FC<PaymentFormProps> = ({ userSecret, guideId, amount, userEmail, slotId, paymentIntentid,locationId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    console.log("User Secret:",locationId);
  }, [userSecret]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;

    setLoading(true);
    setError(null);

    try {
      const { paymentIntent, error } = await stripe.confirmCardPayment(userSecret, {
        payment_method: { card: cardElement },
      });

      if (error) {
        setError(error.message);
      } else {
        setSuccess(true);
        const response = await paymentConfirmation({userSecret, guideId, amount, userEmail, slotId, paymentIntentid,locationId})
        console.log(response, 'cn')
      }
    } catch (err) {
      setError("Payment failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
      <h2 className="text-xl font-bold mb-4 text-center">Complete Your Payment</h2>
      <p className="mb-4 text-center text-gray-600">Amount: ${amount}</p>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded">
          {error}
        </div>
      )}
      
      {success ? (
        <div className="p-4 bg-green-100 border border-green-300 text-green-700 rounded text-center">
          <p className="font-semibold">Payment successful!</p>
          <p className="mt-2">Thank you for your booking.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2 font-medium">Card Details</label>
            <div className="border border-gray-300 p-3 rounded focus-within:ring-2 focus-within:ring-black">
              <CardElement 
                options={{ 
                  style: { 
                    base: { 
                      fontSize: '16px',
                      color: '#424770',
                      '::placeholder': {
                        color: '#aab7c4',
                      },
                    },
                    invalid: {
                      color: '#9e2146',
                    },
                  },
                }} 
              />
            </div>
          </div>
          <button 
            type="submit" 
            disabled={!stripe || loading}
            className={`w-full py-3 rounded-md flex justify-center items-center transition-colors ${
              !stripe || loading 
              ? 'bg-gray-400 text-gray-100 cursor-not-allowed' 
              : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              'Pay Now'
            )}
          </button>
        </form>
      )}
    </div>
  );
};


const Payment: React.FC<PaymentFormProps> = ({ userSecret, guideId, amount, userEmail, slotId, paymentIntentid,locationId }) => {
  console.log('g', guideId, amount, userEmail, slotId,locationId);
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Elements stripe={stripePromise} options={{ clientSecret: userSecret }}>
        <PaymentForm 
          userSecret={userSecret}  
          guideId={guideId} 
          amount={amount} 
          userEmail={userEmail} 
          slotId={slotId}
          paymentIntentid={paymentIntentid}
          locationId={locationId}
        />
      </Elements>
    </div>
  );
};

export default Payment;