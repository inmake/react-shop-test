import React, { useState, useEffect } from "react";
import ProductCard from "./components/ProductCard";
import { getSizes, getProducts } from "./services/api";
import ProductViewModal from "./components/ProductViewModal";

function App() {
  const [sizes, setSizes] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  async function fetchProducts() {
    setProducts(await getProducts());
  }

  async function fetchSizes() {
    setSizes(await getSizes());
  }

  useEffect(() => {
    fetchSizes();
    fetchProducts();
  }, []);

  return (
    <>
      <div className="container mx-auto p-8 xl:max-w-screen-xl space-y-8">
        <h1 className="text-4xl">My Shop</h1>
        <div className="grid grid-cols-4 gap-4">
          {products.length > 0
            ? products.map((product) => (
                <ProductCard
                  key={product.id}
                  name={product.name}
                  colors={product.colors}
                  handleClick={() => setSelectedProduct(product)}
                />
              ))
            : "Загрузка..."}
        </div>
      </div>

      {selectedProduct && (
        <ProductViewModal
          sizes={sizes}
          product={selectedProduct}
          handleClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
}

export default App;
