import { useEffect, useState } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Homepage from "./components/Homepage";
import CartPage from "./components/CartPage";
import WishlistPage from "./components/WishlistPage";
import UserPortal from "./components/UserPortal";

import { supabase } from "./supabaseClient";

import "./App.css";

function App() {
  const [page, setPage] = useState("home");

  const [cart, setCart] = useState([]);

  const [user, setUser] = useState(null);

  // ==============================
  // CHECK USER LOGIN
  // ==============================

  useEffect(() => {
    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUser(user);
  };

  // ==============================
  // ADD TO CART
  // ==============================

  const addToCart = (product) => {
    setCart((previousCart) => {
      const existingProduct = previousCart.find(
        (item) => item.id === product.id
      );

      // Product already exists
      // Increase quantity
      if (existingProduct) {
        return previousCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      // New product
      return [
        ...previousCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  // ==============================
  // REMOVE FROM CART
  // ==============================

  const removeFromCart = (productId) => {
    setCart((previousCart) =>
      previousCart.filter(
        (item) => item.id !== productId
      )
    );
  };

  // ==============================
  // CHANGE QUANTITY
  // ==============================

  const changeQuantity = (
    productId,
    amount
  ) => {
    setCart((previousCart) =>
      previousCart
        .map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity:
                  item.quantity + amount,
              }
            : item
        )
        .filter(
          (item) => item.quantity > 0
        )
    );
  };

  // ==============================
  // TOTAL CART ITEMS
  // ==============================

  const cartCount = cart.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

  // ==============================
  // APP UI
  // ==============================

  return (
    <div className="app">

      <Header
        page={page}
        setPage={setPage}
        cartCount={cartCount}
        user={user}
      />

      <main>

        {/* HOME */}
        {page === "home" && (
          <Homepage
            addToCart={addToCart}
            user={user}
            setPage={setPage}
          />
        )}

        {/* WISHLIST */}
        {page === "wishlist" && (
          <WishlistPage
            user={user}
            addToCart={addToCart}
            setPage={setPage}
          />
        )}

        {/* CART */}
        {page === "cart" && (
          <CartPage
            cart={cart}
            removeFromCart={
              removeFromCart
            }
            changeQuantity={
              changeQuantity
            }
          />
        )}

        {/* ACCOUNT */}
        {page === "account" && (
          <UserPortal
            user={user}
            setPage={setPage}
          />
        )}

      </main>

      <Footer />

    </div>
  );
}

export default App;