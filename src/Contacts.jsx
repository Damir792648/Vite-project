import { Link } from "react-router-dom";

function Contacts() {
  return (
    <div style={{ padding: "40px" }}>
      <h1>Контакты</h1>

      <p><b>Название:</b> Кондитерские Изделия от MDS</p>
      <p><b>Телефон:</b> +996 700 123 456</p>
      <p><b>Email:</b> mds@example.com</p>
      <p><b>Адрес:</b> г. Бишкек</p>

      <Link to="/">← Назад</Link>
    </div>
  );
}

export default Contacts;
