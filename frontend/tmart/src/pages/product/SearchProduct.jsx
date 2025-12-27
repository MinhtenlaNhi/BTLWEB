import MainSupport from "@/components/mainSupport";
import TitleMenu from "@/components/titleMenu";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Title from "../../components/title/Title";
import ProductList from "./ProductList";
import Pagination from "./Pagination";
import useSearchProduct from "../../hooks/useSearchProduct";
import { useEffect, useState } from "react";


export default function SearchProduct() {
  const [pagination, setPagination] = useState({});
  const resultSearch = useSearchProduct();
  useEffect(() => {
    setPagination(resultSearch.pagination);
  },[resultSearch]);

  return (
    <>
      <div className="products-search">
        <Container>
          <Row>
            <Col>
              <TitleMenu />
            </Col>

            <Col sm={9} lg={8} className="px-0">
              <MainSupport />
            </Col>
          </Row>
          <Row>
            <Title />
          </Row>
          <Row>
            <Col>
              <h3 className="my-3">{pagination ? `CÓ ${pagination.totalProduct} KẾT QUẢ TÌM KIẾM PHÙ HỢP` : 'KHÔNG CÓ KẾT QUẢ TÌM KIẾM PHÙ HỢP'}</h3>
            </Col>
          </Row>
          <Row>
            <ProductList data={resultSearch.products} />
          </Row>
          <Row>
            <Pagination result={resultSearch}/>
          </Row>
        </Container>
      </div>
    </>
  );
}
