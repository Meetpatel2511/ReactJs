import React, { useState, useEffect, useRef } from "react";
import "./FoodCourt.css";
import confetti from "canvas-confetti";
import JsBarcode from "jsbarcode";

// Images
import Burger from "../assets/burger.png";
import Nachos from "../assets/nachos.png";
import Panner from "../assets/Panner.jpeg";
import Samosa from "../assets/samosa.png";
import Popcorn from "../assets/popcorncombo.jpeg";
import Pizza from "../assets/pizza.jpeg";
import Fries from "../assets/fries.png";
import Shake from "../assets/shake.jpg";
import Aquafina from"../assets/Aquafina.jpg";
import Cock from"../assets/cock.jpg";
import Tea from"..//assets/tea.jpg";
import Coffe from"../assets/coffe.jpg";
import Momo from"..//assets/Momo.jpg";
import Panir from"..//assets/panir.jpg";
import Manchu from"..//assets/manchu.jpg";
import popcorncombo from"..//assets/popcorncombo.jpg";
import Combo from"..//assets/combo.avif";
import Corncombo from"..//assets/corncombo.jpg";
import Navbar from "./Navbar";

// Food items with categories
const foodItems = [
  { id: 1, name: "BURGER COMBO", price: 100, image: Burger, category: "POPCORN" },
  { id: 2, name: "CHEESE POPCORN COMBO", price: 150, image: popcorncombo, category: "POPCORN" },
  { id: 3, name: "MASALA POPCORN", price: 300, image: Combo, category: "POPCORN" },
  { id: 4, name: "REGULAR POPCORN", price: 175, image: Corncombo, category: "POPCORN" },
  { id: 5, name: "SALTED POPCORN", price: 99, image: Popcorn, category: "POPCORN" },
  { id: 6, name: "WATER", price: 149, image: Aquafina, category: "DRINKS" },
  { id: 7, name: "FANTA", price: 199, image: Cock, category: "DRINKS" },
  { id: 8, name: "Chocolate Shake", price: 199, image: Shake, category: "DRINKS" },
  { id: 9, name: "TEA", price: 149, image: Tea, category: "DRINKS" },
  { id: 10, name: "COFFIE", price: 125, image: Coffe, category: "DRINKS" },
  { id: 11, name: "PANNER TIKKA", price: 149, image: Panner, category: "STARTER" },
  { id: 12, name: "PEERY PEERY FRIES", price: 375, image: Fries, category: "STARTER" },
  { id: 13, name: "PANNER CHILI", price: 299, image: Panir, category: "STARTER" },
  { id: 14, name: "MANCHURIAN", price: 175, image: Manchu, category: "STARTER" },
  { id: 15, name: "MOMOS", price: 99, image: Momo, category: "STARTER" },
  { id: 16, name: "NACHOS", price: 129, image: Nachos, category: "STARTER" },
  { id: 17, name: "SAMOSA", price: 99, image: Samosa, category: "STARTER" },
  { id: 18, name: "PIZZA", price: 99, image: Pizza, category: "STARTER" },

];

// Coupon list
const couponOffers = [
  { couponCode: "SAVE20", description: "Get 20% off on all orders", expiryDate: "31/12/2025" },
  { couponCode: "FREESHIP", description: "Free shipping on orders over ₹500", expiryDate: "31/12/2025" },
  { couponCode: "NEWUSER10", description: "10% off for new users", expiryDate: "31/01/2026" },
];

