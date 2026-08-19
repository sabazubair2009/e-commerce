// import React from 'react';

// export default function Header({ currentView, setCurrentView, cartCount, user, onLogout }) {
//   return (
//     <header style={styles.header} className="header-container">
//       <h2 style={styles.logo} onClick={() => setCurrentView('home')}>
//         🛍️ SwiftStore
//       </h2>
//       <nav style={styles.nav} className="nav-menu">
//         <button 
//           style={currentView === 'home' ? styles.activeBtn : styles.btn} 
//           onClick={() => setCurrentView('home')}
//         >
//           Home
//         </button>
//         <button 
//           style={currentView === 'userPortal' ? styles.activeBtn : styles.btn} 
//           onClick={() => setCurrentView('userPortal')}
//         >
//           {user ? 'Seller Portal' : 'Login / Register'}
//         </button>
//         <button 
//           style={currentView === 'cart' ? styles.activeBtn : styles.btn} 
//           onClick={() => setCurrentView('cart')}
//         >
//           Cart ({cartCount})
//         </button>
//         {user && (
//           <button style={styles.logoutBtn} onClick={onLogout}>
//             Logout
//           </button>
//         )}
//       </nav>
//     </header>
//   );
// }

// const styles = {
//   header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 32px', backgroundColor: 'var(--header-bg)', color: '#ffffff' },
//   logo: { margin: 0, cursor: 'pointer', fontSize: '1.4rem' },
//   nav: { display: 'flex', gap: '10px', alignItems: 'center' },
//   btn: { padding: '8px 16px', border: 'none', background: '#334155', color: '#ffffff' },
//   activeBtn: { padding: '8px 16px', border: 'none', background: 'var(--primary-color)', color: '#ffffff', fontWeight: 'bold' },
//   logoutBtn: { padding: '8px 16px', border: 'none', background: 'var(--danger-color)', color: '#ffffff' }
// };
















import React from 'react';

export default function Header({ currentView, setCurrentView, cartCount, user, onLogout }) {
  return (
    <header className="header">
      <h2 className="logo" onClick={() => setCurrentView('home')}>
        🛍️ SwiftStore
      </h2>
      <nav className="nav">
        <button 
          className={currentView === 'home' ? 'nav-btn-active' : 'nav-btn'} 
          onClick={() => setCurrentView('home')}
        >
          Home
        </button>
        <button 
          className={currentView === 'userPortal' ? 'nav-btn-active' : 'nav-btn'} 
          onClick={() => setCurrentView('userPortal')}
        >
          {user ? 'Seller Portal' : 'Login / Register'}
        </button>
        <button 
          className={currentView === 'cart' ? 'nav-btn-active' : 'nav-btn'} 
          onClick={() => setCurrentView('cart')}
        >
          Cart ({cartCount})
        </button>
        {user && (
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        )}
      </nav>
    </header>
  );
}