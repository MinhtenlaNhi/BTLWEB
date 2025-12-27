import { useEffect, useRef, useState } from "react";
import { apiService } from "../../services/apiService";
import ProductItem from "../../pages/product/ProductItem";
import "../../pages/Home/home.css";

export default function Fashion() {
  // const slugParam = useParams();
  // console.log(slugParam)
  const [products, setProducts] = useState([]);
  const refElement = useRef();
  useEffect(() => {
    const fetchApi = async () => {
      const response = await apiService.getDetailCategory("van-hoc");
      console.log(response);
      setProducts(response.data.products);
    };

    fetchApi();
  }, []);


  return (
    <>
      <div className="fashion" ref={refElement}>
        <ProductItem data={products} />
      </div>
    </>
  );
}
