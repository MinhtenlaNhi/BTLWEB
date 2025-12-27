import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { apiService } from "../services/apiService";

export default function useSearchProduct() {
  const [searchParams, setSearchParams] = useSearchParams();

  const keywordParam = searchParams.get("keyword");
  const pageParam = searchParams.get("page");

  const [listProductSearch, setListProductSearch] = useState({
    products: [],
    length: 0,
  });
  useEffect(() => {
    const fetchApi = async () => {
      if (keywordParam) {
        const response = await apiService.searchProduct(
          keywordParam,
          pageParam
        );
        setListProductSearch({
          products: response.data.products,
          pagination: response.data.pagination,
        });
      }
    };
    fetchApi();
  }, [keywordParam, pageParam]);
  return listProductSearch;
}
