
import { useState, useEffect } from "react";
import initialProducts from "./data/data";
import Products from "./components/Products";

function App() {

  // INITIALIZE PRODUCTS FROM LOCAL STORAGE
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem("products");

    return savedProducts !== null
      ? JSON.parse(savedProducts)
      : initialProducts;
  });

  // SAVE WHEN PRODUCTS CHANGE
  useEffect(() => {
    localStorage.setItem(
      "products",
      JSON.stringify(products)
    );
  }, [products]);

  return (
    <div>
      <h1>Product Management App</h1>

      <Products
        products={products}
        setProducts={setProducts}
      />
    </div>
  );
}

export default App;
