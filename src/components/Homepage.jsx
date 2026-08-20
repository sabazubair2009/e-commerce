import { useEffect, useState } from "react";
import { supabase } from "../supabaseclient";
import ProductCard from "./ProductCard";

function Homepage({ addToCart, user, setPage }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  // Products that will appear on the homepage
  const defaultProducts = [
    {
      id: "bow-keychain",
      name: "Crochet Bow Keychain",
      description:
        "A cute handmade crochet bow keychain, perfect for your bag or keys.",
      price: 199,
      category: "Keychain",
      image_url: "/images/bowkeychain.png",
    },
    {
      id: "flower-keychain",
      name: "Crochet Flower Keychain",
      description:
        "A beautiful handmade crochet flower keychain with a cute design.",
      price: 250,
      category: "Keychain",
      image_url: "/images/flowerkeychain.png",
    },
    {
      id: "pink-cherry-keychain",
      name: "Pink Cherry Keychain",
      description:
        "A lovely pink cherry crochet keychain made for everyday use.",
      price: 350,
      category: "Keychain",
      image_url: "/images/pinkcherrykeychain.png",
    },
    {
      id: "smily-keychain",
      name: "Smiley Keychain",
      description:
        "A fun and cheerful crochet smiley keychain to brighten your day.",
      price: 399,
      category: "Keychain",
      image_url: "/images/smilykeychain.png",
    },
    {
      id: "sunflower-keychain",
      name: "Sunflower Keychain",
      description:
        "A handmade crochet sunflower keychain with a bright and cute look.",
      price: 450,
      category: "Keychain",
      image_url: "/images/sunflowerkeychain.jpeg",
    },
    {
      id: "tulip-keychain",
      name: "Crochet Tulip Keychain",
      description:
        "A delicate handmade crochet tulip keychain for your keys or bag.",
      price: 590,
      category: "Keychain",
      image_url: "/images/tulipkeychain.png",
    },
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    setError("");

    try {
      // Try to get products from Supabase
      const { data, error: supabaseError } = await supabase
        .from("products")
        .select("*")
        .order("id", {
          ascending: true,
        });

      if (supabaseError) {
        console.error(supabaseError);

        // If Supabase has an error,
        // still show our products on the UI
        setProducts(defaultProducts);
      } else if (data && data.length > 0) {
        setProducts(data);
      } else {
        // If the Supabase table is empty,
        // show the products on the homepage
        setProducts(defaultProducts);
      }
    } catch (err) {
      console.error(err);

      // Show products even if Supabase fails
      setProducts(defaultProducts);
    }

    setLoading(false);
  };

  const filteredProducts = products.filter((product) =>
    product.name
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <>
      {/* =========================
          HERO SECTION
      ========================= */}
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-label">
            HANDMADE & UNIQUE
          </span>

          <h1>
            Little things that
            <br />
            make you smile.
          </h1>

          <p>
            Discover our collection of cute
            handmade crochet keychains made
            to add personality to your everyday life.
          </p>

          <button
            className="hero-button"
            onClick={() =>
              document
                .getElementById("products")
                ?.scrollIntoView({
                  behavior: "smooth",
                })
            }
          >
            Shop Collection
          </button>
        </div>
      </section>

      {/* =========================
          PRODUCTS SECTION
      ========================= */}
      <section
        className="products-section"
        id="products"
      >
        <div className="section-heading">
          <div>
            <span>OUR COLLECTION</span>

            <h2>
              Choose Your Favorite
            </h2>
          </div>

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>

        {/* =========================
            LOADING
        ========================= */}
        {loading && (
          <div className="status-message">
            <div className="loader"></div>

            <p>
              Loading products...
            </p>
          </div>
        )}

        {/* =========================
            PRODUCTS
        ========================= */}
        {!loading &&
          filteredProducts.length > 0 && (
            <div className="product-grid">
              {filteredProducts.map(
                (product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    addToCart={addToCart}
                    user={user}
                    setPage={setPage}
                  />
                )
              )}
            </div>
          )}

        {/* =========================
            NO PRODUCTS
        ========================= */}
        {!loading &&
          filteredProducts.length === 0 && (
            <div className="status-message">
              <h3>
                No products found
              </h3>

              <p>
                Try searching for another product.
              </p>
            </div>
          )}
      </section>
    </>
  );
}

export default Homepage;