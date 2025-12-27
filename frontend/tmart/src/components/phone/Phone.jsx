import { useEffect, useState } from "react";
import { apiService } from "../../services/apiService";
import ProductItem from "../../pages/product/ProductItem";

export default function Phone() {
  // const slugParam = useParams();
  // console.log(slugParam)
  const [products,setProducts] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const response = await apiService.getDetailCategory("khoa-hoc-ky-thuat");
      console.log(response);
      setProducts(response.data.products);
    };

    fetchApi();
  }, []);

  return <>
    <div className="phone">
      <ProductItem data={products}/>

    </div>
  </>;
}
