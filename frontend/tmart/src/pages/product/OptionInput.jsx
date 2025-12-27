import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import "./Product.css";
import { useEffect } from "react";
import { apiService } from "../../services/apiService";
import { useState } from "react";
import { Link } from "react-router";

export default function OptionInput() {
  const [categories, setCategories] = useState([]);
  const [IsShowMore, setShow] = useState(false);

  useEffect(() => {
    const fetchApi = async () => {
      try{
        const response = await apiService.getAllProductCategories();
        setCategories(response.data.productCategory);
      }
      catch(error){
        console.log("Lỗi rồi nhé", error);
      }
    }
    fetchApi();
  },[]);


  const handleShowMore = (e) => {
    const ul = e.target.parentNode.previousSibling.querySelector("ul");
    ul.style.height = "auto";
    setShow(true);
  };

  const handleHiddenMore = (e) => {
    const ul = e.target.parentNode.previousSibling.querySelector("ul");
    ul.style.height = "300px";
    setShow(false);
  };
  return (
    <>
      <div className="selection">
        <div className="categories">
          <div className="list-categories">
            <h2>DANH MỤC SẢN PHẨM</h2>
            <ul>
              {categories &&
                categories.map((item, index) => {
                  return (
                    <li key={index}>
                      <Link to={`/${item.title}`}>
                        {item.title}
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </div>
          {!IsShowMore ? (
            <div className="see-more">
              <span onClick={handleShowMore}>Xem thêm</span>
              <FaChevronDown />
            </div>
          ) : (
            ""
          )}
          {IsShowMore ? (
            <div className="see-compact">
              <span onClick={handleHiddenMore}>Thu gọn</span>
              <FaChevronUp />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
