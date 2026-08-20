function Header({ page, setPage, cartCount, user }) {
  return (
    <header className="site-header">
      <div className="brand" onClick={() => setPage("home")}>
        SZ<span>.</span>
      </div>

      <nav className="navigation">
        <button
          className={page === "home" ? "active" : ""}
          onClick={() => setPage("home")}
        >
          Home
        </button>

        <button
          className={page === "wishlist" ? "active" : ""}
          onClick={() => setPage("wishlist")}
        >
          Wishlist ♡
        </button>

        <button
          className={page === "cart" ? "active" : ""}
          onClick={() => setPage("cart")}
        >
          Cart <span className="cart-count">{cartCount}</span>
        </button>

        <button
          className={page === "account" ? "active" : ""}
          onClick={() => setPage("account")}
        >
          {user ? "Account" : "Login"}
        </button>
      </nav>
    </header>
  );
}

export default Header;
