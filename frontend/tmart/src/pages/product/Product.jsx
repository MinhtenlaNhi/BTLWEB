import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import MainTitle from "@/components/mainTitle";
import OptionInput from "./OptionInput";
import ProductList from "./ProductList";
import "../../assets/style/main.css";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import useGetProduct from "../../hooks/useGetProduct";
import useGetProductsOfCategory from "../../hooks/useGetProductOfCategory";

function Product({slugCategory}) {
  const [products, setProduct] = useState([]);
  const [textTitle,setTextTitle] = useState(slugCategory ? slugCategory : "Tất cả sách");
  const resultOfProducts = useGetProduct();
  const resultOfProductsCategory = useGetProductsOfCategory(slugCategory);
  useEffect(() => {
    if(!slugCategory){
      setProduct(resultOfProducts.products);
    }
    else{
      setProduct(resultOfProductsCategory.products);
      setTextTitle(slugCategory);
    }
  }, [setTextTitle,resultOfProducts.products,resultOfProductsCategory.products,slugCategory]);

  const handleSortProduct = (e) => {
    const [sortBy, sortValue] = e.target.getAttribute("name").split("-");
    const url = new URL(window.location.href);
    url.searchParams.set("sortBy", sortBy);
    url.searchParams.set("sortValue", sortValue);
    window.location.href = url;
  };

  const handleSortProductBySelect = (e) => {
    const [sortBy, sortValue] = e.target.value.split("-");
    const url = new URL(window.location.href);
    url.searchParams.set("sortBy", sortBy);
    url.searchParams.set("sortValue", sortValue);
    window.location.href = url;
  };
  return (
    <>
      <MainTitle textTitle={textTitle}/>

      <div className="product-list">
        <Container>
          <Row>
            <Col sm={3} lg={3} className="pl-0 d-none d-lg-block">
              <OptionInput />
            </Col>

            <Col sm={12} md={12} lg={9}>
              <Row>
                <h2>{textTitle}</h2>
              </Row>
              <Row>
                <Col sm={12}>
                  <div className="sort-span my-3">
                    <span>Sắp xếp: </span>
                    <span
                      onClick={handleSortProduct}
                      className="sort-item"
                      name="title-asc"
                    >
                      Tên A - Z
                    </span>
                    <span
                      onClick={handleSortProduct}
                      className="sort-item"
                      name="title-desc"
                    >
                      Tên Z - A
                    </span>
                    <span
                      onClick={handleSortProduct}
                      className="sort-item"
                      name="price-asc"
                    >
                      Giá tăng dần
                    </span>
                    <span
                      onClick={handleSortProduct}
                      className="sort-item"
                      name="price-desc"
                    >
                      Giá giảm dần
                    </span>
                    <span
                      onClick={handleSortProduct}
                      className="sort-item"
                      name="position-desc"
                    >
                      Hàng mới
                    </span>
                  </div>
                </Col>
                <Col sm={12}>
                  <div className="sort-product my-3">
                    <span>Sắp xếp: </span>
                    <select
                      name="sort"
                      id="sort"
                      onChange={handleSortProductBySelect}
                    >
                      <option disabled>Sắp xếp</option>
                      <option value="title-asc">Tên A - Z</option>
                      <option value="title-desc">Tên Z-A</option>
                      <option value="price-asc">Giá tăng dần</option>
                      <option value="price-desc">Giá giảm dần</option>
                      <option value="position-desc">Hàng mới</option>
                    </select>
                  </div>
                </Col>
              </Row>
              <Row>
                <ProductList data={products}/>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col>
              <Pagination result={!slugCategory ? resultOfProducts : resultOfProductsCategory} />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Product;
