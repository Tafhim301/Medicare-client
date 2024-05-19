import { useState } from 'react';
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { useQuery } from "@tanstack/react-query";

import useAxiosPublic from "../../Hooks/useAxiosPublic";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK);

const PromoCode = ({ test }) => {
    const [showCheckoutForm, setShowCheckoutForm] = useState(false); // State to show CheckoutForm
    const [validationMessage, setValidationMessage] = useState(''); // State for validation message
    const [discountedPrice, setDiscountedPrice] = useState(null);
    const axiosPublic = useAxiosPublic();
    const { data: banners = [], isPending: isLoading } = useQuery({
        queryKey: ["Banners"],
        queryFn: async () => {
            const res = await axiosPublic.get('/banners');
            return res.data;
        }
    });

    const handleBooking = (e) => {
        e.preventDefault();
        const promocode = e.target.promocode.value;

        if (!isLoading) {
            const filteredBanner = banners.filter(banner => banner.coupon_code === promocode);
            if (filteredBanner.length > 0) {
                const discountRate = parseInt(filteredBanner[0].discount_rate); // Assuming only one banner can match a promo code
                const originalPrice = parseInt(test?.price);
                const discountedPrice = originalPrice - (originalPrice * (discountRate / 100)).toFixed(2);
                setDiscountedPrice(discountedPrice);
                setShowCheckoutForm(true); 
                setValidationMessage('Valid promocode! Proceed to payment.');
            } else {
                setShowCheckoutForm(false);
                setValidationMessage('Invalid promocode. Please try again.');
               
            }
        }
    };

    return (
        <div>
            <form onSubmit={handleBooking} className='mb-3'>
                <div className="form-control mb-5">
                    <label className="label">
                        <span className="label-text">Promocode</span>
                    </label>
                    <input name="promocode" placeholder="Enter Your Promocode" className="input input-bordered" required />
                </div>
                <div className="card-actions">
                    <button className="btn btn-primary">Enter Promocode</button>
                </div>
            </form>

            {validationMessage && (
                <div className='mb-3'>
                    <p className={showCheckoutForm ? 'text-green-500 ' : 'text-red-500 ' }>{validationMessage}</p>
                  { showCheckoutForm && <div>
                    <p>Price: {test.price}</p>
                    <p>Discounted Price: {discountedPrice}</p>
                    <p>Savings: {(test.price - discountedPrice).toFixed(2)}</p>
                    </div>}
                </div>
                
            )}

            {showCheckoutForm && (
                <Elements stripe={stripePromise}>
                    <CheckoutForm test={test} discountedPrice={discountedPrice} />
                </Elements>
            )}
        </div>
    );
};

export default PromoCode;
