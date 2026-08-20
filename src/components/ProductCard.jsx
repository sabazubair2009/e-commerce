import { useState } from "react";
import { supabase } from "../supabaseClient";

function ProductCard({ product, addToCart, user, setPage }) {
  const [message, setMessage] = useState("");

  // ==============================
  // ADD TO CART
  // ==============================

  const handleAddToCart = () => {
    addToCart(product);

    setMessage("Added to cart!");
    // timer for code to run
    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  // ==============================
  // ADD TO WISHLIST
  // =============================

  const handleWishlist = async () => {
    // User must be logged in
    if (!user) {
      setPage("account");
      return;
    }

    const { error } = await supabase.from("wishlist").insert([
      {
        user_id: user.id,
        product_id: product.id,
      },
    ]);

    if (error) {
      if (error.code === "23505") {
        setMessage("Already in wishlist.");
      } else {
        console.error(error);
        setMessage("Could not add to wishlist.");
      }

      return;
    }

    setMessage("Added to wishlist!");
  };

  return (
    <article className="product-card">
      {/* ==============================
          PRODUCT IMAGE
      ============================== */}

      <div className="product-image-wrapper">
        <img
          src={product.image_url}
          alt={product.name}
          className="product-image"
        />

        {/* WISHLIST BUTTON */}

        <button
          className="wishlist-button"
          onClick={handleWishlist}
          aria-label="Add to wishlist"
        >
          ♡
        </button>
      </div>

      {/* ==============================
          PRODUCT INFORMATION
      ============================== */}

      <div className="product-content">
        <span className="product-category">
          {product.category || "Keychain"}
        </span>

        <h3>{product.name}</h3>

        <p>{product.description}</p>

        {/* PRICE + CART */}

        <div className="product-bottom">
          <span className="product-price">
            Rs. {Number(product.price).toLocaleString("en-PK")}
          </span>

          <button className="add-cart-button" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>

        {/* MESSAGE */}

        {message && <p className="product-message">{message}</p>}
      </div>
    </article>
  );
}

export default ProductCard;
