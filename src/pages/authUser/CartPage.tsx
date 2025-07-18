import { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { Minus, Plus, Trash2 } from "lucide-react";
import { ClipLoader } from "react-spinners";

interface CartItem {
  menuId: string;
  quantity: number;
  price: number;
  image: string;
  productName: string;
  category: string;
  isVeg: boolean;
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchCartDetails = async () => {
      try {
        const response = await axiosInstance("/cart/cart-items");
        const { totalPrice, items } = response.data;
        setCartItems(items);
        setTotalPrice(totalPrice);
      } catch (error) {
        console.error("Failed to fetch cart:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCartDetails();
  }, []);

  const increaseQty = (index: number) => {
    const updated = [...cartItems];
    updated[index].quantity += 1;
    setCartItems(updated);
  };

  const decreaseQty = (index: number) => {
    const updated = [...cartItems];
    if (updated[index].quantity > 1) {
      updated[index].quantity -= 1;
      setCartItems(updated);
    }
  };

  const removeItem = (index: number) => {
    const updated = [...cartItems];
    updated.splice(index, 1);
    setCartItems(updated);
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] px-4 md:px-8 py-10">
      <h2 className="text-3xl font-bold text-center text-gray-900 mt-10 tracking-tight">
        🛒 Your Cart
      </h2>

      {loading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <ClipLoader size={50} color="#f97316" />
        </div>
      ) : cartItems.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">Your cart is empty.</p>
      ) : (
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 mt-4">
          {/* Cart Items */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-md md:h-[130px] p-3 sm:p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
              >
                <div className="flex flex-row items-start gap-3 sm:gap-4">
                  <img
                    src={item.image}
                    alt={item.productName}
                    className="w-[80px] sm:w-[95px] h-[80px] sm:h-[95px] object-cover rounded-xl"
                  />
                  <div className="flex flex-col justify-between gap-2 w-full">
                    <div className="flex justify-between items-start">
                      <h3 className="text-sm sm:text-[15px] font-semibold text-gray-900 truncate">
                        {item.productName}
                      </h3>
                      <Trash2
                        size={18}
                        className="text-red-500 hover:text-red-700 cursor-pointer"
                        onClick={() => removeItem(index)}
                      />
                    </div>

                    <p className="text-xs sm:text-sm text-gray-500 capitalize">
                      {item.category} {item.isVeg ? "🌱" : "🍗"}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 sm:gap-2 bg-gray-100 rounded-full px-2 sm:px-3 py-1">
                        <button
                          onClick={() => decreaseQty(index)}
                          className="p-1 hover:bg-gray-200 rounded-full transition"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-sm font-semibold w-5 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increaseQty(index)}
                          className="p-1 hover:bg-gray-200 rounded-full transition"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <p className="text-sm font-semibold text-gray-800">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Section */}
          <div className="w-full md:max-w-md lg:w-[320px] bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-gray-200 h-fit">
            <h3 className="text-xl font-bold mb-5 text-gray-900">
              Order Summary
            </h3>

            {/* Tax and total calculation */}
            {(() => {
              const taxRate = 0.05;
              const taxAmount = totalPrice * taxRate;
              const finalTotal = totalPrice + taxAmount;

              return (
                <div className="space-y-3 text-gray-700 text-sm">
                  <p className="flex justify-between">
                    <span>Total Items:</span>
                    <span className="font-semibold">{cartItems.length}</span>
                  </p>

                  <p className="flex justify-between">
                    <span>Delivery Charges:</span>
                    <span className="font-semibold text-green-600">Free</span>
                  </p>

                  <p className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="text-gray-800 font-medium">
                      ₹{totalPrice.toFixed(2)}
                    </span>
                  </p>

                  <p className="flex justify-between">
                    <span>GST (5%):</span>
                    <span className="text-gray-800">
                      ₹{taxAmount.toFixed(2)}
                    </span>
                  </p>

                  <p className="flex justify-between border-t pt-3">
                    <span>Total Price:</span>
                    <span className="text-green-600 font-bold text-lg">
                      ₹{finalTotal.toFixed(2)}
                    </span>
                  </p>
                </div>
              );
            })()}

            <button className="mt-6 w-full bg-gradient-to-r from-black to-gray-800 text-white py-2.5 rounded-full font-medium hover:opacity-90 transition">
              Proceed to Checkout
            </button>

            <p className="text-xs text-gray-500 text-center mt-3">
              🔒 Secure & Encrypted Checkout
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default CartPage;
