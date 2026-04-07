import React, { useEffect, useState } from "react";

const ProductList = ({ category }: { category: string }) => {
  const [products, setProducts] = useState<string[]>([]);
  useEffect(() => {
    // TODO: Fetch real products based on category
    setProducts(["clothing", "household"]);
  }, [category]);
  return <div>ProductList</div>;
};

export default ProductList;
