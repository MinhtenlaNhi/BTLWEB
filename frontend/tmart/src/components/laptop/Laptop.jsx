import { useEffect, useState } from "react";
import { apiService } from "../../services/apiService";
import ProductItem from "../../pages/product/ProductItem";

export default function Laptop() {
  // const slugParam = useParams();
  // console.log(slugParam)
  const [products,setProducts] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const response = await apiService.getDetailCategory("kinh-te-quan-tri");
      console.log(response);
      setProducts(response.data.products);
    };

    fetchApi();
  }, []);

  return <>
    <div className="laptop">
      <ProductItem data={products}/>

    </div>
  </>;
}
