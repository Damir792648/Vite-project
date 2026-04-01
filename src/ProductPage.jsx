import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.meals) {
          const p = data.meals[0];
          p.price = Math.floor(Math.random() * 200) + 100;
          setProduct(p);
        }
      });
  }, [id]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = () => {
    if (product) {
      setCart([
        ...cart,
        {
          id: product.idMeal,
          name: product.strMeal,
          image: product.strMealThumb,
          price: product.price,
        },
      ]);
      alert("Товар добавлен в корзину");
    }
  };

  if (!product) return <p>Загрузка...</p>;

  return (
    <div className="product-page">
      <h1>{product.strMeal}</h1>
      <img src={product.strMealThumb} alt={product.strMeal} />

      <p><strong>Цена:</strong> {product.price} сом</p>
      <p><strong>Описание:</strong> {product.strInstructions}</p>

      <button onClick={addToCart}>Добавить в корзину</button>

      <br /><br />
      <Link to="/">← Назад</Link>
    </div>
  );
}

export default ProductPage;