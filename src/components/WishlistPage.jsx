// import { useEffect, useState } from "react";
// import { supabase } from "../supabaseClient";

// function WishlistPage({ user, addToCart, setPage }) {
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     if (user) {
//       fetchWishlist();
//     } else {
//       setItems([]);
//     }
//   }, [user]);

//   const fetchWishlist = async () => {
//     setLoading(true);

//     const { data, error } = await supabase
//       .from("wishlist")
//       .select(
//         `
//         id,
//         product_id,
//         products (
//           id,
//           name,
//           description,
//           price,
//           category,
//           image_url
//         )
//       `,
//       )
//       .eq("user_id", user.id);

//     if (error) {
//       console.error("Wishlist error:", error);
//       setMessage("Could not load wishlist.");
//     } else {
//       setItems(data || []);
//     }

//     setLoading(false);
//   };

//   const removeWishlist = async (id) => {
//     const { error } = await supabase
//       .from("wishlist")
//       .delete()
//       .eq("id", id)
//       .eq("user_id", user.id);

//     if (error) {
//       console.error("Remove wishlist error:", error);
//       setMessage("Could not remove item.");
//       return;
//     }

//     setItems((previous) => previous.filter((item) => item.id !== id));

//     setMessage("Removed from wishlist.");

//     setTimeout(() => {
//       setMessage("");
//     }, 1500);
//   };

//   const handleAddToCart = (product) => {
//     addToCart(product);

//     setMessage(`${product.name} added to cart!`);

//     setTimeout(() => {
//       setMessage("");
//     }, 1500);
//   };

//   /* ==============================
//      NOT LOGGED IN
//   ============================== */

//   if (!user) {
//     return (
//       <section className="protected-page">
//         <div className="protected-box">
//           <div className="protected-icon">♡</div>

//           <span>PRIVATE COLLECTION</span>

//           <h1>Your Wishlist</h1>

//           <p>
//             Login or create an account to save products you love and find them
//             here later.
//           </p>

//           <button className="dark-button" onClick={() => setPage("account")}>
//             Login / Sign Up
//           </button>
//         </div>
//       </section>
//     );
//   }

//   /* ==============================
//      LOGGED IN
//   ============================== */

//   return (
//     <section className="wishlist-page">
//       <div className="page-heading">
//         <span>SAVED ITEMS</span>

//         <h1>My Wishlist</h1>
//       </div>

//       {/* MESSAGE */}

//       {message && <div className="wishlist-message">{message}</div>}

//       {/* LOADING */}

//       {loading ? (
//         <div className="status-message">
//           <div className="loader"></div>

//           <p>Loading your wishlist...</p>
//         </div>
//       ) : items.length === 0 ? (
//         /* EMPTY WISHLIST */

//         <div className="empty-wishlist">
//           <div className="protected-icon">♡</div>

//           <h2>Your wishlist is empty.</h2>

//           <p>Save products you love and find them here later.</p>

//           <button className="dark-button" onClick={() => setPage("home")}>
//             Browse Products
//           </button>
//         </div>
//       ) : (
//         /* WISHLIST PRODUCTS */

//         <div className="wishlist-grid">
//           {items.map((item) => {
//             const product = item.products;

//             return (
//               <div className="wishlist-card" key={item.id}>
//                 {/* IMAGE */}

//                 <div className="wishlist-image-wrapper">
//                   {product?.image_url ? (
//                     <img src={product.image_url} alt={product.name} />
//                   ) : (
//                     <div className="image-not-found">Image not found</div>
//                   )}
//                 </div>

//                 {/* PRODUCT DETAILS */}

//                 <div className="wishlist-card-content">
//                   <span>{product?.category || "KEYCHAIN"}</span>

//                   <h3>{product?.name}</h3>

//                   <p>
//                     {product?.description || "A beautiful handmade keychain."}
//                   </p>

//                   <strong>${Number(product?.price || 0).toFixed(2)}</strong>

//                   {/* BUTTONS */}

//                   <div className="wishlist-actions">
//                     <button
//                       className="add-cart-button"
//                       onClick={() => handleAddToCart(product)}
//                     >
//                       Add to Cart
//                     </button>

//                     <button
//                       className="remove-button"
//                       onClick={() => removeWishlist(item.id)}
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </section>
//   );
// }

// export default WishlistPage;









import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

function WishlistPage({ user, addToCart, setPage }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) {
      fetchWishlist();
    } else {
      setItems([]);
    }
  }, [user]);

  const fetchWishlist = async () => {
    setLoading(true);
    setMessage("");

    const { data, error } = await supabase
      .from("wishlist")
      .select(`
        id,
        product_id,
        products (
          id,
          name,
          description,
          price,
          category,
          image_url
        )
      `)
      .eq("user_id", user.id);

    if (error) {
      console.error("Wishlist error:", error);
      setMessage("Could not load wishlist.");
    } else {
      setItems(data || []);
    }

    setLoading(false);
  };

  const removeWishlist = async (id) => {
    const { error } = await supabase
      .from("wishlist")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) {
      console.error("Remove wishlist error:", error);
      setMessage("Could not remove item.");
      return;
    }

    setItems((previous) =>
      previous.filter((item) => item.id !== id)
    );

    setMessage("Removed from wishlist.");

    setTimeout(() => {
      setMessage("");
    }, 1500);
  };

  const handleAddToCart = (product) => {
    addToCart(product);

    setMessage(`${product.name} added to cart!`);

    setTimeout(() => {
      setMessage("");
    }, 1500);
  };

  /* NOT LOGGED IN */

  if (!user) {
    return (
      <section className="protected-page">
        <div className="protected-box">
          <div className="protected-icon">♡</div>

          <span>PRIVATE COLLECTION</span>

          <h1>Your Wishlist</h1>

          <p>
            Login or create an account to save products you love
            and find them here later.
          </p>

          <button
            className="dark-button"
            onClick={() => setPage("account")}
          >
            Login / Sign Up
          </button>
        </div>
      </section>
    );
  }

  /* LOGGED IN */

  return (
    <section className="wishlist-page">
      <div className="page-heading">
        <span>SAVED ITEMS</span>

        <h1>My Wishlist</h1>
      </div>

      {message && (
        <div className="wishlist-message">
          {message}
        </div>
      )}

      {loading ? (
        <div className="status-message">
          <div className="loader"></div>
          <p>Loading your wishlist...</p>
        </div>
      ) : items.length === 0 ? (
        <div className="empty-wishlist">
          <div className="protected-icon">♡</div>

          <h2>Your wishlist is empty.</h2>

          <p>
            Save products you love and find them here later.
          </p>

          <button
            className="dark-button"
            onClick={() => setPage("home")}
          >
            Browse Products
          </button>
        </div>
      ) : (
        <div className="wishlist-grid">
          {items.map((item) => {
            const product = item.products;

            return (
              <div
                className="wishlist-card"
                key={item.id}
              >
                {/* IMAGE */}

                <div className="wishlist-image-wrapper">
                  {product?.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="image-not-found">
                      Image not found
                    </div>
                  )}
                </div>

                {/* PRODUCT DETAILS */}

                <div className="wishlist-card-content">
                  <span>
                    {product?.category || "KEYCHAIN"}
                  </span>

                  <h3>{product?.name}</h3>

                  <p>
                    {product?.description ||
                      "A beautiful handmade keychain."}
                  </p>

                  {/* PAKISTANI RUPEES */}
                  <strong>
                    Rs.{" "}
                    {Number(
                      product?.price || 0
                    ).toLocaleString("en-PK")}
                  </strong>

                  {/* BUTTONS */}

                  <div className="wishlist-actions">
                    <button
                      className="add-cart-button"
                      onClick={() =>
                        handleAddToCart(product)
                      }
                    >
                      Add to Cart
                    </button>

                    <button
                      className="remove-button"
                      onClick={() =>
                        removeWishlist(item.id)
                      }
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default WishlistPage;