// import React, { useEffect, useState } from 'react';
// import { supabase } from '../supabaseClient';
// import Product from './product';

// export default function HomePage({ onAddToCart }) {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
//       const { data, error } = await supabase
//         .from('products')
//         .select('*')
//         .order('created_at', { ascending: false });

//       if (error) throw error;
//       setProducts(data || []);
//     } catch (err) {
//       console.error('Error fetching products:', err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <div style={styles.statusText}>Loading catalog...</div>;

//   return (
//     <div>
//       <h2 style={{ marginBottom: '8px' }}>Explore Catalog</h2>
//       {products.length === 0 ? (
//         <p style={styles.statusText}>No products available yet. Log in to add items!</p>
//       ) : (
//         <div className="products-grid">
//           {products.map((item) => (
//             <Product key={item.id} product={item} onAddToCart={onAddToCart} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// const styles = {
//   statusText: { textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }
// }; 











import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import Product from './Product';

export default function HomePage({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (err) {
      console.error('Error fetching products:', err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="status-text">Loading catalog...</div>;

  return (
    <div>
      <h2 className="page-title">Explore Catalog</h2>
      {products.length === 0 ? (
        <p className="status-text">No products available yet. Log in to add items!</p>
      ) : (
        <div className="products-grid">
          {products.map((item) => (
            <Product key={item.id} product={item} onAddToCart={onAddToCart} />
          ))}
        </div>
      )}
    </div>
  );
}