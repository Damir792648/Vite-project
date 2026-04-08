import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import ProductPage from "./ProductPage";
import Contacts from "./Contacts";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/contacts" element={<Contacts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
