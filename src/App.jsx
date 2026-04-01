import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);
  const [search, setSearch] = useState("");
  const [cartOpen, setCartOpen] = useState(false);

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
    setCart([...cart, { id, name, image, price }]);
    alert("Товар добавлен в корзину");
  };

  const removeItem = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const filteredProducts = products.filter((p) =>
    p.strMeal.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <header>
        <h1>Кондитерские Изделия</h1>

        <div className="top-bar">
          <input
            className="search"
            placeholder="Поиск десертов"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button onClick={() => setCartOpen(true)}>
            Корзина ({cart.length})
          </button>

          <div className="contacts">
            <p>📍 Бишкек, Киевская 114/1</p>
            <p>📞 +996 700 123 456</p>
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
            <p>Цена: {product.price} сом</p>

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

      <div className={`cart ${cartOpen ? "open" : ""}`}>
        <h2>Корзина</h2>

        <div id="cart-items">
          {cart.map((item, index) => (
            <div className="cart-item" key={index}>
              <span>
                {item.name} - {item.price} сом
              </span>

              <span className="remove" onClick={() => removeItem(index)}>
                ❌
              </span>
            </div>
          ))}
        </div>

        <button onClick={() => setCartOpen(false)}>Закрыть</button>
      </div>
    </div>
  );
}

export default App;