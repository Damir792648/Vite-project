import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);
  const [search, setSearch] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [contactsOpen, setContactsOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert")
      .then((res) => res.json())
      .then((data) => {
        if (!data.meals) return;
        const productsWithPrice = data.meals.map((p) => ({
          ...p,
          price: Math.floor(Math.random() * 200) + 100,
        }));
        setProducts(productsWithPrice);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (id, name, image, price) => {
    const itemIndex = cart.findIndex((item) => item.id === id);

    if (itemIndex !== -1) {
      const newCart = [...cart];
      newCart[itemIndex].quantity += 1;
      setCart(newCart);
    } else {
      setCart([...cart, { id, name, image, price, quantity: 1 }]);
    }
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const increment = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrement = (id) => {
    setCart(
      cart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const filteredProducts = products.filter((p) =>
    p.strMeal.toLowerCase().includes(search.toLowerCase())
  );

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const checkout = () => {
    if (cart.length === 0) {
      alert("Корзина пустая");
      return;
    }

    alert("Заказ оформлен!");
    setCart([]);
    setCartOpen(false);
  };

  return (
    <div>
      <header>
        <h1>Кондитерские Изделия от MDS</h1>

        <div className="top-bar">
          <input
            className="search"
            placeholder="Поиск десертов"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div>
            <button onClick={() => setContactsOpen(true)}>
              Контакты
            </button>

            <button onClick={() => setCartOpen(true)}>
              Корзина ({cart.reduce((s, i) => s + i.quantity, 0)})
            </button>
          </div>
        </div>
      </header>

      <section id="menu">
        {filteredProducts.map((product) => (
          <div
            className="card"
            key={product.idMeal}
            onClick={() => navigate(`/product/${product.idMeal}`)}
          >
            <img src={product.strMealThumb} alt={product.strMeal} />
            <h3>{product.strMeal}</h3>
            <p>{product.price} сом</p>

            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(
                  product.idMeal,
                  product.strMeal,
                  product.strMealThumb,
                  product.price
                );
              }}
            >
              Добавить
            </button>
          </div>
        ))}
      </section>

      {/* КОРЗИНА ПО ЦЕНТРУ */}
      {cartOpen && (
        <div className="overlay" onClick={() => setCartOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Корзина</h2>

            {cart.map((item) => (
              <div key={item.id}>
                {item.name} ({item.quantity}) = {item.price * item.quantity} сом

                <div>
                  <button onClick={() => decrement(item.id)}>-</button>
                  <button onClick={() => increment(item.id)}>+</button>
                  <button onClick={() => removeItem(item.id)}>x</button>
                </div>
              </div>
            ))}

            <h3>Итого: {totalPrice} сом</h3>

            <button onClick={checkout}>Оформить заказ</button>
            <button onClick={() => setCartOpen(false)}>Закрыть</button>
          </div>
        </div>
      )}

      {/* КОНТАКТЫ */}
      {contactsOpen && (
        <div className="overlay" onClick={() => setContactsOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Контакты</h2>
            <p><b>Магазин:</b> MDS</p>
            <p><b>Телефон:</b> +996 700 123 456</p>
            <p><b>Email:</b> mds@example.com</p>
            <p><b>Адрес:</b> Бишкек, ул. Чуй 123</p>

            <button onClick={() => setContactsOpen(false)}>Закрыть</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
