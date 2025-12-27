import { CiFaceSmile } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { IoCart } from "react-icons/io5";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaBars } from "react-icons/fa";
import { FaListUl } from "react-icons/fa";
import { BsGrid3X3Gap } from "react-icons/bs";
import { Link, useNavigate } from "react-router";
import "../../assets/style/main.css";
import "./Header.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useRef, useState } from "react";
import { apiService } from "../../services/apiService";
import { useCookies } from "react-cookie";
import useSearchProduct from "../../hooks/useSearchProduct";

export default function Header({ data }) {
  const [cookie, setCookies,removeCookie] = useCookies();
  const [products, setProducts] = useState([]);
  const inputRef = useRef();
  const [res, setRes] = useState("");
  const [dataSearch, setDataSearch] = useState([]);
  const [showModalSearch, setShowModalSearch] = useState(false);
  const navigate = useNavigate();
  const [totalQuantity,setTotalQuantity] = useState();
  const [fullNameUser,setFullNameUser] = useState("");

  useEffect(() => {
    // Lấy ra danh sách sách
    const fetchApiProduct = async () => {
      try{

        const res = await apiService.getProducts();
        setProducts(res.data.products);
      }
      catch(error){
        console.log(error);
      }
    };
    fetchApiProduct();
    // Lấy ra danh sách sách

    // Lây ra giỏ hàng
    const fetchApiCart = async() => {
      try{
        const response = await apiService.getCart(cookie.cartId);
        console.log(response.data);
        if(response.data.code === 200){
          const totalQuantity = response.data.cart.reduce((total,item) => {
            return item.quantity + total;
          },0)
          setTotalQuantity(totalQuantity);
        }
      }
      catch(error){
        console.log(error);
      }
    }
    fetchApiCart();
    // Lây ra giỏ hàng

    // Lấy ra thông tin người dùng
    const fetchApiUser = async() => {
      if(cookie.tokenUser){
        const response = await apiService.getInfoUser(cookie.tokenUser);
        console.log(response.data);
        if(response.data.code === 200){
          setFullNameUser(response.data.user.fullName);
        }

      }
    }
    fetchApiUser();

    // Lấy ra thông tin người dùng
    

    // Hiện header khi cuộn xuống
    const handleScroll = () => {
      const header = document.querySelector(".header");
      if (window.pageYOffset >= header.clientHeight) {
        header.classList.add("fixed");
      } else {
        header.classList.remove("fixed");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [cookie.cartId,cookie.tokenUser]);
    // Hiện header khi cuộn xuống

    // Tìm kiếm sách
  const handleTypeSearch = (e) => {
    if (e.target.value !== "") {
      setShowModalSearch(true);
      const text = e.target.value;
      setRes(text);
      const searchRes = products.filter((item) => {
        return item.title.toLowerCase().includes(text);
      });
      setDataSearch(searchRes);
    } else {
      setShowModalSearch(false);
    }
  };
    // Tìm kiếm sách

  const handleCloseSearch = () => {
    setShowModalSearch(false);
  };
  // Đóng danh muc bằng dấu x
  // const handleCloseModal = () => {
  //   setShowCategoryHeader(false);
  // };

    // Tìm kiếm sách

  const handleSearchProduct = (e) => {
    const text = e.target.closest(".search").querySelector("input").value;

    if (text) {
      navigate(`/products/search?keyword=${text}`);
    } else {
      const url = new URL(window.location.href);
      url.searchParams.delete("keyword");
      window.location.href = url;
    }
    setShowModalSearch(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleSearchProduct(e);
  };
    // Tìm kiếm sách

  const handleLogout = () => {
    removeCookie("tokenUser");
  }

  return (
    <>
      <div className="header pt-3 pb-xl-0 pb-3">
        <Container>
          <Row>
            <Col sm={4} xs={6} className="d-lg-none">
              <FaBars className="mt-3 d-block d-sm-none d-sm-block d-md-block d-lg-none bar" />
            </Col>
            <Col md={4} lg={3} sm={4} xs={6}>
              <div className="img mb-md-3">
                <Link to="/">
                  <img src={data.logo} alt="Ảnh logo" />
                </Link>
              </div>
            </Col>
            <Col md={12} lg={5} xl={4}>
              <div className="search mt-2">
                <form action="" method="POST" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    placeholder="Tìm kiếm sách..."
                    className="px-3 w-100 p-3"
                    onChange={handleTypeSearch}
                    ref={inputRef}
                  />
                  <button type="submit" className="d-none">
                    Search
                  </button>
                </form>
                <CiSearch
                  className="search-icon h-75"
                  onClick={(e) => handleSearchProduct(e)}
                />
              </div>
            </Col>
            <Col lg={2} xl={3} className="d-none d-lg-block">
              {!cookie.tokenUser ? (
                <div className="account mt-md-2">
                  <CiFaceSmile />
                  <Link to="/auth">Tài khoản</Link>
                </div>
              ) : (
                <div className="account-login mt-md-2">
                  <Link to="/account/user">{fullNameUser}</Link>
                  <Link to="/auth" onClick={handleLogout}>Đăng xuất</Link>

                </div>
              )}
            </Col>
            <Col sm={4} md={3} lg={2} xl={2}>
              <div className="cart mt-1 mb-md-3 d-sm-none d-md-flex">
                <IoCart className="icon" />
                <Link to="/cart">Giỏ hàng</Link>
                {/* <span className="quantity">{totalQuantity}</span> */}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div
        className={showModalSearch ? "modal-search" : "d-none"}
        onClick={handleCloseSearch}
      >
        <div className="box">
          <div className="display">
            <p>
              Kết quả tìm kiếm cho <span>{res}</span>
            </p>
            <div className="icon">
              <FaListUl />
              <BsGrid3X3Gap />
            </div>
          </div>
          <p className="res">Hiển thị kết quả:</p>
          <div className="display-list">
            {dataSearch &&
              dataSearch.map((item, index) => {
                return (
                  <div
                    className={`item ${item?.category}`}
                    key={index}
                    id={item.id}
                  >
                    <Link to={`/detail-product/${item.slug}`}>
                      <img
                        src={item.thumbnail}
                        alt="Ảnh"
                      />
                    </Link>
                    <div className="infor-product">
                      <p className="name">{item.title}</p>
                      <span className="price-discount">{item.price}$</span>
                      <span className="price">
                        {(item.price - item.discountPercentage).toFixed(2)}$
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}
