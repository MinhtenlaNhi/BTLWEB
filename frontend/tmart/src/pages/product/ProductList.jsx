import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { apiService } from "../../services/apiService";

export default function ProductList({ data,textTitle }) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    if(data){
      setProducts(data);
    }
  },[data]);
  return (
    <>
      <ProductItem data={products} textTitle={textTitle}/>
    </>
  );
}
