import "bootstrap/dist/css/bootstrap.min.css";
import { PiGreaterThanThin } from "react-icons/pi";
import { PiLessThanThin } from "react-icons/pi";
import { CiDeliveryTruck } from "react-icons/ci";
import { AiOutlineFileProtect } from "react-icons/ai";
import { IoAdd } from "react-icons/io5";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import avartar from "../../assets/image/avartar.jpg";
import "./Product.css";
import MainTitle from "@/components/mainTitle";
// import { useDispatch, useSelector } from "react-redux";
// import { useSlider } from "../../hooks/useSlider/useSlider";
import { useEffect, useState } from "react";
import { apiService } from "../../services/apiService";
import { Link, useNavigate, useParams } from "react-router";
import { useCookies } from "react-cookie";
// import { cart } from "../../actions/cart";
// import { settingCart } from "../../constant/settingCart";
// import { settingQuantity } from "../../constant/settingQuantity";
// import { useFetchApi } from "../../hooks/useFetchApi/useFetchApi";
import { Alert, Rate } from "antd";
import { Flex } from "antd";
import "./Product.css";
function DetailProduct() {
  const [reviews, setReview] = useState([]);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();
  const [cookies, _] = useCookies();
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState({
    message: "",
    type: "",
  });
  const [quantity, setQuantity] = useState(1);
  const desc = ["terrible", "bad", "normal", "good", "wonderful"];
  const [value, setValue] = useState(0);
  const params = useParams();
  const slug = params.slug;
  const [productDetail, setProductDetail] = useState({
    product: [],
    category: "",
    productsRelated: [],
  });
  useEffect(() => {
    const fetchApiProduct = async () => {
      try {
        console.log("chay vao day")
        const response = await apiService.getDetailProduct(slug);
        setProductDetail({
          product: response.data.product,
          category: response.data.category.title,
          productsRelated: response.data.productsRelated,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchApiProduct();
  }, [slug]);
  useEffect(() => {
    const fetchApiReview = async () => {
      try {
        const response = await apiService.getReview(productDetail.product._id);
        if (response.data.code === 200) {
          setReview(response.data.reviewer);
        }
        
      } catch (error) {
        console.log(error);
      }
    };
    fetchApiReview();
  },[productDetail.product._id])
  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  const handleSubQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddQuantity = () => {
    if (productDetail.product.stock > quantity) {
      setQuantity(quantity + 1);
    } else {
      setShowAlert(true);
      setAlert({
        message: "Số lượng trong kho hàng không đủ!",
        type: "error",
      });
    }
  };

  const handleAddProduct = async () => {
    try {
      const response = await apiService.postAddCart(
        cookies.cartId,
        productDetail.product._id,
        quantity
      );
      setShowAlert(true);
      setAlert({
        message: response.data.message,
        type: "success",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!cookies.tokenUser) {
      navigate("/auth");
    } else {
      const productId = productDetail.product._id;
      const tokenUser = cookies.tokenUser;

      if (comment !== "" && productId && tokenUser) {
        const fetchApiReview = async () => {
          const response = await apiService.postAddReview(
            productId,
            tokenUser,
            comment,
            value
          );
          if (response.data.code === 200) {
            setShowAlert(true);
            setAlert({
              message: response.data.message,
              type: "success",
            });
            setComment("");
            setValue(0);
            const fetchApiReview = async () => {
              try {
                const response = await apiService.getReview(
                  productDetail.product._id
                );
                if (response.data.code === 200) {
                  console.log(response.data.reviewer);
                  setReview(response.data.reviewer);
                }
              } catch (error) {
                console.log(error);
              }
            };
            fetchApiReview();
          }
        };
        fetchApiReview();
      } else {
        setShowAlert(true);
        setAlert({
          message: "Hãy điền đầy đủ thông tin đánh giá sách!",
          type: "error",
        });
      }
    }
  };
  return (
    <>
      {showAlert && (
        <Alert
          message={alert.message}
          type={alert.type}
          showIcon
          closable
          className="box-alert"
        />
      )}
      {productDetail.product ? (
        <div className="detail-product">
          <Container>
            <MainTitle textTitle={productDetail.product.title} />
            <Row>
              <Col xl={9} lg={12} md={12} className="px-0">
                <div className="left">
                  <div className="image">
                    <div className="wrapper">
                      <div
                        className="prev"
                        // onClick={handleSlider}
                      >
                        <PiLessThanThin className="icon" />
                      </div>

                      <div
                        className="main-img"
                        // ref={sliderWrapper}
                      >
                        <div className="item-image">
                          <img
                            src={productDetail.product.thumbnail}
                            alt="Ảnh"
                          />
                        </div>
                        {/* {products.attributeProduct.images.length > 1 ? (
                          products.attributeProduct.images.map(
                            (item, index) => {
                              return (
                                <div className="item-image" key={index}>
                                  <img src={item} alt="Ảnh" />
                                </div>
                              );
                            }
                          )
                        ) : (
                          <div className="item-image">
                            <img
                              src={products.attributeProduct.thumbnail}
                              alt="Ảnh"
                            />
                          </div>
                        )} */}
                      </div>

                      <div
                        className="next"
                        // onClick={handleSlider}
                      >
                        <PiGreaterThanThin className="icon" />
                      </div>
                    </div>
                    <div className="footer-img d-md-none d-lg-flex justify-content-center">
                      <img src={productDetail.product.thumbnail} alt="Ảnh" />
                    </div>
                    {/* {products.attributeProduct.images.length > 1 ? (
                      <div className="footer-img d-md-none d-lg-flex">
                        {products.attributeProduct.images.map((item, index) => {
                          return (
                            <img
                              src={item}
                              alt="Ảnh"
                              key={index}
                              onClick={handleSlider}
                              id={index}
                            />
                          );
                        })}
                      </div>
                    ) : (
                      <div className="footer-img d-md-none d-lg-flex justify-content-center">
                        <img
                          src={products.attributeProduct.images[0]}
                          alt="Ảnh"
                        />
                      </div>
                    )} */}
                  </div>

                  <div className="main-product">
                    <h3>{productDetail.product.title}</h3>
                    <p className="mr-xl-3 d-xl-inline">
                      Danh mục:
                      <span className="text-success">
                        {productDetail.category}
                      </span>
                    </p>
                    {/* <p className=" d-xl-inline">
                      <span>Mã sản phẩm:</span>
                      <span className="text-success">
                        {products.attributeProduct.sku}
                      </span>
                    </p> */}
                    <div className="detail-price">
                      <span className="price-discount">
                        {productDetail.product.price}$
                      </span>

                      <span className="price-main">
                        {(
                          productDetail.product.price -
                          productDetail.product.discountPercentage
                        ).toFixed(2)}
                        $
                      </span>
                      <span className="discount-percent">
                        -{productDetail.product.discountPercentage}%
                      </span>
                      <div className="">
                        (Tiết kiệm:{" "}
                        <span>
                          {(
                            productDetail.product.discountPercentage -
                            productDetail.product.price
                          ).toFixed(2)}
                          $
                        </span>
                        )
                      </div>
                      <div className="my-2">(Giá sách đã bao gồm VAT)</div>
                      <div className="quantity">
                        <span>Số lượng: </span>
                        <div className="change-quantity">
                          <button className="sub" onClick={handleSubQuantity}>
                            -
                          </button>
                          <span>{quantity}</span>
                          <button className="add" onClick={handleAddQuantity}>
                            +
                          </button>
                        </div>
                      </div>

                      <div className="buy">
                        <span>MUA NGAY</span>
                        <div className="">
                          Thanh toán bằng tiền mặt hoặc chuyển khoản
                        </div>
                      </div>
                      <button className="add" onClick={handleAddProduct}>
                        THÊM VÀO GIỎ HÀNG
                      </button>
                    </div>
                  </div>
                </div>
              </Col>
              <Col xl={3} lg={12} className="pl-0">
                <div className="right">
                  <div className="special">
                    <CiDeliveryTruck className="icon text-warning" />
                    <h3>Giao hàng nhanh</h3>

                    <p className="desc">
                      Giao hàng nhanh, được xem hàng trước khi thanh toán, phí
                      vận chuyển siêu rẻ
                    </p>
                  </div>
                  <div className="special">
                    <AiOutlineFileProtect className="icon text-primary" />
                    <h3>Mua hàng tiết kiệm</h3>
                    <p className="desc">
                      Cam kết bán hàng chính hãng phân phối, đền gấp 10 lần nếu
                      phát hiện hàng giả, hàng nhái
                    </p>
                  </div>
                  <div className="special">
                    <CiDeliveryTruck className="icon text-danger" />
                    <h3>Sách chính hãng</h3>

                    <p className="desc">
                      Giá tốt hơn từ 10% - 30% so với thị trường, thanh toán
                      linh hoạt, trả góp lãi suất 0% qua thẻ tín dụng Visa,
                      Master, JCB
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col className="px-0">
                <div className="infor-product">
                  <h1>CHI TIẾT SÁCH</h1>
                  <p
                    className="desc"
                    dangerouslySetInnerHTML={{
                      __html: productDetail.product.description,
                    }}
                  />
                  <ul style={{ listStyleType: "disc", padding: "0px 20px" }}>
                    <li className={productDetail.category ? "" : "d-none"}>
                      Danh mục: {productDetail.category}
                    </li>
                    <li className={productDetail ? "" : "d-none"}>
                      Ngày sản xuất:{" "}
                      {productDetail.product.createdBy?.createdAt}, Cập nhât
                      ngày: {productDetail.product.updatedAt}
                    </li>
                    <li>Đánh giá: </li>
                    <li>Chính sách trả lại: No return policy</li>
                    <li className={productDetail.product.stock ? "" : "d-none"}>
                      Số lượng còn lại: {productDetail.product.stock}
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
            <Row>
              <Col className="px-0">
                <div className="add-cart">
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <img
                            src={productDetail.product.thumbnail}
                            alt="Ảnh"
                          />
                        </td>
                        <td>
                          <h3>{productDetail.product.title}</h3>
                          <span className="price-discount">
                            {productDetail.product.price}
                          </span>

                          <span className="price-main">
                            {(
                              productDetail.product.price -
                              productDetail.product.discountPercentage
                            ).toFixed(2)}
                            $
                          </span>
                          <span className="discount-percent">
                            -{productDetail.product.discountPercentage}%
                          </span>
                          <div className="">
                            (Tiết kiệm:{" "}
                            {(
                              productDetail.product.discountPercentage -
                              productDetail.product.price
                            ).toFixed(2)}
                            ₫)
                          </div>
                        </td>
                        <td>
                          <div className="quantity">
                            <span>Số lượng: </span>
                            <div className="change-quantity">
                              <button
                                className="sub"
                                onClick={handleSubQuantity}
                              >
                                -
                              </button>
                              <span>{quantity}</span>
                              <button
                                className="add"
                                onClick={handleAddQuantity}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </td>
                        <td>
                          <button onClick={handleAddProduct}>
                            THÊM VÀO GIỎ HÀNG
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Col>
            </Row>
            <Row>
              <Col className="px-0">
                <div className="relate-to">
                  <h2>Sách liên quan</h2>
                  <div className="relate-content product-item">
                    {productDetail.productsRelated.map((item, index) => {
                      return (
                        <div className="item" key={index}>
                          <Link to={`/detail-product/${item.slug}`}>
                            <img src={item.thumbnail} alt="Ảnh" />

                          </Link>
                          <h3 className="name">{item.description}</h3>
                          <h3 className="price">{item.price}</h3>
                          <h3 className="price-discount">
                            {(item.price - item.discountPercentage).toFixed(2)}
                          </h3>
                          <span className="discount-percent">
                            -{item.discountPercentage}%
                          </span>
                          <IoAdd className="icon" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col className="px-0">
                <div className="all-ratings">
                  <h1>Đánh giá sách</h1>
                  {reviews && reviews.length > 0 ? (
                    <table>
                      <tbody>
                        {reviews.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td>
                                <img
                                  src={item.avartar}
                                  alt="Ảnh"
                                />
                              </td>
                              <td>
                                <div className="user">
                                  <span className="name">{item.fullName}</span>
                                  <span>-</span>
                                  <span className="date">
                                    {new Date(item.createdAt).getDate()}-
                                    {new Date(item.createdAt).getMonth() + 1}-
                                    {new Date(item.createdAt).getFullYear()}
                                  </span>
                                </div>
                                <div className="comment">{item.comment}</div>
                              </td>
                              <td>
                                <Rate disabled defaultValue={item.rating} />;
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  ) : (
                    <div>Không có đánh giá nào</div>
                  )}
                </div>
              </Col>
            </Row>

            <Row>
              <Col className="px-0">
                <div className="add-rating">
                  <h2>Thêm đánh giá</h2>

                  <div className="ratings">
                    <label>Đánh giá của bạn</label>
                    <div className="stars">
                      <Flex gap="middle" vertical>
                        <Rate
                          tooltips={desc}
                          onChange={setValue}
                          value={value}
                        />
                      </Flex>
                    </div>
                  </div>
                  <form onSubmit={handleAddReview}>
                    <label>Để lại bình luận</label>
                    <textarea
                      onChange={(e) => setComment(e.target.value)}
                      rows={8}
                      value={comment}
                    ></textarea>
                    <button type="submit" className="btn btn-success">
                      Thêm đánh giá
                    </button>
                  </form>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      ) : (
        <div>Không có sách</div>
      )}
    </>
  );
}

export default DetailProduct;
