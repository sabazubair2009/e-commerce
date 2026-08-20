function CartPage({ cart, removeFromCart, changeQuantity }) {
  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0,
  );

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (cart.length === 0) {
    return (
      <section className="cart-page">
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>

          <h1>Your Cart is Empty</h1>

          <p>Looks like you haven't added anything to your cart yet.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="cart-page">
      <div className="page-heading">
        <span>SHOPPING BAG</span>
        <h1>Your Cart</h1>
      </div>

      <div className="cart-layout">
        {/* CART PRODUCTS */}
        <div className="cart-items">
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <div className="cart-item-image">
                <img src={item.image_url} alt={item.name} />
              </div>

              <div className="cart-item-details">
                <h3>{item.name}</h3>

                <p>{item.category}</p>

                {/* PRODUCT PRICE */}
                <strong>
                  Rs. {Number(item.price).toLocaleString("en-PK")}
                </strong>

                <div className="cart-actions">
                  <div className="quantity-control">
                    <button onClick={() => changeQuantity(item.id, -1)}>
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button onClick={() => changeQuantity(item.id, 1)}>
                      +
                    </button>
                  </div>

                  <button
                    className="remove-button"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>

              {/* INDIVIDUAL ITEM TOTAL */}
              <div className="cart-item-total">
                Rs.{" "}
                {(Number(item.price) * item.quantity).toLocaleString("en-PK")}
              </div>
            </div>
          ))}
        </div>

        {/* ORDER SUMMARY */}
        {/* related content here */}
        <aside className="order-summary">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Items</span>

            <span>{totalItems}</span>
          </div>

          {/* FINAL TOTAL  */}
          <div className="summary-row total-row">
            <span>Total</span>

            <strong>Rs. {total.toLocaleString("en-PK")}</strong>
          </div>

          <button className="checkout-button">Proceed to Checkout</button>
        </aside>
      </div>
    </section>
  );
}

export default CartPage;
