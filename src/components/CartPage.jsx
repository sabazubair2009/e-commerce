// import React, { useState } from 'react';
// import { supabase } from '../supabaseClient';

// export default function CartPage({ cart, updateQuantity, clearCart, user }) {
//   const [submitting, setSubmitting] = useState(false);

//   const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

//   const handlePlaceOrder = async () => {
//     if (cart.length === 0) return alert('Your cart is empty.');

//     setSubmitting(true);
//     try {
//       const { error } = await supabase.from('orders').insert([
//         {
//           items: cart,
//           total: total,
//           status: 'pending',
//           user_id: user ? user.id : null
//         }
//       ]);

//       if (error) throw error;

//       alert('🎉 Order Placed Successfully!');
//       clearCart();
//     } catch (err) {
//       alert('Order failed: ' + err.message);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h2 style={{ marginBottom: '20px' }}>Your Shopping Cart</h2>
//       {cart.length === 0 ? (
//         <p style={{ color: 'var(--text-muted)' }}>Your cart is empty.</p>
//       ) : (
//         <div style={styles.card}>
//           {cart.map((item) => (
//             <div key={item.id} style={styles.cartItem} className="cart-item">
//               <div>
//                 <h4 style={{ margin: '0 0 4px 0' }}>{item.name}</h4>
//                 <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
//                   ${Number(item.price).toFixed(2)} each
//                 </span>
//               </div>
//               <div style={styles.controls} className="cart-controls">
//                 <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//                   <button style={styles.qtyBtn} onClick={() => updateQuantity(item.id, -1)}>-</button>
//                   <span style={{ minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
//                   <button style={styles.qtyBtn} onClick={() => updateQuantity(item.id, 1)}>+</button>
//                 </div>
//                 <span style={{ fontWeight: 'bold', minWidth: '80px', textAlign: 'right' }}>
//                   ${(item.price * item.quantity).toFixed(2)}
//                 </span>
//               </div>
//             </div>
//           ))}

//           <div style={styles.checkout}>
//             <h3>Total: ${total.toFixed(2)}</h3>
//             <button 
//               onClick={handlePlaceOrder} 
//               disabled={submitting} 
//               style={styles.orderBtn}
//             >
//               {submitting ? 'Processing...' : 'Place Order'}
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// const styles = {
//   container: { maxWidth: '800px', margin: '0 auto' },
//   card: { backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius)', padding: '20px' },
//   cartItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', padding: '16px 0' },
//   controls: { display: 'flex', alignItems: 'center', gap: '16px' },
//   qtyBtn: { width: '32px', height: '32px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', borderRadius: '4px', fontWeight: 'bold' },
//   checkout: { marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px' },
//   orderBtn: { padding: '12px 24px', backgroundColor: 'var(--success-color)', color: '#ffffff', border: 'none', fontWeight: 'bold' }
// };

























import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function CartPage({ cart, updateQuantity, clearCart, user }) {
  const [submitting, setSubmitting] = useState(false);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handlePlaceOrder = async () => {
    if (cart.length === 0) return alert('Your cart is empty.');

    setSubmitting(true);
    try {
      const { error } = await supabase.from('orders').insert([
        {
          items: cart,
          total: total,
          status: 'pending',
          user_id: user ? user.id : null
        }
      ]);

      if (error) throw error;

      alert('🎉 Order Placed Successfully!');
      clearCart();
    } catch (err) {
      alert('Order failed: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="cart-container">
      <h2 className="page-title">Your Shopping Cart</h2>
      {cart.length === 0 ? (
        <p className="status-text">Your cart is empty.</p>
      ) : (
        <div className="cart-card">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <div>
                <h4 style={{ margin: '0 0 4px 0' }}>{item.name}</h4>
                <span className="status-text" style={{ padding: 0, fontSize: '0.9rem' }}>
                  ${Number(item.price).toFixed(2)} each
                </span>
              </div>
              <div className="cart-controls">
                <div className="qty-group">
                  <button className="qty-btn" onClick={() => updateQuantity(item.id, -1)}>-</button>
                  <span className="qty-val">{item.quantity}</span>
                  <button className="qty-btn" onClick={() => updateQuantity(item.id, 1)}>+</button>
                </div>
                <span className="item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            </div>
          ))}

          <div className="checkout-section">
            <h3>Total: ${total.toFixed(2)}</h3>
            <button 
              onClick={handlePlaceOrder} 
              disabled={submitting} 
              className="order-btn"
            >
              {submitting ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}