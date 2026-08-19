// import React, { useState } from 'react';
// import { supabase } from '../supabaseClient';

// export default function UserPortal({ user, onAuthSuccess }) {
//   const [isSignUp, setIsSignUp] = useState(false);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [authLoading, setAuthLoading] = useState(false);

//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');
//   const [price, setPrice] = useState('');
//   const [imageUrl, setImageUrl] = useState('');
//   const [productLoading, setProductLoading] = useState(false);

//   const handleAuth = async (e) => {
//     e.preventDefault();
//     setAuthLoading(true);
//     try {
//       if (isSignUp) {
//         const { error } = await supabase.auth.signUp({ email, password });
//         if (error) throw error;
//         alert('Registration successful! Check your email or log in.');
//       } else {
//         const { data, error } = await supabase.auth.signInWithPassword({ email, password });
//         if (error) throw error;
//         onAuthSuccess(data.user);
//       }
//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setAuthLoading(false);
//     }
//   };

//   const handleAddProduct = async (e) => {
//     e.preventDefault();
//     if (!user) return alert('You must be logged in.');

//     setProductLoading(true);
//     try {
//       const { error } = await supabase.from('products').insert([
//         {
//           name,
//           description,
//           price: parseFloat(price),
//           image_url: imageUrl,
//           user_id: user.id
//         }
//       ]);

//       if (error) throw error;

//       alert('Product published successfully!');
//       setName('');
//       setDescription('');
//       setPrice('');
//       setImageUrl('');
//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setProductLoading(false);
//     }
//   };

//   if (user) {
//     return (
//       <div className="auth-form-card">
//         <h2 style={{ marginBottom: '4px' }}>Seller Portal</h2>
//         <p style={{ color: 'var(--text-muted)', marginBottom: '20px', fontSize: '0.9rem' }}>
//           Logged in as: <strong>{user.email}</strong>
//         </p>

//         <form onSubmit={handleAddProduct} style={styles.form}>
//           <h3>Add New Product</h3>
//           <input 
//             type="text" 
//             placeholder="Product Title" 
//             value={name} 
//             onChange={(e) => setName(e.target.value)} 
//             required 
//             style={styles.input} 
//           />
//           <textarea 
//             placeholder="Product Description" 
//             value={description} 
//             onChange={(e) => setDescription(e.target.value)} 
//             required 
//             style={{ ...styles.input, height: '90px', resize: 'vertical' }} 
//           />
//           <input 
//             type="number" 
//             step="0.01" 
//             placeholder="Price ($)" 
//             value={price} 
//             onChange={(e) => setPrice(e.target.value)} 
//             required 
//             style={styles.input} 
//           />
//           <input 
//             type="url" 
//             placeholder="Image URL (https://...)" 
//             value={imageUrl} 
//             onChange={(e) => setImageUrl(e.target.value)} 
//             required 
//             style={styles.input} 
//           />
//           <button type="submit" disabled={productLoading} style={styles.primaryBtn}>
//             {productLoading ? 'Publishing...' : 'Add Product for Sale'}
//           </button>
//         </form>
//       </div>
//     );
//   }

//   return (
//     <div className="auth-form-card">
//       <h2 style={{ marginBottom: '20px' }}>{isSignUp ? 'Create Account' : 'Seller Login'}</h2>
//       <form onSubmit={handleAuth} style={styles.form}>
//         <input 
//           type="email" 
//           placeholder="Email address" 
//           value={email} 
//           onChange={(e) => setEmail(e.target.value)} 
//           required 
//           style={styles.input} 
//         />
//         <input 
//           type="password" 
//           placeholder="Password" 
//           value={password} 
//           onChange={(e) => setPassword(e.target.value)} 
//           required 
//           style={styles.input} 
//         />
//         <button type="submit" disabled={authLoading} style={styles.primaryBtn}>
//           {authLoading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Log In'}
//         </button>
//       </form>
//       <p style={{ marginTop: '16px', textAlign: 'center', fontSize: '0.9rem' }}>
//         {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
//         <span 
//           onClick={() => setIsSignUp(!isSignUp)} 
//           style={styles.toggleLink}
//         >
//           {isSignUp ? 'Log In' : 'Sign Up'}
//         </span>
//       </p>
//     </div>
//   );
// }

// const styles = {
//   form: { display: 'flex', flexDirection: 'column', gap: '14px' },
//   input: { padding: '10px 12px', borderRadius: 'var(--border-radius)', border: '1px solid var(--border-color)', width: '100%' },
//   primaryBtn: { padding: '12px', border: 'none', backgroundColor: 'var(--primary-color)', color: '#ffffff', fontWeight: 'bold' },
//   toggleLink: { color: 'var(--primary-color)', cursor: 'pointer', textDecoration: 'underline', fontWeight: 'bold' }
// };






















import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function UserPortal({ user, onAuthSuccess }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [productLoading, setProductLoading] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        alert('Registration successful! Check your email or log in.');
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        onAuthSuccess(data.user);
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!user) return alert('You must be logged in.');

    setProductLoading(true);
    try {
      const { error } = await supabase.from('products').insert([
        {
          name,
          description,
          price: parseFloat(price),
          image_url: imageUrl,
          user_id: user.id
        }
      ]);

      if (error) throw error;

      alert('Product published successfully!');
      setName('');
      setDescription('');
      setPrice('');
      setImageUrl('');
    } catch (err) {
      alert(err.message);
    } finally {
      setProductLoading(false);
    }
  };

  if (user) {
    return (
      <div className="auth-form-card">
        <h2>Seller Portal</h2>
        <p className="status-text" style={{ textAlign: 'left', padding: '0 0 20px 0', fontSize: '0.9rem' }}>
          Logged in as: <strong>{user.email}</strong>
        </p>

        <form onSubmit={handleAddProduct} className="form-group">
          <h3>Add New Product</h3>
          <input 
            type="text" 
            placeholder="Product Title" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
            className="form-input" 
          />
          <textarea 
            placeholder="Product Description" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            required 
            className="form-textarea" 
          />
          <input 
            type="number" 
            step="0.01" 
            placeholder="Price ($)" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
            required 
            className="form-input" 
          />
          <input 
            type="url" 
            placeholder="Image URL (https://...)" 
            value={imageUrl} 
            onChange={(e) => setImageUrl(e.target.value)} 
            required 
            className="form-input" 
          />
          <button type="submit" disabled={productLoading} className="primary-btn">
            {productLoading ? 'Publishing...' : 'Add Product for Sale'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="auth-form-card">
      <h2 style={{ marginBottom: '20px' }}>{isSignUp ? 'Create Account' : 'Seller Login'}</h2>
      <form onSubmit={handleAuth} className="form-group">
        <input 
          type="email" 
          placeholder="Email address" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          className="form-input" 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
          className="form-input" 
        />
        <button type="submit" disabled={authLoading} className="primary-btn">
          {authLoading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Log In'}
        </button>
      </form>
      <p style={{ marginTop: '16px', textAlign: 'center', fontSize: '0.9rem' }}>
        {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
        <span onClick={() => setIsSignUp(!isSignUp)} className="toggle-link">
          {isSignUp ? 'Log In' : 'Sign Up'}
        </span>
      </p>
    </div>
  );
}