// src/utils/cart.js
import toast from "react-hot-toast";

export function getcart() {
    const cartString = localStorage.getItem("cart");

    if (cartString === null) {
        localStorage.setItem("cart", "[]");
        return [];
    }

    return JSON.parse(cartString);
}

export function setcart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

export function clearCart() {
    setcart([]);
    window.dispatchEvent(new Event("cartUpdated"));
}

export function addToCart(product, quantity) {
    const cart = getcart();

    const existingItemIndex = cart.findIndex((item) => {
        return item.product.productId === product.productId;
    });

    if (existingItemIndex === -1) {
        if (quantity <= 0) {
            toast.error("Quantity must be at least 1");
            return;
        }

        cart.push({
            product: {
                productId: product.productId,
                name: product.name,
                price: product.price,
                imageUrl: product.imageUrls?.[0] || "",
                labelledPrice: product.labelledPrice,
            },
            quantity: quantity,
        });
    } else {
        const newQuantity = cart[existingItemIndex].quantity + quantity;

        if (newQuantity <= 0) {
            cart.splice(existingItemIndex, 1);
        } else {
            cart[existingItemIndex].quantity = newQuantity;
        }
    }

    localStorage.setItem("cart", JSON.stringify(cart));
}

export function getcartTotal(cart) {
    let total = 0;

    cart.forEach((cartItem) => {
        total += cartItem.product.price * cartItem.quantity;
    });

    return total;
}