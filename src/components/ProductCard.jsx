
import { useState } from "react";
import { supabase } from "../supabaseClient";

function ProductCard({ product, addToCart, user, setPage }) {
  const [message, setMessage] = useState("");
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);

    setMessage("Added to cart!");

    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  const handleWishlist = async () => {
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

    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  return (
    <article className="product-card">
      {/* PRODUCT IMAGE */}
      <div className="product-image-wrapper">
        {!imageError ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="product-image"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="image-not-found">
            Image not found
          </div>
        )}

        {/* WISHLIST BUTTON */}
        <button
          className="wishlist-button"
          onClick={handleWishlist}
          aria-label="Add to wishlist"
        >
          ♡
        </button>
      </div>

      {/* PRODUCT INFORMATION */}
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

          <button
            className="add-cart-button"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>

        {/* MESSAGE */}
        {message && (
          <p className="product-message">{message}</p>
        )}
      </div>
    </article>
  );
}

export default ProductCard;