const FoodCourt = () => {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const [showCart, setShowCart] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [finalBill, setFinalBill] = useState("");
  const [showBarcode, setShowBarcode] = useState(false);
  const [checkoutMessage, setCheckoutMessage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const barcodeRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => setCart((prevCart) => [...prevCart, item]);
  const toggleCart = () => setShowCart(!showCart);
  const toggleTheme = () => setIsDark(!isDark);

  const applyCoupon = () => {
    if (couponCode === "AKASH50") {
      setDiscount(0.5);
      setCouponApplied(true);
      confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } });
      alert("🎉 Coupon AKASH50 applied! 50% off 🎉");
    } else {
      alert("❌ Invalid coupon code");
      setDiscount(0);
      setCouponApplied(false);
    }
  };

  const getTotal = () => {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    return (total * (1 - discount)).toFixed(2);
  };

  const handleCheckout = () => {
    const billAmount = getTotal();
    setFinalBill(billAmount);
    setShowBarcode(true);
    setCheckoutMessage(`✅ Thank you! Total: ₹${billAmount}`);

    setTimeout(() => {
      setCheckoutMessage("");
      setCart([]);
      setCouponCode("");
      setDiscount(0);
      setCouponApplied(false);
      setShowCart(false);
      localStorage.removeItem("cart");
    }, 2000);
  };

  useEffect(() => {
    if (showBarcode && barcodeRef.current && finalBill) {
      JsBarcode(barcodeRef.current, `FoodCourtBill${finalBill}`, {
        format: "CODE128",
        lineColor: "#000",
        width: 2,
        height: 80,
        displayValue: true,
      });
    }
  }, [showBarcode, finalBill]);

  

  return (
    
    <section className="foodcourt-section">
    
   
    <div className={`fc-container ${isDark ? "dark" : "light"}`}>
      <h1 className="fc-heading">Food Court</h1>
      <div className="marq">
        <div className="coupon-marquee-wrapper">
          <marquee behavior="scroll" direction="left" scrollamount="10">
            {couponOffers.map((offer, index) => (
              <span key={index} className="coupon-offer">
                🏷️ <strong>{offer.couponCode}</strong>: {offer.description} (Valid till: {offer.expiryDate}) &nbsp;&nbsp;&nbsp;
              </span>
            ))}
          </marquee>
        </div>
      </div>

      {/* Category Filter */}
      <h2 className="fc-categoryHeading fltr">
        Filter:{" "}
        <span onClick={() => setSelectedCategory("ALL")} className="fc-filterBtn">All</span> |{" "}
        <span onClick={() => setSelectedCategory("POPCORN")} className="fc-filterBtn">Popcorn</span> |{" "}
        <span onClick={() => setSelectedCategory("DRINKS")} className="fc-filterBtn">Drinks</span> |{" "}
        <span onClick={() => setSelectedCategory("STARTER")} className="fc-filterBtn">Starter</span>
      </h2>

      <div className="fc-topButtons">
        <button className="fc-themeToggleButton" onClick={toggleTheme}>
          {isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>

        <button className="fc-cartToggleButton" onClick={toggleCart}>
          🛒 Cart ({cart.length})
        </button>
      </div>

      <div className="fc-mainContent">
        <div className="fc-cardContainer">
          {foodItems
            .filter((item) => selectedCategory === "ALL" || item.category === selectedCategory)
            .map((item) => (
              <div key={item.id} className="fc-card">
                <img src={item.image} alt={item.name} className="fc-image" />
                <h2 className="fc-itemName">{item.name}</h2>
                <p className="fc-price">₹{item.price.toFixed(2)}</p>
                <button className="fc-button" onClick={() => addToCart(item)}>
                  Add to Cart
                </button>
              </div>
            ))}
        </div>

        {showCart && (
          <div className="fc-cartSection">
            <h2 className="fc-cartTitle">Cart Details</h2>

            {checkoutMessage && <p className="fc-checkoutMessage">{checkoutMessage}</p>}

            <ul className="fc-cartList">
              {cart.map((item, index) => (
                <li key={index} className="fc-cartItem">
                  {item.name} - ₹{item.price.toFixed(2)}
                </li>
              ))}
              {cart.length === 0 && <li className="fc-cartItem">Cart is empty</li>}
            </ul>

            {cart.length > 0 && (
              <div>
                {!couponApplied && (
                  <div className="fc-couponArea">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter coupon code"
                      className="fc-couponInput"
                    />
                    <button onClick={applyCoupon} className="fc-applyCouponButton">
                      Apply Coupon
                    </button>
                  </div>
                )}

                <p className="fc-total">Total: ₹{getTotal()}</p>
                <button className="fc-checkoutButton" onClick={handleCheckout}>
                  Checkout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
    </section>
  );
};

export default FoodCourt;
