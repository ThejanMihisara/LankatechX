import { useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { getcartTotal } from "../utils/cart";
import { useLocation } from "react-router-dom";

export default function Checkout() {
    const location = useLocation();
    const [cart, setCart] = useState(location.state || []);

   if(location.state == null){
    Navigate("/products");
   }

    function refreshCart() {
        setCart(getcart());
    }

    function increaseQty(product) {
        addToCart(product, 1);
        refreshCart();
    }

    function decreaseQty(product) {
        addToCart(product, -1);
        refreshCart();
    }

    const total = cart.reduce((sum, item) => {
        return sum + item.product.price * item.quantity;
    }, 0);

    return (
        <div className="w-full min-h-[calc(100vh-100px)] bg-gray-100 overflow-y-auto">
            <div className="w-full flex justify-center items-center flex-col gap-4 p-5">
                <h1 className="text-3xl font-bold text-gray-800">My Cart</h1>

                {cart.length === 0 ? (
                    <div className="w-full max-w-[800px] bg-white rounded-lg shadow p-10 text-center">
                        <p className="text-xl font-semibold text-gray-700">Your cart is empty</p>
                    </div>
                ) : (
                    <>
                        {cart.map((cartItem, index) => (
                            <div
                                key={index}
                                className="w-full max-w-[800px] min-h-[150px] bg-white flex flex-row rounded-lg shadow overflow-hidden"
                            >
                                <img
                                    className="h-[150px] w-[150px] object-cover"
                                    src={cartItem.product.imageUrl}
                                    alt={cartItem.product.name}
                                />

                                <div className="flex-1 p-4 flex flex-col justify-between overflow-hidden">
                                    <div>
                                        <p className="text-xs text-gray-500">
                                            {cartItem.product.productId}
                                        </p>
                                        <h1 className="text-xl font-bold text-gray-800">
                                            {cartItem.product.name}
                                        </h1>
                                        <p className="text-lg font-semibold text-green-600">
                                            Rs. {cartItem.product.price.toLocaleString()}
                                        </p>
                                            {cartItem.product.labelledPrice > cartItem.product.price && (
                                          <span className="text-sm text-gray-500 line-through">
                                              Rs. {cartItem.product.labelledPrice.toLocaleString()}
                                               </span>
                                    )}
                                    </div>

                                    <div className="w-[210px] h-[50px] border border-accent rounded-full flex overflow-hidden">
                                        <button
                                             onClick={() => {
            setCart((prevCart) =>
                prevCart
                    .map((item, i) =>
                        i === index
                            ? { ...item, quantity: item.quantity - 1 }
                            : item
                    )
                    .filter((item) => item.quantity > 0)
            );
        }}
                                            className="w-[70px] h-full flex justify-center items-center text-2xl font-bold text-gray-700 hover:bg-accent transition"
                                        >
                                            <BiMinus />
                                        </button>

                                        <span className="w-[70px] h-full flex justify-center items-center text-lg font-bold text-gray-700">
                                            {cartItem.quantity}
                                        </span>

                                        <button
                                            onClick={() => {
            setCart((prevCart) =>
                prevCart.map((item, i) =>
                    i === index
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            );
        }}
                                            className="w-[70px] h-full flex justify-center items-center text-2xl font-bold text-gray-700 hover:bg-accent transition"
                                        >
                                            <BiPlus />
                                        </button>
                                    </div>
                                </div>
                             <div className="w-[150px] flex flex-col items-end pr-2 justify-center bg-red-100 p-4">
                              
                                    <span className="text-lg font-bold text-red-600 ml-2">
                                        Rs. {(cartItem.product.price * cartItem.quantity).toLocaleString()}
                                    </span>
                                    
                            </div>
                            </div>
                        ))}

                        <div className="w-full max-w-[800px] bg-white rounded-lg shadow p-6 flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-gray-800">Total</h2>
                            <p className="text-2xl font-bold text-green-600">
                                Rs. {getcartTotal(cart).toLocaleString()}
                            </p>
                        </div>
                        <button className="w-full max-w-[800px] bg-green-600 text-white text-lg font-bold py-3 rounded-lg hover:bg-green-700 transition">
                            buy now
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}