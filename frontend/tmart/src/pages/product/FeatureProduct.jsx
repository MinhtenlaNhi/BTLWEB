import { useEffect, useState } from "react";
import { GrNext } from "react-icons/gr";
import { apiService } from "../../services/apiService";
import Col from "react-bootstrap/esm/Col";

export default function FeatureProduct() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function fetchApi() {
      const res = await apiService.getProducts();
      console.log("res feature", res.data);
      setProducts(res.data.productsFeatured);
    }
    fetchApi();
  }, []);


  return (
    <>
      {products && (
        <div className="top-ten d-flex justify-content-between">
          {products.map((item, index) => {
            return (
              <Col
                sm={3}
                md={2}
                lg={1}
                xs={6}
                className="px-0 mr-xl-3"
                key={index}
              >
                <div className="best-seller">
                  <div className="">
                    <img src={item.thumbnail} alt="Ảnh" />
                    <span className="text-center">
                      {item.title}
                    </span>
                  </div>
                </div>
              </Col>
            );
          })}
          <div className="slide d-lg-none d-md-inline">
            <GrNext />
          </div>
        </div>
      )}

      {/* {top &&
                  top.map((item) => {
                    return (
                      <Col
                        sm={3}
                        md={2}
                        lg={1}
                        xs={6}
                        className="px-0 mr-xl-3"
                        key={item.id}
                      >
                        <div className="best-seller">
                          <div className="">
                            <img src={item.thumbnail} alt="Ảnh" />
                            <span>
                              {item.category.charAt(0).toUpperCase() +
                                item.category.slice(1)}
                            </span>
                          </div>
                        </div>
                      </Col>
                    );
                  })} */}
    </>
  );
}
