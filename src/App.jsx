import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Homepage from "./components/Homepage";
import UserPortal from "./components/UserPortal";
import CartPage from "./components/CartPage";
import WishlistPage from "./components/WishlistPage";

import "./App.css";

function App() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  /* =========================================================
     CHECK LOGIN STATUS
  ========================================================= */

  useEffect(() => {
    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUser(user || null);
  };

  /* =========================================================
     ADD TO CART
  ========================================================= */

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => item.id === product.id,
      );

      if (existingProduct) {
        return currentCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        );
      }

      return [
        ...currentCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  /* =========================================================
     REMOVE FROM CART
  ========================================================= */

  const removeFromCart = (id) => {
    setCart((currentCart) => currentCart.filter((item) => item.id !== id));
  };

  /* =========================================================
     CHANGE QUANTITY
  ========================================================= */

  const changeQuantity = (id, quantity) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }

    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: quantity,
            }
          : item,
      ),
    );
  };

  /* =========================================================
     CART COUNT
  ========================================================= */

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  /* =========================================================
     APP
  ========================================================= */

  return (
    <div className="app">
      <Header
        user={user}
        cart={cart}
        cartCount={cartCount}
        page={page}
        setPage={setPage}
      />

      <main>
        {/* HOME */}

        {page === "home" && (
          <Homepage addToCart={addToCart} user={user} setPage={setPage} />
        )}

        {/* ACCOUNT / LOGIN / SIGN UP */}

        {page === "account" && <UserPortal user={user} setPage={setPage} />}

        {/* 
          This also supports "portal" in case your Header
          is currently using setPage("portal").
        */}

        {page === "portal" && <UserPortal user={user} setPage={setPage} />}

        {/* CART */}

        {page === "cart" && (
          <CartPage
            cart={cart}
            removeFromCart={removeFromCart}
            changeQuantity={changeQuantity}
          />
        )}

        {/* WISHLIST */}

        {page === "wishlist" && (
          <WishlistPage user={user} addToCart={addToCart} setPage={setPage} />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
