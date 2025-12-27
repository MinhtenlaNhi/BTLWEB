import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { apiService } from "../services/apiService";

export default function useGetProductsOfCategory(slugCategory) {
  const [searchParams, _] = useSearchParams();
  const sortBy = searchParams.get("sortBy");
  const sortValue = searchParams.get("sortValue");
  const pageParam = searchParams.get("page");

  const [listProduct, setListProduct] = useState({
    products: [],
    pagination: 0,
  });
  useEffect(() => {
    const fetchApi = async () => {
      if (pageParam) {
        const response = await apiService.getProductsOfCategory(
          sortBy,
          sortValue,
          pageParam,
          slugCategory
        );
        setListProduct({
          products: response.data.products,
          pagination: response.data.pagination,
        });
      } else {
        const response = await apiService.getProductsOfCategory(sortBy, sortValue,1,slugCategory);
        setListProduct({
          products: response.data.products,
          pagination: response.data.pagination,
        });
      }
    };
    fetchApi();
  }, [pageParam, sortBy, sortValue,slugCategory]);
  return listProduct;
}
