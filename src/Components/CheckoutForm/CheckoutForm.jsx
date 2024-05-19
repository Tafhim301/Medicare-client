import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";



const CheckoutForm = ({ test ,discountedPrice}) => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate()
    const { user } = useAuth();
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('')
    const [transactionId, setTransactionId] = useState('')
    const [clientSecret, setClientSecret] = useState('')
    useEffect(() => {
        discountedPrice > 0 && axiosSecure.post('/create-payment-intent', {
            price: discountedPrice
        }).then(res =>{
            console.log(res.data.clientSecet)
            setClientSecret(res.data.clientSecet)
        })
    }, [axiosSecure,discountedPrice ])
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement)
        if (card === null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });
        if (error) {
            console.log('payment error', error);
            setError(error.message)
        }
        else {
            console.log('payment method', paymentMethod);
            setError('')
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if (confirmError) {
            console.log(confirmError, confirmError)
        }
        else {
            console.log('payment Intent', paymentIntent.id)
            if (paymentIntent.status === 'succeeded') {
                setTransactionId(paymentIntent.id)

                const payment = {
                    email: user?.email,
                    test_name: test?.name,
                    price: discountedPrice,
                    date: test?.date,
                    testId: test._id,
                    status: 'pending',
                    transactionId: paymentIntent.id
                }

                if (test?.slots > 0) {

                    axiosSecure.post(`/booking/${test._id}`, payment)
                        .then(res => {
                            if (res.data.insertedId) {
                                Swal.fire({
                                    title: "Booking Successful!",
                                    text: `You have booked ${test?.name} on ${test?.date}`,
                                    icon: "success",
                                    timer: 1500
                                })
                                
                                navigate('/dashboard/appointments')

                            }
                        })



                }
                else {
                    Swal.fire({
                        icon: 'info',
                        title: 'Sorry!',
                        text: "The available slots have been booked"
                    })
                }
            }
        }

    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
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

                ></CardElement>
                <button disabled={!stripe || !clientSecret } type="submit" className="btn bg-blue-500 text-white my-6" >
                    Pay
                </button>
                <p className="text-red-500">{error}</p>
                {transactionId && <p className="text-green-500">Payment successful!<br></br> Your Transaction Id:{transactionId}</p>}
            </form>

        </div>
    );
};

export default CheckoutForm;