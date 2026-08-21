import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import ProductCard from "./ProductCard";

function Homepage({ addToCart, user, setPage }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    setError("");

    try {
      const { data, error: supabaseError } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (supabaseError) {
        console.error("Products error:", supabaseError);
        setError(supabaseError.message);
        setProducts([]);
      } else {
        setProducts(data || []);
      }
    } catch (err) {
      console.error("Products error:", err);
      setError("Something went wrong while loading products.");
    }

    setLoading(false);
  };

  const filteredProducts = products.filter((product) =>
    product.name?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      {/* =====================================================
          HERO SECTION
      ===================================================== */}

      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-label">HANDMADE & UNIQUE</span>

          <h1>
            Little things that
            <br />
            make you smile.
          </h1>

          <p>
            Discover our collection of cute handmade crochet keychains made to
            add personality to your everyday life.
          </p>

          <button
            className="hero-button"
            onClick={() =>
              document.getElementById("products")?.scrollIntoView({
                behavior: "smooth",
              })
            }
          >
            Shop Collection
          </button>
        </div>
      </section>

      {/* =====================================================
          PRODUCTS SECTION
      ===================================================== */}

      <section className="products-section" id="products">
        <div className="section-heading">
          <div>
            <span>OUR COLLECTION</span>

            <h2>Choose Your Favorite</h2>
          </div>

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* LOADING */}

        {loading && (
          <div className="status-message">
            <div className="loader"></div>
            <p>Loading products...</p>
          </div>
        )}

        {/* ERROR */}

        {!loading && error && (
          <div className="status-message">
            <h3>Unable to load products</h3>
            <p>{error}</p>
          </div>
        )}

        {/* PRODUCTS */}

        {!loading && !error && filteredProducts.length > 0 && (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
                user={user}
                setPage={setPage}
              />
            ))}
          </div>
        )}

        {/* NO PRODUCTS */}

        {!loading && !error && filteredProducts.length === 0 && (
          <div className="status-message">
            <h3>No products found</h3>
            <p>Try searching for another product.</p>
          </div>
        )}
      </section>
    </>
  );
}

export default Homepage;
