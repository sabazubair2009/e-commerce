// import { useEffect, useState } from "react";
// import { supabase } from "../supabaseClient";
// import ProductCard from "./ProductCard";

// function Homepage({ addToCart, user, setPage }) {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [search, setSearch] = useState("");

//   const defaultProducts = [
//     {
//       id: "bow-keychain",
//       name: "Crochet Bow Keychain",
//       description:
//         "A cute handmade crochet bow keychain, perfect for your bag or keys.",
//       price: 199,
//       category: "Keychain",
//       image_url: "/images/bowkeychain.png",
//     },
//     {
//       id: "flower-keychain",
//       name: "Crochet Flower Keychain",
//       description:
//         "A beautiful handmade crochet flower keychain with a cute design.",
//       price: 250,
//       category: "Keychain",
//       image_url: "/images/flowerkeychain.png",
//     },
//     {
//       id: "pink-cherry-keychain",
//       name: "Pink Cherry Keychain",
//       description:
//         "A lovely pink cherry crochet keychain made for everyday use.",
//       price: 350,
//       category: "Keychain",
//       image_url: "/images/pinkcherrykeychain.png",
//     },
//     {
//       id: "smily-keychain",
//       name: "Smiley Keychain",
//       description:
//         "A fun and cheerful crochet smiley keychain to brighten your day.",
//       price: 399,
//       category: "Keychain",
//       image_url: "/images/smilykeychain.png",
//     },
//     {
//       id: "sunflower-keychain",
//       name: "Sunflower Keychain",
//       description:
//         "A handmade crochet sunflower keychain with a bright and cute look.",
//       price: 450,
//       category: "Keychain",
//       image_url: "/images/sunflowerkeychain.jpeg",
//     },
//     {
//       id: "tulip-keychain",
//       name: "Crochet Tulip Keychain",
//       description:
//         "Handcrafted crochet keychain with a charming design.",
//       price: 380,
//       category: "Keychain",
//       image_url: "/images/tulipkeychain.png",
//     },


//     {
//       id: "hellokitty-keychain",
//       name: "helloKitty Keychain",
//       description:
//         "Cute and girly keychain",
//       price: 449,
//       category: "Keychain",
//       image_url: "/images/hellokitty.png",
//     },
 
//     {
//       id:"icecream-keychain",
//       name: "creamy Keychain",
//       description:
//         "available in two wonderfull colors",
//       price: 229,
//       category: "Keychain",
//       image_url: "/images/icecreamkeychain.png",
//     },
//      {
//       id:"star-keychain",
//       name: "ShiningStar Keychain",
//       description:
//         "A keychain made your way, in the colors you love!",
//       price: 229,
//       category: "Keychain",
//       image_url: "/images/starkeychain.png",
//     },
//   ];

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     setLoading(true);
//     setError("");

//     try {
//       const { data, error: supabaseError } = await supabase
//         .from("products")
//         .select("*")
//         .order("id", {
//           ascending: true,
//         });

//       if (supabaseError) {
//         console.error("Supabase products error:", supabaseError);

//         // If Supabase fails, show local products
//         setProducts(defaultProducts);
//       } else if (data && data.length > 0) {
//         // Use products from Supabase
//         setProducts(data);
//       } else {
//         // If Supabase table is empty
//         setProducts(defaultProducts);
//       }
//     } catch (err) {
//       console.error("Products error:", err);
//       setProducts(defaultProducts);
//     }

//     setLoading(false);
//   };

//   const filteredProducts = products.filter((product) =>
//     product.name?.toLowerCase().includes(search.toLowerCase()),
//   );

//   return (
//     <>
//       {/* HERO SECTION */}
//       <section className="hero-section">
//         <div className="hero-content">
//           <span className="hero-label">HANDMADE & UNIQUE</span>

//           <h1>
//             Little things that
//             <br />
//             make you smile.
//           </h1>

//           <p>
//             Discover our collection of cute handmade crochet keychains made to
//             add personality to your everyday life.
//           </p>

//           <button
//             className="hero-button"
//             onClick={() =>
//               document.getElementById("products")?.scrollIntoView({
//                 behavior: "smooth",
//               })
//             }
//           >
//             Shop Collection
//           </button>
//         </div>
//       </section>

//       {/* PRODUCTS SECTION */}
//       <section className="products-section" id="products">
//         <div className="section-heading">
//           <div>
//             <span>OUR COLLECTION</span>

//             <h2>Choose Your Favorite</h2>
//           </div>

//           <input
//             type="text"
//             placeholder="Search products..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>

//         {/* LOADING */}
//         {loading && (
//           <div className="status-message">
//             <div className="loader"></div>
//             <p>Loading products...</p>
//           </div>
//         )}

//         {/* PRODUCTS */}
//         {!loading && filteredProducts.length > 0 && (
//           <div className="product-grid">
//             {filteredProducts.map((product) => (
//               <ProductCard
//                 key={product.id}
//                 product={product}
//                 addToCart={addToCart}
//                 user={user}
//                 setPage={setPage}
//               />
//             ))}
//           </div>
//         )}

//         {/* NO PRODUCTS */}
//         {!loading && filteredProducts.length === 0 && (
//           <div className="status-message">
//             <h3>No products found</h3>
//             <p>Try searching for another product.</p>
//           </div>
//         )}
//       </section>
//     </>
//   );
// }

// export default Homepage;












import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import ProductCard from "./ProductCard";

function Homepage({ addToCart, user }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    setError("");

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Products error:", error);
      setError(error.message);
    } else {
      setProducts(data || []);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <section className="home-page">
        <p className="loading-text">Loading products...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="home-page">
        <p className="error-message">{error}</p>
      </section>
    );
  }

  return (
    <section className="home-page">
      <div className="home-heading">
        <p className="small-heading">HANDMADE WITH LOVE</p>

        <h1>Our Products</h1>

        <p>
          Discover our collection of handmade crochet
          keychains.
        </p>
      </div>

      <div className="product-grid">
        {products.length === 0 ? (
          <p>No products available.</p>
        ) : (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
              user={user}
            />
          ))
        )}
      </div>
    </section>
  );
}

export default Homepage;