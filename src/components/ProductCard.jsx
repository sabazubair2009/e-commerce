import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

function ProductCard({ product, addToCart, user, setPage }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  /* =========================================================
     CHECK WISHLIST
  ========================================================= */

  useEffect(() => {
    if (user && product?.id) {
      checkWishlist();
    } else {
      setIsWishlisted(false);
    }
  }, [user, product?.id]);

  const checkWishlist = async () => {
    try {
      const { data, error } = await supabase
        .from("wishlist")
        .select("id")
        .eq("user_id", user.id)
        .eq("product_id", product.id)
        .limit(1);

      if (error) {
        console.error("Wishlist check error:", error);
        return;
      }

      setIsWishlisted(data && data.length > 0);
    } catch (err) {
      console.error("Wishlist check error:", err);
    }
  };

  /* =========================================================
     WISHLIST
  ========================================================= */

  const handleWishlist = async () => {
    // User must be logged in
    if (!user) {
      setMessage("Please login to use your wishlist.");

      setTimeout(() => {
        setMessage("");
        if (setPage) {
          setPage("account");
        }
      }, 1200);

      return;
    }

    if (!product?.id) {
      console.error("Product ID is missing.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      /* CHECK IF ALREADY WISHLISTED */

      const { data, error: checkError } = await supabase
        .from("wishlist")
        .select("id")
        .eq("user_id", user.id)
        .eq("product_id", product.id)
        .limit(1);

      if (checkError) {
        console.error("Wishlist check error:", checkError);
        setMessage("Could not check wishlist.");
        return;
      }

      const existingItem = data?.[0];

      /* =====================================================
         REMOVE FROM WISHLIST
      ===================================================== */

      if (existingItem) {
        const { error: deleteError } = await supabase
          .from("wishlist")
          .delete()
          .eq("id", existingItem.id)
          .eq("user_id", user.id);

        if (deleteError) {
          console.error("Remove wishlist error:", deleteError);
          setMessage("Could not remove from wishlist.");
          return;
        }

        setIsWishlisted(false);
        setMessage("Removed from wishlist.");
      } else {

      /* =====================================================
         ADD TO WISHLIST
      ===================================================== */
        const { error: insertError } = await supabase.from("wishlist").insert({
          user_id: user.id,
          product_id: product.id,
        });

        if (insertError) {
          console.error("Add wishlist error:", insertError);

          // If duplicate already exists
          if (insertError.code === "23505") {
            setIsWishlisted(true);
            setMessage("Already in wishlist.");
          } else {
            setMessage("Could not add to wishlist.");
          }

          return;
        }

        setIsWishlisted(true);
        setMessage("Added to wishlist.");
      }

      setTimeout(() => {
        setMessage("");
      }, 1500);
    } catch (err) {
      console.error("Wishlist error:", err);
      setMessage("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     ADD TO CART
  ========================================================= */

  const handleAddToCart = () => {
    addToCart(product);

    setMessage(`${product.name} added to cart!`);

    setTimeout(() => {
      setMessage("");
    }, 1500);
  };

  /* =========================================================
     IMAGE ERROR
  ========================================================= */

  const handleImageError = (e) => {
    e.currentTarget.style.display = "none";
  };

  /* =========================================================
     RETURN
  ========================================================= */

  return (
    <article className="product-card">
      {/* =====================================================
          IMAGE
      ===================================================== */}

      <div className="product-image-wrapper">
        {product?.image_url ? (
          <img
            className="product-image"
            src={product.image_url}
            alt={product.name || "Product"}
            onError={handleImageError}
          />
        ) : (
          <div className="image-not-found">Image not found</div>
        )}

        {/* WISHLIST BUTTON */}

        <button
          type="button"
          className={`wishlist-btn ${isWishlisted ? "wishlisted" : ""}`}
          onClick={handleWishlist}
          disabled={loading}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          {isWishlisted ? "♥" : "♡"}
        </button>
      </div>

      {/* =====================================================
          PRODUCT INFORMATION
      ===================================================== */}

      <div className="product-info">
        <span className="product-category">
          {product?.category || "KEYCHAIN"}
        </span>

        <h3>{product?.name || "Handmade Keychain"}</h3>

        <p className="product-description">
          {product?.description || "A beautiful handmade crochet keychain."}
        </p>

        {/* PRICE + CART */}

        <div className="product-bottom">
          <p className="product-price">
            Rs. {Number(product?.price || 0).toLocaleString("en-PK")}
          </p>

          <button
            type="button"
            className="add-cart-btn"
            onClick={handleAddToCart}
          >
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
