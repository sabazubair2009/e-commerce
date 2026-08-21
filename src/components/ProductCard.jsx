
// import { useState } from "react";
// import { supabase } from "../supabaseClient";

// function ProductCard({ product, addToCart, user, setPage }) {
//   const [message, setMessage] = useState("");
//   const [imageError, setImageError] = useState(false);

//   const handleAddToCart = () => {
//     addToCart(product);

//     setMessage("Added to cart!");

//     setTimeout(() => {
//       setMessage("");
//     }, 2000);
//   };

//   const handleWishlist = async () => {
//     if (!user) {
//       setPage("account");
//       return;
//     }

//     const { error } = await supabase.from("wishlist").insert([
//       {
//         user_id: user.id,
//         product_id: product.id,
//       },
//     ]);

//     if (error) {
//       if (error.code === "23505") {
//         setMessage("Already in wishlist.");
//       } else {
//         console.error(error);
//         setMessage("Could not add to wishlist.");
//       }

//       return;
//     }

//     setMessage("Added to wishlist!");

//     setTimeout(() => {
//       setMessage("");
//     }, 2000);
//   };

//   return (
//     <article className="product-card">
//       {/* PRODUCT IMAGE */}
//       <div className="product-image-wrapper">
//         {!imageError ? (
//           <img
//             src={product.image_url}
//             alt={product.name}
//             className="product-image"
//             onError={() => setImageError(true)}
//           />
//         ) : (
//           <div className="image-not-found">
//             Image not found
//           </div>
//         )}

//         {/* WISHLIST BUTTON */}
//         <button
//           className="wishlist-button"
//           onClick={handleWishlist}
//           aria-label="Add to wishlist"
//         >
//           ♡
//         </button>
//       </div>

//       {/* PRODUCT INFORMATION */}
//       <div className="product-content">
//         <span className="product-category">
//           {product.category || "Keychain"}
//         </span>

//         <h3>{product.name}</h3>

//         <p>{product.description}</p>

//         {/* PRICE + CART */}
//         <div className="product-bottom">
//           <span className="product-price">
//             Rs. {Number(product.price).toLocaleString("en-PK")}
//           </span>

//           <button
//             className="add-cart-button"
//             onClick={handleAddToCart}
//           >
//             Add to Cart
//           </button>
//         </div>

//         {/* MESSAGE */}
//         {message && (
//           <p className="product-message">{message}</p>
//         )}
//       </div>
//     </article>
//   );
// }

// export default ProductCard;










import { useState } from "react";
import { supabase } from "../supabaseClient";

function ProductCard({ product, addToCart, user }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleWishlist = async () => {
    // User must be logged in
    if (!user) {
      alert("Please login to add products to your wishlist.");
      return;
    }

    if (loading) return;

    setLoading(true);

    try {
      // Check if product is already in wishlist
      const { data: existingItem, error: checkError } = await supabase
        .from("wishlist")
        .select("*")
        .eq("user_id", user.id)
        .eq("product_id", product.id)
        .maybeSingle();

      if (checkError) {
        console.error("Wishlist check error:", checkError);
        alert(checkError.message);
        return;
      }

      // If already in wishlist → remove it
      if (existingItem) {
        const { error: deleteError } = await supabase
          .from("wishlist")
          .delete()
          .eq("user_id", user.id)
          .eq("product_id", product.id);

        if (deleteError) {
          console.error("Wishlist delete error:", deleteError);
          alert(deleteError.message);
          return;
        }

        setIsWishlisted(false);
      }

      // If not in wishlist → add it
      else {
        const { error: insertError } = await supabase
          .from("wishlist")
          .insert([
            {
              user_id: user.id,
              product_id: product.id,
            },
          ]);

        if (insertError) {
          console.error("Wishlist insert error:", insertError);
          alert(insertError.message);
          return;
        }

        setIsWishlisted(true);
      }
    } catch (error) {
      console.error("Wishlist error:", error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <img
          src={product.image_url}
          alt={product.name}
          className="product-image"
        />

        <button
          className={`wishlist-btn ${
            isWishlisted ? "wishlisted" : ""
          }`}
          onClick={handleWishlist}
          disabled={loading}
          aria-label="Add to wishlist"
        >
          {isWishlisted ? "♥" : "♡"}
        </button>
      </div>

      <div className="product-info">
        <h3>{product.name}</h3>

        <p className="product-description">
          {product.description}
        </p>

        <p className="product-price">
          Rs. {Number(product.price).toLocaleString()}
        </p>

        <button
          className="add-cart-btn"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;